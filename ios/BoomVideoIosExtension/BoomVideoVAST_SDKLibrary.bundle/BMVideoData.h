//
//  BMVideoData.h
//  Boom
//
//  Created by Boom on 6/18/14.
//  Copyright (c) 2014 Boom. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface BMVideoData : NSObject

@property (nonatomic,copy) NSString *sourceID;                      //
@property (nonatomic,copy) NSString *sponser;                       //
@property (nonatomic,copy) NSString *videoLink;                     //

@property (nonatomic,copy) NSString *boomId;                        //  id
@property (nonatomic,copy) NSString *boomGUID;                      //  boomGuid
@property (nonatomic,copy) NSString *sponserName;                   //  sponserName
@property (nonatomic,copy) NSString *sponserLink;                   //  sponserLink
@property (nonatomic,copy) NSString *annolink;                      //  AnnotationLink
@property (nonatomic,copy) NSString *annName;                       //  AnnotationTitle
@property (nonatomic,copy) NSString *playerLink;                    //  playerLink
@property (nonatomic,copy) NSString *completedTrackingPixel;        //  completedTrackingPixel
@property (nonatomic,copy) NSString *descriptionString;             //  description
@property (nonatomic,copy) NSString *gameCampaignGuid;              //  gameCampaignGuid
@property (nonatomic,copy) NSString *imageThumbnail;                //  imageThumbnail
@property (nonatomic,copy) NSString *mobileDescription;             //  mobileDescription
@property (nonatomic,copy) NSString *name;                          //  name
@property (nonatomic,copy) NSString *nonVideoCampaignAndroidUrl;    //  nonVideoCampaignAndroidUrl
@property (nonatomic,copy) NSString *nonVideoCampaignIosUrl;        //  nonVideoCampaignIosUrl
@property (nonatomic,copy) NSString *nonVideoCampaignDescription;   //  nonVideoCampaignDescription
@property (nonatomic,copy) NSString *nonVideoCampaignImageThumbnail;//  nonVideoCampaignImageThumbnail
@property (nonatomic,copy) NSString *nonVideoCampaignType;          //  nonVideoCampaignType
@property (nonatomic,copy) NSString *nonVideoCampaignWebsiteUrl;    //  nonVideoCampaignWebsiteUrl
@property (nonatomic,copy) NSString *nonVideoCampaignName;          //  nonVideoCampaignWebsiteUrl
@property (nonatomic,copy) NSString *title;                         //  title
@property (nonatomic,copy) NSString *trackingPixel;                 //  trackingPixel
@property (nonatomic,copy) NSString *youtubeId;                     //  youtubeId
@property (nonatomic,copy) NSString *youtubeLink;                   //  youtubeLink
@property (nonatomic,copy) NSString *callBackFireTime;              //  callBackFireTime
@property (nonatomic,copy) NSString *callBackUrl;                   //  callBackUrl
@property (nonatomic,copy) NSString *currency;                      //  currency
@property (nonatomic,copy) NSString *gameCampaignId;                //  gameCampaignId
@property (nonatomic,copy) NSString *videoCampaignId;               //  videoCampaignId
@property (nonatomic,copy) NSString *height;                        //  height
@property (nonatomic,copy) NSString *preroll;                       //  preroll
@property (nonatomic,copy) NSString *privateKey;                    //  privateKey
@property (nonatomic,copy) NSString *reward;                        //  reward
@property (nonatomic,copy) NSString *skip;                          //  skip
@property (nonatomic,copy) NSString *skipTime;                      //  skipTime
@property (nonatomic,copy) NSString *value;                         //  value
@property (nonatomic,copy) NSString *width;                         //  width
@property (nonatomic,copy) NSString *text;
@property (nonatomic,copy) NSNumber *optionId;                      //  optionId
@property (nonatomic,copy) NSNumber *brandliftId;                   //  brandliftId
@property (nonatomic,copy) NSString *option;                        //  option
@property (nonatomic,copy) NSString *frequencyCapValue;             //  freqCap
@property (nonatomic,copy) NSString *mraidType;
@property (nonatomic,strong) NSMutableArray *surveyQuestion;        //  survey
@property (nonatomic,copy) NSString *mraidHtmlString;
@property (nonatomic) double annStart;                              //  AnnotationStartTime
@property (nonatomic) double annEnd;                                //  AnnotationFinishTime
@property (nonatomic) int socialSharing;                            //  SocialSharing

@property (nonatomic) BOOL isMraid;
@property (nonatomic) BOOL isVAST;

@property (nonatomic, strong) NSMutableDictionary *vastData;
@property (nonatomic) int vastCreativeId;
@property (nonatomic) int vastId;
@property (nonatomic, copy) NSString *vastCampaign;
@property (nonatomic, copy) NSString *vastClickTracking;
@property (nonatomic, copy) NSString *vastError;
@property (nonatomic, strong) NSMutableArray *vastImpression;
@property (nonatomic, strong) NSMutableArray *vastTrackingEvent;

@end
