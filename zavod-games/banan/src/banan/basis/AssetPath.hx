package banan.basis;

import jetgui.JetAssetPath;

abstract AssetPath(String) to String {

    inline public function new(str: String) {
        this = str;
    }

    inline public function getPath(): String {
        return this;
    }

    @:from
    public static inline function fromJetAssetPath(jetAssetPath: JetAssetPath): AssetPath {
        return new AssetPath(jetAssetPath.getPath());
    }
}
