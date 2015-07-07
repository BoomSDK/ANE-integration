package {

	import citrus.core.starling.StarlingCitrusEngine;

	import feathers.themes.MetalWorksDesktopTheme;
	
	[SWF(backgroundColor="#FFFFFF", frameRate="60", width="1024", height="768")]
	
	/**
	 * @author Aymeric
	 */
	public class BoomVideoTest extends StarlingCitrusEngine {
		
		public function BoomVideoTest() {

		}

		override public function initialize():void {
			super.initialize();
			
			setUpStarling();
		}

		override public function handleStarlingReady():void {
			super.handleStarlingReady();
			
			new MetalWorksDesktopTheme();

			state = new BoomVideoTestState();
		}
	}
}
