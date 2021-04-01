package banan.filesystem.local;

import haxe.io.Bytes;
import promhx.Promise;

@module
interface ILocalFsModule {
	public function readFileBytes(path: String): Promise<Bytes>;
	public function writeFileBytes(path: String, data: Bytes): Promise<String>;
	public function readFileString(path: String): Promise<String>;
	public function writeFileString(path: String, data: String): Promise<String>;
	public function fileExists(path: String): Promise<Bool>;
}