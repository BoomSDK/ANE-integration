package com.boom.nativeExtensions.boomVideo;

import java.util.HashMap;
import java.util.Map;

import com.adobe.fre.FREContext;
import com.adobe.fre.FREFunction;

public class BoomVideoExtensionContext extends FREContext {

	@Override
	public void dispose() {

	}

	@Override
	public Map<String, FREFunction> getFunctions() {
		
		Map<String, FREFunction> functionMap = new HashMap<String, FREFunction>();
		
		return functionMap;
	}

}
