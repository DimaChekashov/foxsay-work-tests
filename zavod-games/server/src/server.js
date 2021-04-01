const express = require('express');
const path = require('path');
const fs = require('fs');
const sizeOf = require('image-size');

const config = JSON.parse(fs.readFileSync('../config.txt', 'utf8'));

const assetPath = "../" + config.assetPath
const jsonPath = "../" + config.layoutPath + '/json';
const tplPath = "../taonga-data-haxe/data";
const indexPath = "../build/html5";

console.log(config);

function preparePath(p) {
  if(!path.isAbsolute(p)) {
    p = path.join(__dirname, '..', p);
  }
  p = path.normalize(p);
  return p;
}

function makeFileList(fsdir, dir, results, done) {
	
	dir = dir || "";
	results = results || {};
	fs.readdir(fsdir, function (err, list) {
		if (err) return done(err);
		let pending = list.length;
		if (!pending) return done(null, results);
		list.forEach(function (file) {
			let name = dir ? dir + '/' + file : file;
			let fspath = path.resolve(fsdir, file);
			fs.stat(fspath, function (err, stat) {
				if (stat && stat.isDirectory()) {
					makeFileList(fspath, name, results, function (err, res) {
						if (!--pending) done(null, results);
					});
				} else if(stat && stat.isFile()) {
					results[name] = 
						{
							name: name,
							size: stat.size,
						}
					if (name.endsWith(".png") || name.endsWith(".jpg")) {
						pending++;
						sizeOf.imageSize(fspath, function(err, dim) {
							if (!err) {
								results[name].width = dim.width;
								results[name].height = dim.height;
							}
							if (!--pending) done(null, results);
						});
					}
					if (!--pending) done(null, results);
				}
			});
		});
	});
}

let app = express();

app.use(express.static(preparePath(indexPath)));
app.use('/asset', express.static(preparePath(assetPath)));
app.use('/json', express.static(preparePath(jsonPath)));
app.use('/tpl', express.static(preparePath(tplPath)));
app.get('/files.json', function(req, res) {
	makeFileList(assetPath, null, null, (e, r) => 
		makeFileList(tplPath, null, r, (e, r) => 
			res.send(JSON.stringify(r, null, '\t'))));
})

app.listen(config.port, () => console.log('Listening on port ' + config.port));
