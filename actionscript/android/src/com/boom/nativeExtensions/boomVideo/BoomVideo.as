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

			dispatchEvent(new BoomVideoEvent(BoomVideoEvent.VideoEvent, sEvt.level));
		}

		public function init(iOSKey:String, androidKey:String):void {
			
			extensionContext.call("init", androidKey);
		}

		public function showOfferListVideo():void {

			extensionContext.call("showOfferListVideo");
		}

		public function showPrerollVideo():void {

			extensionContext.call("showPrerollVideo");
		}

		public function showRewardVideo():void {

			extensionContext.call("showRewardVideo");
		}

	}
}