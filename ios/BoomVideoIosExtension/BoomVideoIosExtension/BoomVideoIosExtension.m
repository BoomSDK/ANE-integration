//
//  BoomVideoIosExtension.m
//  BoomVideoIosExtension
//
//  Created by Aymeric Lamboley on 30/06/2015.
//  Copyright (c) 2015 Boom. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <objc/runtime.h>
#import "FlashRuntimeExtensions.h"
#import "BMResourceManager.h"
#import <GooglePlus/GooglePlus.h>

#import "BoomVideoHelpers.h"
#import "TypeConversion.h"

#define DEFINE_ANE_FUNCTION(fn) FREObject (fn)(FREContext context, void* functionData, uint32_t argc, FREObject argv[])
#define MAP_FUNCTION(fn, data) { (const uint8_t*)(#fn), (data), &(fn) }

BoomVideoHelpers* boomVideoHelpers;
TypeConversion* typeConverter;

DEFINE_ANE_FUNCTION(init) {
    
    NSString* key;
    [typeConverter FREGetObject:argv[0] asString:&key];
    
    boomVideoHelpers = [[BoomVideoHelpers alloc] initWithContext:context andKey:key];
    
    return NULL;
}

DEFINE_ANE_FUNCTION(showOfferListVideo) {
    
    [boomVideoHelpers showOfferListVideo];
    
    return NULL;
}

DEFINE_ANE_FUNCTION(showPrerollVideo) {
    
    [boomVideoHelpers showPrerollVideo];
    
    return NULL;
}

DEFINE_ANE_FUNCTION(showRewardVideo) {
    
    [boomVideoHelpers showRewardVideo];
    
    return NULL;
}

bool applicationOpenURLSourceApplication(id self, SEL _cmd, UIApplication* application, NSURL* url, NSString* sourceApplication, id annotation) {
    
    return [GPPURLHandler handleURL:url sourceApplication:sourceApplication annotation:annotation];
}

void BoomVideoContextInitializer(void* extData, const uint8_t* ctxType, FREContext ctx, uint32_t* numFunctionsToSet, const FRENamedFunction** functionsToSet) {
    
    id delegate = [[UIApplication sharedApplication] delegate];
    
    Class objectClass = object_getClass(delegate);
    
    NSString *newClassName = [NSString stringWithFormat:@"Custom_%@", NSStringFromClass(objectClass)];
    Class  modDelegate = NSClassFromString(newClassName);
    
    if (modDelegate == nil) {
        
        modDelegate = objc_allocateClassPair(objectClass, [newClassName UTF8String], 0);
        
        SEL selectorToOverride1 = @selector(application:openURL:sourceApplication:annotation:);
        
        Method m1 = class_getInstanceMethod(objectClass, selectorToOverride1);
        
        class_addMethod(modDelegate, selectorToOverride1, (IMP)applicationOpenURLSourceApplication, method_getTypeEncoding(m1));
        
        objc_registerClassPair(modDelegate);
    }
    
    object_setClass(delegate, modDelegate);
    
    static FRENamedFunction functionMap[] = {
        MAP_FUNCTION(init, NULL),
        MAP_FUNCTION(showOfferListVideo, NULL),
        MAP_FUNCTION(showPrerollVideo, NULL),
        MAP_FUNCTION(showRewardVideo, NULL)
    };
    
    *numFunctionsToSet = sizeof(functionMap) / sizeof(FRENamedFunction);
    *functionsToSet = functionMap;
    
    typeConverter = [[TypeConversion alloc] init];
}

void BoomVideoContextFinalizer(FREContext ctx) {
    return;
}

void BoomVideoExtensionInitializer(void** extDataToSet, FREContextInitializer* ctxInitializerToSet, FREContextFinalizer* ctxFinalizerToSet) {
    
    extDataToSet = NULL;
    *ctxInitializerToSet = &BoomVideoContextInitializer;
    *ctxFinalizerToSet = &BoomVideoContextFinalizer;
}

void BoomVideoExtensionFinalizer() {
    return;
}
