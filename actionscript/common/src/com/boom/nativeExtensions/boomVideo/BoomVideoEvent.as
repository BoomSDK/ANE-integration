package com.boom.nativeExtensions.boomVideo {

	import flash.events.Event;

	public class BoomVideoEvent extends Event {

		static public const VideoEvent:String = "VideoEvent";

		private var _json:String = "";
		private var _eventName:String = "";
		private var _videoPercentage:String = "";
		private var _pointsRevealed:int = 0;

		public function BoomVideoEvent(type:String, json:String, bubbles:Boolean = false, cancelable:Boolean = false) {
			super(type, bubbles, cancelable);

			_json = json;

			var jsonObject:Object = JSON.parse(_json);

			if (jsonObject["eventName"])
				_eventName = jsonObject.eventName;

			if (jsonObject["videoPercentage"])
				_videoPercentage = jsonObject.videoPercentage;

			if (jsonObject["pointsRevealed"])
				_pointsRevealed = jsonObject.pointsRevealed;
		}

		public function get json():String {

			return _json;
		}

		public function get eventName():String {

			return _eventName;
		}

		public function get videoPercentage():String {

			return _videoPercentage;
		}

		public function get pointsRevealed():int {

			return _pointsRevealed;
		}
	}
}
