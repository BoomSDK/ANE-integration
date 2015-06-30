package com.boom.nativeExtensions.boomVideo {

	import flash.events.Event;

	public class BoomVideoEvent extends Event {

		public function BoomVideoEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false) {
			super(type, bubbles, cancelable);
		}
	}
}
