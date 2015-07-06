package com.boom.nativeExtensions.boomVideo {

	import flash.events.EventDispatcher;
	import flash.external.ExtensionContext;

	public class BoomVideo extends EventDispatcher {

		private static var _instance:BoomVideo;

		public static function getInstance():BoomVideo {

			if (!_instance)
				_instance = new BoomVideo();

			return _instance;
		}

		public function BoomVideo() {

			if (_instance)
				throw new Error("BoomVideo is already initialized.");

			_instance = this;
		}

		public function init():void {
		}
	}
}