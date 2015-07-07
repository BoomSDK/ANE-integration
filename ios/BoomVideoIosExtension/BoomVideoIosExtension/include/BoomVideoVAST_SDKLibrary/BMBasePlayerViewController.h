//
//  BMBasePlayerViewController.h
//  Boom
//
//  Created by Boom on 07/10/14.
//  Copyright (c) 2014 Boom. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "BMVideoData.h"
#import <Social/Social.h>
//#import "BMResourceManager.h"


//@class BMResourceManager;

@interface BMBasePlayerViewController : UIViewController <UICollectionViewDataSource, UICollectionViewDelegateFlowLayout>

@property (nonatomic, strong) UIViewController *currentViewController;

- (void)createUIForBusinessRule:(NSArray*)businessRuleArray;
- (void)createUIForOfferList;
- (void)playVideoFromBoom:(NSString*)videoID;
- (void)dismissVideoPlayer;
- (void)closeButtonPressed;
- (void)shareOnFbButtonPressed;
- (void)shareOnTwitterButtonPressed;
- (void)shareOnGooglePlusButtonPressed;
- (void)createShareButtons:(UIViewController *)videoView;
- (void)showAnnotation:(UIViewController *)viewController;
- (void)hideAnnotation;
- (void)showAnnotationButtonclicked;
- (void)showCloseButton:(UIViewController *)viewController;

- (void)videoPlayerStatuswithUrl:(NSString *)analyticsUrl withParameter:(NSString *)paramater withCallBack:(BOOL)callBack;

@end
