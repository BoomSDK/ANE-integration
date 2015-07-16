package {

	import citrus.core.IState;
	import citrus.core.starling.StarlingState;

	import feathers.controls.Button;
	import feathers.controls.ButtonGroup;
	import feathers.data.ListCollection;

	import starling.events.Event;

	import com.boom.nativeExtensions.boomVideo.BoomVideo;
	import com.boom.nativeExtensions.boomVideo.BoomVideoEvent;

	/**
	 * @author Aymeric
	 */
	public class BoomVideoTestState extends StarlingState implements IState {
		
		private var _boomVideo:BoomVideo;

		public function BoomVideoTestState() {
			super();
		}

		override public function initialize():void {
			super.initialize();
			
			_boomVideo = new BoomVideo();
			_boomVideo.init("ca92b245-7951-43f3-b76d-ab10f9ade5c3", "ca92b245-7951-43f3-b76d-ab10f9ade5c3");

			_boomVideo.addEventListener(BoomVideoEvent.VideoEvent, _onBoomVideoEvent);

			var group:ButtonGroup = new ButtonGroup();
			
			group.dataProvider = new ListCollection([
				{label:"Show Preroll Video", triggered:_showPrerollVideo},
				{label:"Show Reward Video", triggered:_showRewardVideo},
				{label:"Show OfferList Video", triggered:_showOfferListVideo}
			]);
			
			group.width = 500;
			group.height = 300;
			
			group.direction = ButtonGroup.DIRECTION_HORIZONTAL;
			
			addChild(group);
		}

		private function _onBoomVideoEvent(bvEvt:BoomVideoEvent):void {
			trace(bvEvt.json);
			trace(bvEvt.eventName, bvEvt.videoPercentage, bvEvt.pointsRevealed);
		}
		
		private function _showPrerollVideo(evt:Event):void {
			
			var btn:Button = evt.target as Button;
			trace(btn.label);
			
			_boomVideo.showPrerollVideo();
		}
		
		private function _showRewardVideo(evt:Event):void {
			
			var btn:Button = evt.target as Button;
			trace(btn.label);
			
			_boomVideo.showRewardVideo();
		}
		
		private function _showOfferListVideo(evt:Event):void {
			
			var btn:Button = evt.target as Button;
			trace(btn.label);
			
			_boomVideo.showOfferListVideo();
		}

	}
}
