package com.boom.nativeExtensions.boomVideo.functions;

import com.adobe.fre.FREContext;
import com.adobe.fre.FREObject;
import com.boom.nativeExtensions.boomVideo.BoomVideoExtension;
import com.boomvideo.videotracker.BoomVideoResourceManager;

public class ShowPrerollVideoFunction extends BaseFunction {
	
	@Override
	public FREObject call(FREContext context, FREObject[] args) {
		super.call(context, args);
		
		BoomVideoExtension.context.launchActivity(BoomVideoResourceManager.VIDEO_PLAYER_TYPE.PREROLL);
		
		return null;
	}
}
