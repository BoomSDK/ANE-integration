package com.boom.nativeExtensions.boomVideo;

import android.app.Activity;

import com.boomvideo.framework.dto.OperationResult;
import com.boomvideo.videotracker.BoomVideoResourceManager;
import com.boomvideo.videotracker.BoomVideoTrackerInf;

public class BoomVideoActivity extends Activity implements BoomVideoTrackerInf {

	@Override
	protected void onStart() {
		super.onStart();

		BoomVideoResourceManager boomVideoResourceManager = BoomVideoResourceManager.getInstance(this);

		boomVideoResourceManager.showVideoAds("ca92b245-7951-43f3-b76d-ab10f9ade5c3", this, BoomVideoResourceManager.VIDEO_PLAYER_TYPE.PREROLL);
	}

	@Override
	public Activity getContext() {
		return this;
	}

	@Override
	public void onVideoTrackEvent(final OperationResult operationResult) {
		
		switch (operationResult.getResultMessages()) {

	        case UKNOWN_ERROR:
	            break;
	        case VIDEO_UNAVAILABLE:
	            // Toast.makeText(HomeActivity.this, "Video unavailable",
	            //        Toast.LENGTH_SHORT).show();
	            break;
	        case PLAYER_INITAILIZATION_ERROR:
	            // Toast.makeText(HomeActivity.this, "PLAYER_INITAILIZATION_ERROR",
	            //        Toast.LENGTH_SHORT).show();
	            break;
	        case VIDEO_FIRST_PLAY:
	            // Toast.makeText(HomeActivity.this, "VIDEO_FIRST_PLAY",
	            //        Toast.LENGTH_SHORT).show();
	            break;
	        case VIDEO_END_PLAY:
	            //Toast.makeText(HomeActivity.this, "VIDEO_END_PLAY",
	            //       Toast.LENGTH_SHORT).show();
	            break;
	
	        case ANNOTATION_CLICK:
	            //Toast.makeText(HomeActivity.this, "ANNOTATION_CLICK",
	            //       Toast.LENGTH_SHORT).show();
	
	            break;
	        case VIDEO_CALLBACK_FIRETIME_COMPLETED:
	          //  Toast.makeText(HomeActivity.this,
	              //      "Congrats rewards gained :: " + operationResult.getPoints(),
	            //        Toast.LENGTH_SHORT).show();
	
	            break;
	
	        case FACEBOOK_SHARE_COMPLETED:
	            // Toast.makeText(HomeActivity.this, "FACEBOOK_COMPLETED",
	            //         Toast.LENGTH_SHORT).show();
	            break;
	        case GOOGLE_SHARE_COMPLETED:
	            // Toast.makeText(HomeActivity.this, "GOOGLE_SHARE_COMPLETED",
	            //        Toast.LENGTH_SHORT).show();
	            break;
	        case TWITTER_SHARE_COMPLETED:
	            // Toast.makeText(HomeActivity.this, "TWITTER_SHARE_COMPLETED",
	            //       Toast.LENGTH_SHORT).show();
	            break;
	        case VIDEO_PAUSED:
	            // Toast.makeText(HomeActivity.this, "VIDEO_PAUSED",
	            //        Toast.LENGTH_SHORT).show();
	
	            break;
	
	        case INSTAGRAM_URL:
	
	            // Toast.makeText(HomeActivity.this,
	            //        "INSTAGRAM_SHARE_COMPLETED - " + operationResult.getPoints(),
	            //       Toast.LENGTH_SHORT).show();
	            break;
	
	        case SLIDESHARE_URL:
	            // Toast.makeText(HomeActivity.this,
	            //       "SLIDESHARE_URL - " + operationResult.getPoints(), Toast.LENGTH_SHORT)
	            //        .show();
	            break;
	        case SURVEY_COMPLETED:
	
	            //Toast.makeText(HomeActivity.this,
	            //       "SURVEY_CLICKED - " + operationResult.getPoints(), Toast.LENGTH_SHORT)
	            //      .show();
	            break;
	        case BLOG_URL:
	
	            //Toast.makeText(HomeActivity.this, "BLOG_URL- " + operationResult.getPoints(),
	            //        Toast.LENGTH_SHORT).show();
	            break;
	        case APP_INSTALLED:
	
	            //Toast.makeText(HomeActivity.this,
	            //      "APP_INSTALLED- " + operationResult.getPoints(), Toast.LENGTH_SHORT)
	            //      .show();
	            break;
	
	        case VIDEO_PROGRESS:
	
	            int progressRule = (Integer) operationResult.getResult();
	
	            if (progressRule == OperationResult.VIDEO_COMPLETED_25P) {
	
	                // Toast.makeText(HomeActivity.this, "Progress completed 25% ",
	                //       Toast.LENGTH_SHORT).show();
	            } else if (progressRule == OperationResult.VIDEO_COMPLETED_50P) {
	
	//                Toast.makeText(HomeActivity.this, "Progress completed 50%",
	//                        Toast.LENGTH_SHORT).show();
	
	            } else if (progressRule == OperationResult.VIDEO_COMPLETED_75P) {
	
	                //    Toast.makeText(HomeActivity.this, "Progress completed 75%",
	                //           Toast.LENGTH_SHORT).show();
	            }
	            break;
	
	
	        case INTERNET_UNAVAILABLE:
	            //  Toast.makeText(HomeActivity.this, "INTERNET_UNAVAILABLE",
	            //          Toast.LENGTH_SHORT).show();
	            break;
	
	        case OFFER_AVAILED_ALREADY:
	
	            // Toast.makeText(HomeActivity.this, "You have already availed the offer!", Toast.LENGTH_SHORT).show();
	            break;
	
	        case INTERSTITIAL_LOADED:
	            // Toast.makeText(HomeActivity.this, "Interstitial Loaded.......", Toast.LENGTH_SHORT).show();
	            break;
	
	        case INTERSTITIAL_CLICKED:
	
	            //Toast.makeText(HomeActivity.this, "Interstitial Clicked", Toast.LENGTH_SHORT).show();
	            break;
	
	        case INTERSTITIAL_CLOSED:
	
	            //  Toast.makeText(HomeActivity.this, "Interstitial Closed" + operationResult.getPoints(), Toast.LENGTH_SHORT).show();
	            break;
	        default:
	            break;
	    }
	}
}
