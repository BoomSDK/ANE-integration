//
//  BoomvideoHelpers.m
//  BoomVideoIosExtension
//
//  Created by Aymeric Lamboley on 07/07/2015.
//  Copyright (c) 2015 Boom. All rights reserved.
//

#import "BoomVideoHelpers.h"
#import "TypeConversion.h"

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
    
    [self dispatchEvent:@"BOOM_VIDEO_EVENT" withParams:[TypeConversion ConvertNSDictionaryToJSONString:detailData]];
}

- (void) dispatchEvent:(NSString *) event withParams:(NSString * ) params {
    
    const uint8_t* par = (const uint8_t*) [params UTF8String];
    const uint8_t* evt = (const uint8_t*) [event UTF8String];
    
    FREDispatchStatusEventAsync(ctx, evt, par);
}

@end
