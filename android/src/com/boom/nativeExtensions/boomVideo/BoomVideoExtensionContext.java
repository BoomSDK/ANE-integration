package com.boom.nativeExtensions.boomVideo;

import java.util.HashMap;
import java.util.Map;

import android.content.Intent;

import com.adobe.fre.FREContext;
import com.adobe.fre.FREFunction;
import com.boom.nativeExtensions.boomVideo.functions.InitFunction;

public class BoomVideoExtensionContext extends FREContext {

	@Override
	public void dispose() {

	}

	@Override
	public Map<String, FREFunction> getFunctions() {

		Map<String, FREFunction> functionMap = new HashMap<String, FREFunction>();
		
		functionMap.put("init", new InitFunction());

		return functionMap;
	}

	public void initActivity() {
		
		Intent i = new Intent(getActivity().getApplicationContext(), BoomVideoActivity.class);

		getActivity().startActivity(i);
	}

}
