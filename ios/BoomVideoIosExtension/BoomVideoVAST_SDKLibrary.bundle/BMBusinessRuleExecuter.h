//
//  BMBusinessRuleExecuterViewController.h
//  Boom
//
//  Created by Boom on 01/10/14.
//  Copyright (c) 2014 Boom. All rights reserved.
//



#import <UIKit/UIKit.h>
#import "BusinessRuleExecuterDelegate.h"
#import "AnalyticsTrackingDelegate.h"
typedef void(^offerlistBrandliftResponse)(NSString *responseString);
@interface BMBusinessRuleExecuter : NSObject <BusinessRuleExecuterDelegate>

@property (nonatomic,assign) id<AnalyticsTrackingDelegate> analyticsDelegate;
@property (strong, nonatomic) offerlistBrandliftResponse brandliftBlock;

- (void)executeBusinessRuleForUI:(NSArray*)array;

- (void)shareOnFaceBook:(NSString *)linkString;
- (void)shareOnTwitter:(NSString *)linkString;
- (void)shareOnGooglePlus:(NSString *)linkString;

- (void)analyticsUrl:(NSString *)analyticsUrl withStatus:(NSString *)parameter withCallBack:(BOOL)callBack;
- (void)analyticsDelegateCallBack:(NSString *)parameter;

@end
