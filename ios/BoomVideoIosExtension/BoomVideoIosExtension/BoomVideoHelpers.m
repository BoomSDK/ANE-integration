//
//  BoomvideoHelpers.m
//  BoomVideoIosExtension
//
//  Created by Aymeric Lamboley on 07/07/2015.
//  Copyright (c) 2015 Boom. All rights reserved.
//

#import "BoomVideoHelpers.h"

@implementation BoomVideoHelpers

- (id) initWithContext:(FREContext) context andKey:(NSString *) boomVideoKey {
    
    if (self = [super init]) {
        
        ctx = context;
        
        self.resourceManager = [BMResourceManager sharedInstance];
        self.resourceManager.videoTrackerInfoDelegate = self;
        
        key = boomVideoKey;
    }
    
    return self;
}

- (void) showPrerollVideo {
    
    [self.resourceManager showVideoForGUID:key withType:BMPreroll];
}

- (void) showRewardVideo {
    
    [self.resourceManager showVideoForGUID:key withType:BMReward];
}

- (void) showOfferListVideo {
    
    [self.resourceManager showVideoForGUID:key withType:BMOfferList];
}

- (void) boomVideoTrackCallbackWithEvent:(BOOMEventErrorCode) eventCode withData:(NSDictionary*)detailData {
    
    // BOOMEventErrorCode - It will give the event codes
    // detailData - It is a dictionary which will contain three key-value pairs:
    // 1. eventName - Name of Event
    // 2. videoPercentage - Percent of video seen by user
    // 3. pointsRevealed - Points to give, according to the business rule
    NSLog(@"Tracking Details->%@",detailData);
}

@end
