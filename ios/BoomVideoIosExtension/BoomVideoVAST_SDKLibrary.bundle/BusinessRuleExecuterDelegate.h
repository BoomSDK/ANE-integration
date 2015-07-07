//
//  BusinessRuleExecuterDelegate.h
//  BoomVideoSDK
//
//  Created by Boom on 11/28/14.
//  Copyright (c) 2014 Boom. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol BusinessRuleExecuterDelegate < NSObject>
@required
- (void)executeBusinessRuleForUI:(NSArray*)array;
- (void)executeBusinessRuleForOfferList;
@end
