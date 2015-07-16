package com.boom.nativeExtensions.boomVideo;

import java.util.HashMap;
import java.util.Map;

import android.content.Intent;

import com.adobe.fre.FREContext;
import com.adobe.fre.FREFunction;
import com.boom.nativeExtensions.boomVideo.functions.InitFunction;
import com.boom.nativeExtensions.boomVideo.functions.ShowOfferListVideoFunction;
import com.boom.nativeExtensions.boomVideo.functions.ShowPrerollVideoFunction;
import com.boom.nativeExtensions.boomVideo.functions.ShowRewardVideoFunction;
import com.boomvideo.videotracker.BoomVideoResourceManager;

public class BoomVideoExtensionContext extends FREContext {

	@Override
	public void dispose() {

	}

	@Override
	public Map<String, FREFunction> getFunctions() {

		Map<String, FREFunction> functionMap = new HashMap<String, FREFunction>();
		
		functionMap.put("init", new InitFunction());
		functionMap.put("showOfferListVideo", new ShowOfferListVideoFunction());
		functionMap.put("showPrerollVideo", new ShowPrerollVideoFunction());
		functionMap.put("showRewardVideo", new ShowRewardVideoFunction());

		return functionMap;
	}

	public void launchActivity(BoomVideoResourceManager.VIDEO_PLAYER_TYPE type) {
		
		Intent i = new Intent(getActivity().getApplicationContext(), BoomVideoActivity.class);
		
		i.putExtra(BoomVideoActivity.extraPrefix + ".extendedPermissions", type);

		getActivity().startActivity(i);
	}

}
