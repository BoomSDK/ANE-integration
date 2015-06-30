package com.boom.nativeExtensions.boomVideo;

import com.adobe.fre.FREContext;
import com.adobe.fre.FREExtension;

public class BoomVideoExtension implements FREExtension {

		static public BoomVideoExtensionContext context;

		@Override
		public FREContext createContext(String label) {
			
			return context = new BoomVideoExtensionContext();
		}

		@Override
		public void dispose() {
			
			context = null;
		}

		@Override
		public void initialize() {
			
		}
}
