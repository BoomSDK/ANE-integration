//
//  BMResourceManager.h
//  Boom
//
//  Created by Boom on 29/09/14.
//  Copyright (c) 2014 Boom. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BMBusinessRuleExecuter.h"
#import "BMVideoData.h"
#import "BoomVideoTrackerDelegate.h"
#import "AnalyticsTrackingDelegate.h"

@class BMBusinessRuleRequestResponseHandler;
@class BMBusinessRuleExecuter;

typedef enum {
    BMPreroll = 0,
    BMReward = 1,
    BMOfferList = 2,
    BMBanner
} BMFunctionType;

typedef enum {
    LessThan,
    LessThanEqualTo,
    EqualTo,
    GreaterThan,
    GreaterThanEqualTo
} BMComparingType;

@interface BMResourceManager : NSObject <AnalyticsTrackingDelegate>

+(BMResourceManager *) sharedInstance;
- (void)showVideoForGUID:(NSString *)boomGuid withType:(BMFunctionType)type ;
- (void)showInterstitialForGUID:(NSString *)boomGuid withUrl:(NSString *)urlString onTarget:(UIViewController *)viewController;
- (BOOL)versionOfDeviceIs:(BMComparingType)comparingType withVersion:(int)version;
- (void)forwardDataToBusinessExecuter:(NSArray*)dataArray withBoomGuid:(NSString*)boomGuid;
- (void)stopIndicator;
- (NSString *)getIPAddress;
- (NSString *)createASIdentifier;

@property (nonatomic, assign) id<BoomVideoTrackerDelegate> videoTrackerInfoDelegate;
@property (nonatomic, strong) BMBusinessRuleExecuter *businessRuleExecuter;
@property (nonatomic, strong) BMVideoData *videoData;
@property (nonatomic, strong) NSMutableArray *campaignsArray;
@property (nonatomic, copy) NSString *vpid;
@property (nonatomic, copy) NSString *boomGuid;
@property (nonatomic, assign) int type;
@property (nonatomic, assign) BOOL flag;
@property (nonatomic, assign) BOOL isNetworkReachable;
@property (nonatomic, strong) NSString *videoPercentCompletion;
@property (nonatomic, copy) NSString *points;
@property (nonatomic, copy) NSString *MraidPoints;
@property (nonatomic, strong) UIActivityIndicatorView *indicator;

@end
