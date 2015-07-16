package com.boom.nativeExtensions.boomVideo.functions;

import com.adobe.fre.FREContext;
import com.adobe.fre.FREObject;
import com.boom.nativeExtensions.boomVideo.BoomVideoActivity;

public class InitFunction extends BaseFunction {
	
	@Override
	public FREObject call(FREContext context, FREObject[] args) {
		super.call(context, args);
		
		BoomVideoActivity.key = getStringFromFREObject(args[0]);
		
		return null;
	}
}
