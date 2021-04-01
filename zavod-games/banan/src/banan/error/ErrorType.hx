package banan.error;

import haxe.EnumTools;
import haxe.EnumTools.EnumValueTools;

// add/modify your categories here
private enum abstract EErrorCategory(String) to String {
	var Custom;
	var Common;
	var Auth;
	var Server;
	var Network;
	var Graphics;
	var Templates;
	var Assets;
	var JetGui;
}

@:build(banan.error.ErrorTypeMacro.build())
class ErrorType {

	public static final ROOT_CATEGORY_GAME: String = "Game";

	private static inline final treeDelimiter: String = '|';
	
	private static final catRange: Int;
	private static final messageByCode: Array<String>;
	private static final catByCode: Array<String>;
	
	// add/modify your errors here
	@error("Seq",				EErrorCategory.Server) 		public static inline final seq: Int;
	@error("SeqTime",			EErrorCategory.Server) 		public static inline final seqTime: Int;
	@error("ServerCrash",		EErrorCategory.Server) 		public static inline final serverCrash: Int;
	@error("ServerReload",		EErrorCategory.Server) 		public static inline final serverReload: Int;
	@error("AnotherSession",	EErrorCategory.Server) 		public static inline final anotherSession: Int;
	@error("ServerDisconnect",	EErrorCategory.Server)		public static inline final serverDisconnect: Int;
	@error("NoActivityTimeout",	EErrorCategory.Server) 		public static inline final noActivityTimeout: Int;
	@error("ResponseTimeout",	EErrorCategory.Server) 		public static inline final responseTimeout: Int;
	@error("TokenMismatch",		EErrorCategory.Server) 		public static inline final tokenMismatch: Int;
	@error("WebsocketClose", 	EErrorCategory.Server) 		public static inline final websocketClose: Int;
	@error("WebsocketEarlyClose", EErrorCategory.Server) 	public static inline final websocketEarlyClose: Int;

	@error("WebSocket",			EErrorCategory.Network) 	public static inline final webSocket: Int;
	@error("ConnectionFailed",	EErrorCategory.Network) 	public static inline final connectionFailed: Int;
	@error("DownloadFailed",	EErrorCategory.Network) 	public static inline final downloadFailed: Int;
	@error("HttpRequestFailed",	EErrorCategory.Network) 	public static inline final httpRequestFailed: Int;
	@error("NoInternet",		EErrorCategory.Network) 	public static inline final noInternet: Int;
	
	@error("Manual",			EErrorCategory.Custom) 		public static inline final manual: Int;
	@error("Unreachable",		EErrorCategory.Custom)		public static inline final unreachable: Int;
	@error("NotImplemented",	EErrorCategory.Custom) 		public static inline final notImplemented: Int;
	@error("SendLogButton",		EErrorCategory.Custom) 		public static inline final sendLogButton: Int;
	
	@error("Unwrap",			EErrorCategory.Common) 		public static inline final unwrapCommon: Int;
	@error("Assert",			EErrorCategory.Common) 		public static inline final assert: Int;
	@error("Generic",			EErrorCategory.Common) 		public static inline final generic: Int;	
	@error("NoParentEdge",		EErrorCategory.Common) 		public static inline final noParentEdge: Int;	
	@error("Untyped",			EErrorCategory.Common) 		public static inline final fromUntyped: Int;	
	@error("PlayerInactivity",	EErrorCategory.Common) 		public static inline final playerInactivity: Int;
	@error("Native",			EErrorCategory.Common) 		public static inline final native: Int;
	@error("UpdateUnavailable", EErrorCategory.Common) 		public static inline final updateUnavailable: Int;
	@error("SmhError",			EErrorCategory.Common) 		public static inline final smhError: Int;
	@error("PurchaseError",		EErrorCategory.Common) 		public static inline final purchaseError: Int;
	@error("ItemPreCompensate",	EErrorCategory.Common) 		public static inline final itemPreCompensate: Int;
	@error("Facebook",			EErrorCategory.Common) 		public static inline final fbError: Int;

	@error("InvalidData",		EErrorCategory.Templates)	public static inline final tplInvalidData: Int;
	@error("NotFound",			EErrorCategory.Templates)	public static inline final tplNotFound: Int;
	@error("NoTranslation",		EErrorCategory.Templates)	public static inline final tplNoTranslation: Int;

	@error("NoDeviceProfile",		EErrorCategory.Assets)	public static inline final assNoDeviceProfile: Int;
	@error("InvalidDeviceProfile",	EErrorCategory.Assets)	public static inline final assInvalidDeviceProfile: Int;
	@error("UniversalDeviceProfile",EErrorCategory.Assets)	public static inline final assUniversalDeviceProfile: Int;

	@error("SessionUnreadable",	EErrorCategory.Auth)		public static inline final authSessionUnreadable: Int;
	@error("AuthCancel",		EErrorCategory.Auth)		public static inline final authCancel: Int;
	@error("AuthFail",			EErrorCategory.Auth)		public static inline final authFail: Int;
	@error("NoPlatformAuth",	EErrorCategory.Auth)		public static inline final authNoPlatformAuth: Int;
	@error("UnknownPlatform",	EErrorCategory.Auth)		public static inline final authUnknownPlatform: Int;
	@error("MissingTerms",		EErrorCategory.Auth)		public static inline final authMissingTerms: Int;
	
	public static function breadcrumbs(typeCode: Int): Array<String> {

		var catIndex: Int = Std.int(typeCode / catRange);
		var errorIndex: Int = typeCode - catIndex * catRange;
		var root: String = ROOT_CATEGORY_GAME;

		return [root, catByCode[errorIndex], messageByCode[errorIndex]];
	}

	public static inline function formattedBreadcrumbs(typeCode: Int): String {
		return breadcrumbs(typeCode).join(treeDelimiter);
	}

	public static function formatErrorMessage(typeCode: Int, str: String): String {
		return '${formattedBreadcrumbs(typeCode)}$treeDelimiter$str';
	}

	public static function all(): Map<Int, String> {

		final errorTypes: Map<Int, String> = new Map();
		for (i in 0...messageByCode.length) {

			final typeCode: Int = i + catRange;
			errorTypes[typeCode] = formattedBreadcrumbs(typeCode);
		}

		return errorTypes;
	}
	
	private function new () {}
}