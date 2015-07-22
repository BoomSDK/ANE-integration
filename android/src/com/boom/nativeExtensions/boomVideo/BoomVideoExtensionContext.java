package com.boom.nativeExtensions.boomVideo;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;

import com.adobe.fre.FREContext;
import com.adobe.fre.FREFunction;
import com.boom.nativeExtensions.boomVideo.functions.InitFunction;
import com.boom.nativeExtensions.boomVideo.functions.ShowOfferListVideoFunction;
import com.boom.nativeExtensions.boomVideo.functions.ShowPrerollVideoFunction;
import com.boom.nativeExtensions.boomVideo.functions.ShowRewardVideoFunction;
import com.boomvideo.framework.dto.OperationResult;
import com.boomvideo.videotracker.BoomVideoResourceManager;
import com.boomvideo.videotracker.BoomVideoTrackerInf;

public class BoomVideoExtensionContext extends FREContext implements BoomVideoTrackerInf {
	
	static public String key;

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

	public void launchVideo(BoomVideoResourceManager.VIDEO_PLAYER_TYPE type) {
		
		BoomVideoResourceManager.getInstance(BoomVideoExtension.context.getContext()).showVideoAds(key, this, type);
	}
	
	@Override
	public Activity getContext() {
		return BoomVideoExtension.context.getActivity();
	}
	
	@Override
	public void onVideoTrackEvent(final OperationResult operationResult) {
		
		try {
			JSONObject obj = new JSONObject();
			obj.put("eventName", operationResult.getResultMessages());
			obj.put("videoPercentage", operationResult.getResult());
			obj.put("pointsRevealed", operationResult.getPoints());
			
			String result = obj.toString().replace("\\", "");
		
			BoomVideoExtension.context.dispatchStatusEventAsync("BOOM_VIDEO_EVENT", result);
			
		} catch (JSONException t) {
		}
	}

}
