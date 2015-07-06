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
			_boomVideo.init();
		}
	}
}
