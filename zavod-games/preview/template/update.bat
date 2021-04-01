@echo off

set JET2HX_PATH=..\$JET2HX_PATH$

REM echo compiling jet2hx
REM call %JET2HX_PATH%\make.bat

echo generating hx 
neko %JET2HX_PATH%\bin\jet2hx.n ../$LAYOUT_PATH$

echo compiling hx
cd generated
haxe --connect 4443 jetguipreview.hxml
cd ..

echo writing current time to update.txt
echo %time% > ..\build\html5\update.txt

echo done