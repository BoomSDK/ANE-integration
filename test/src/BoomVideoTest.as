package {

	import com.boom.nativeExtensions.boomVideo.BoomVideo;

	import flash.display.Sprite;
	
	[SWF(backgroundColor="#FFFFFF", frameRate="60", width="1024", height="768")]
	
	/**
	 * @author Aymeric
	 */
	public class BoomVideoTest extends Sprite {
		
		private var _boomVideo:BoomVideo;
		
		public function BoomVideoTest() {
			
			_boomVideo = new BoomVideo();
			_boomVideo.init("ca92b245-7951-43f3-b76d-ab10f9ade5c3", "ca92b245-7951-43f3-b76d-ab10f9ade5c3");
			_boomVideo.showOfferListVideo();
		}
	}
}
