//
//  BoomVideoTrackerDelegate.h
//  Boom
//
//  Created by Boom on 06/12/14.
//  Copyright (c) 2014 Boom. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef NS_ENUM(NSInteger, BOOMEventErrorCode){
    
    kAdLoaded,
    kAdClosed,
    
    kVideoStarted = 100,
    kVideoPaused,
    kVideoCompletedwithPercentage,
    kSuccessfulSharedOnFacebook,
    kSuccessfulSharedOnTwitter,
    kSuccessfulSharedOnGooglePlus,
    kSurveyCompleted,
    kSurveyNotCompleted,
    
    kRedirectedToBlog,
    kRedirectedToInstall,
    kRedirectedToInstagram,
    kRedirectedToSlideshare,
    kRedirectedToPurchase,
    kRedirectedToAnnotation,
    kRedirectedToSignUp,
    
    kInterstitial,
    kBanner,
    
    kNetworkNotAvailableError = - 200,
    kUnknownError,
    
};

@protocol BoomVideoTrackerDelegate <NSObject>

@required
- (void)boomVideoTrackCallbackWithEvent:(BOOMEventErrorCode) eventCode withData:(NSDictionary*)detailData;

@end
