//
//  AnalyticsTrackingDelegate.h
//  BoomVideoSDK
//
//  Created by Boom on 11/28/14.
//  Copyright (c) 2014 Boom. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BoomVideoTrackerDelegate.h"

@protocol AnalyticsTrackingDelegate <NSObject>

@required
-(void)analyticsTrackingEvent:(BOOMEventErrorCode) eventCode withData:(NSMutableDictionary*)analyticsData;

@end