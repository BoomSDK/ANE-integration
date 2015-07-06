package com.boom.nativeExtensions.boomVideo {

	import flash.events.EventDispatcher;
	import flash.events.StatusEvent;
	import flash.external.ExtensionContext;

	public class BoomVideo extends EventDispatcher {

		private static var _instance:BoomVideo;

		public var extensionContext:ExtensionContext;

		public static function getInstance():BoomVideo {

			if (!_instance)
				_instance = new BoomVideo();

			return _instance;
		}

		public function BoomVideo() {

			if (_instance)
				throw new Error("BoomVideo is already initialized.");

			_instance = this;

			extensionContext = ExtensionContext.createExtensionContext("com.boom.nativeExtensions.BoomVideo", null);

			if (!extensionContext)
				throw new Error("BoomVideo native extension is not supported on this platform.");

			extensionContext.addEventListener(StatusEvent.STATUS, _onStatus);
		}

		private function _onStatus(sEvt:StatusEvent):void {

			trace(sEvt.code);
		}

		public function init():void {
			
			extensionContext.call("init");
		}

	}
}