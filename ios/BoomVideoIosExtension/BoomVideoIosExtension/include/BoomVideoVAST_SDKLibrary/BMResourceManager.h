//
//  BMResourceManager.h
//  Boom
//
//  Created by Boom on 29/09/14.
//  Copyright (c) 2014 Boom. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BoomVideoTrackerDelegate.h"

typedef NS_ENUM(NSInteger, BMFunctionType) {
    BMPreroll,
    BMReward,
    BMOfferList
};

@interface BMResourceManager : NSObject 

@property (nonatomic, assign) id<BoomVideoTrackerDelegate> videoTrackerInfoDelegate;

+(BMResourceManager *) sharedInstance;
- (void)showVideoForGUID:(NSString *)boomGuid withType:(BMFunctionType)type ;

@end
