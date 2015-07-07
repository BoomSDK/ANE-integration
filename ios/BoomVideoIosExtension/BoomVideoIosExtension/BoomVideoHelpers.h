//
//  BoomvideoHelpers.h
//  BoomVideoIosExtension
//
//  Created by Aymeric Lamboley on 07/07/2015.
//  Copyright (c) 2015 Boom. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "FlashRuntimeExtensions.h"
#import "BMResourceManager.h"

@interface BoomVideoHelpers : NSObject <BoomVideoTrackerDelegate> {
    
    FREContext ctx;
    
    NSString *key;
}

@property (nonatomic, strong) BMResourceManager *resourceManager;

- (id) initWithContext:(FREContext) context andKey:(NSString *) boomVideoKey;
- (void) showPrerollVideo;
- (void) showRewardVideo;
- (void) showOfferListVideo;

@end
