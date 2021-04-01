package jetgui;

import banan.basis.AssetPath;

abstract JetAssetPath(String) {

    inline public function new(str: String) {
        this = str;
    }

    inline public function getPath(): String {
        return this;
    }

    @:from
    public inline static function fromAssetPath(ap: AssetPath): JetAssetPath {
        return new JetAssetPath(ap.getPath());
    }
}