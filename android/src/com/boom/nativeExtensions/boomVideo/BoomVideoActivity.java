package com.boom.nativeExtensions.boomVideo;

import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.os.Bundle;

import com.boomvideo.framework.dto.OperationResult;
import com.boomvideo.videotracker.BoomVideoResourceManager;
import com.boomvideo.videotracker.BoomVideoTrackerInf;

public class BoomVideoActivity extends Activity implements BoomVideoTrackerInf {

	static public String key;

	static public String extraPrefix = "com.boom.nativeExtensions.boomVideo.BoomVideoActivity";

	@Override
	protected void onStart() {
		super.onStart();

		Bundle extras = this.getIntent().getExtras();
		BoomVideoResourceManager.VIDEO_PLAYER_TYPE videoType = (BoomVideoResourceManager.VIDEO_PLAYER_TYPE) extras.getSerializable(extraPrefix + ".extendedPermissions");

		BoomVideoResourceManager.getInstance(this).showVideoAds(key, this, videoType);
	}

	@Override
	public Activity getContext() {
		return this;
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
		
		switch (operationResult.getResultMessages()) {
				
			case VIDEO_ENDED:
				finish();
				break;
	
			case INTERSTITIAL_CLOSED:
				finish();
				break;
		}
	}
}
