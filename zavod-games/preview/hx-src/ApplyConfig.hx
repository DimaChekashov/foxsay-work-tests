package;

import haxe.Json;
import haxe.io.Path;
import sys.FileSystem;
import sys.io.File;

using StringTools;

class ApplyConfig {

	private static var config: {layoutPath: String, jet2hxPath: String};
	
	private static function doDir(inDir: String, outDir: String): Void {
		
		if (!FileSystem.exists(outDir)) {
			FileSystem.createDirectory(outDir);
		}
		
		var list: Array<String> = FileSystem.readDirectory(inDir);
		for (file in list) {
			
			var inFile: String = Path.join([inDir, file]);
			var outFile: String = Path.join([outDir, file]);
			if (FileSystem.isDirectory(inFile)) {
				doDir(inFile, outFile);
			}
			else {
				doFile(inFile, outFile);
			}
		}
	}
	
	private static function doFile(inFile: String, outFile: String): Void {
		
		var input: String = File.getContent(inFile);
		var output: String = input
			.replace("$LAYOUT_PATH$", config.layoutPath)
			.replace("$JET2HX_PATH$", config.jet2hxPath);
		File.saveContent(outFile, output);
	}
	
	public static function main() {
		
		config = Json.parse(File.getContent("../config.txt"));
		doDir("template", "generated");
	}
}