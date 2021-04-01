REM npm install watch -g
start /b haxe --wait 4443 
haxe --connect 4443 -cp hx-src --run ApplyConfig
call generated\do-watch.bat