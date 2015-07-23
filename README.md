Boom Video Adobe AIR Native Extension for iOS & Android.

Installation
============

Import the ANE
--------------
Import the `BoomVideo.ane` into your project. Depending your IDE you might need to import the `BoomVideo.swc` as well.  
Inside your `*-app.xml` be sure to add this line `<extensionID>com.boom.nativeExtensions.BoomVideo</extensionID>`

Special settings on iOS
-----------------------
If you want to enable Google+ sharer, you need to generate a unique "Client ID" with respect to your "Bundle Identifier". Go to the [following link](https://developers.google.com/+/mobile/ios/getting-started) and follow:  
- Step 1. Creating the Google Developers Console project to create Client ID.  
- Step 3. Add a URL type for properly handling client ID in your project.  
- Inside your IDE, be sure to add the [boomVideoSharingData.plist](https://github.com/BoomSDK/ANE-integration/blob/master/bin/boomVideoSharingData.plist). *Don't forget to put in your Client ID!*  
- And finally inside the `*-app.xml`:  
```xml
<iPhone><InfoAdditions><![CDATA[
	<!-- other stuff -->
	<key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>com.boom.nativeExtensions.BoomVideoTest</string>
			</array>
		</dict>
	</array>
]]></InfoAdditions></iPhone>
```
For a full example of the `*-app.xml` please refer to the [demo](https://github.com/BoomSDK/ANE-integration/blob/master/bin/BOOM-ANE-integration-app.xml).

Special settings on Android
---------------------------
Inside the `*-app.xml` you must add the following stuff:  
```xml
<android><manifestAdditions><![CDATA[
	<!-- other stuff -->
	<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.CALL_PHONE" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.SEND_SMS" />
    <uses-permission android:name="android.permission.WRITE_CALENDAR" />
	<application>
		<meta-data android:name="com.google.android.gms.version" android:value="@integer/google_play_services_version" />
		<activity android:name="com.boomvideo.activities.BMYouTubePlayerViewActivity" android:label="@string/app_name" android:screenOrientation="landscape" />
        <activity android:name="com.boomvideo.activities.BMOfferlistActivity" android:label="@string/app_name" android:configChanges="orientation|keyboardHidden|screenSize"/>
        <activity android:name="com.boomvideo.activities.BMNonYoutubePlayerActivity" android:label="@string/app_name" android:screenOrientation="landscape" />
        <activity android:name="com.boomvideo.activities.InterstitialActivity" android:label="@string/app_name" android:configChanges="keyboardHidden|orientation" android:screenOrientation="portrait" />
        <receiver android:name="com.boomvideo.handler.PackageListener">
        	<intent-filter>
            	<action android:name="android.intent.action.PACKAGE_ADDED" />
                <action android:name="android.intent.action.PACKAGE_REPLACED"/>
                <data android:scheme="package" />
            </intent-filter>
        </receiver>
    </application>
]]></manifestAdditions></android>
```
For a full example of the `*-app.xml` please refer to the [demo](https://github.com/BoomSDK/ANE-integration/blob/master/bin/BOOM-ANE-integration-app.xml).

Using the ANE
=============
In your AS3 class, make the following import:  
```as3
import com.boom.nativeExtensions.boomVideo.BoomVideo;
import com.boom.nativeExtensions.boomVideo.BoomVideoEvent;
```

Then create a BoomVideo instance:  
`var boomVideo:BoomVideo = new BoomVideo();`  
Note that BoomVideo is a **Singleton**, it can only have one instance which can also be used thanks to a static:  
`BoomVideo.getInstance();`

Now init the SDK with your keys:  
`boomVideo.init("9c6543a6-a41e-4657-9178-84210b22d794", "9c6543a6-a41e-4657-9178-84210b22d794");`

Add the listener for catching later BoomVideo's event:  
```as3
boomVideo.addEventListener(BoomVideoEvent.VideoEvent, onBoomVideoEvent);

private function onBoomVideoEvent(bvEvt:BoomVideoEvent):void {
	
	trace(bvEvt.json);
	trace(bvEvt.eventName, bvEvt.videoPercentage, bvEvt.pointsRevealed);
}
```

Finally you just have to call the video type requested:  
```as3
boomVideo.showPrerollVideo();
boomVideo.showRewardVideo();
boomVideo.showOfferListVideo();
```

Compiling the ANE
=================
To compile this ANE, you need to have [ANT](http://ant.apache.org/) installed on your (OS X) machine, and [Java 1.6](https://support.apple.com/kb/DL1572).  
Clone the repository, and change the [build.config](https://github.com/BranchMetrics/Branch-AIR-ANE-SDK/blob/master/build/build.config) to match your computer settings with the path to your AIR SDK (you should have the latest one), to the Android SDK, and to a keystore (a certificate for Air, which may be a self-signed certificate created with adt).  
Finally open a command line, `cd` in the directory and just call `ant`.