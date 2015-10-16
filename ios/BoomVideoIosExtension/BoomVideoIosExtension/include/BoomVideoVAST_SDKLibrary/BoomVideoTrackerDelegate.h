//
//  BoomVideoTrackerDelegate.h
//  Boom
//
//  Created by Boom on 06/12/14.
//  Copyright (c) 2014 Boom. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef NS_ENUM(NSInteger, BOOMEventCode){
    
    kAdViewLoaded,
    kAdViewClosed,
    kAdFailed,
    kPointsRevealed,
    
    kSuccessfulSharedOnFacebook,
    kSuccessfulSharedOnTwitter,
    kSuccessfulSharedOnGooglePlus,
        
};

#define kGetPoints          @"pointsRevealed"
#define kErrorInfo          @"errorInfo"
#define kErrorDescription   @"errorDescription"

#define kNoFill             @"NoFill"
#define kNetworkError       @"NetworkError"
#define kInternalError      @"InternalError"

@protocol BoomVideoTrackerDelegate <NSObject>

@required
- (void)boomVideoTrackCallbackWithEvent:(BOOMEventCode) eventCode withData:(NSDictionary*)detailData;

@end
