#!/bin/bash

# echo "compiling jet2hx"

# pushd ../$JET2HX_PATH$
# haxe jet2hx.hxml
# popd

echo "running jet2hx"

neko ../$JET2HX_PATH$/bin/jet2hx.n ../$LAYOUT_PATH$

echo "compiling generated haxe files"

pushd generated
haxe jetguipreview.hxml
popd

echo "updating update.txt"

date > ../build/html5/update.txt

echo "done"