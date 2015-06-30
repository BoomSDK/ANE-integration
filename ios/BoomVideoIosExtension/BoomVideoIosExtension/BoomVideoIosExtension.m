//
//  BoomVideoIosExtension.m
//  BoomVideoIosExtension
//
//  Created by Aymeric Lamboley on 30/06/2015.
//  Copyright (c) 2015 Boom. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "FlashRuntimeExtensions.h"
#import "BMResourceManager.h"

#define DEFINE_ANE_FUNCTION(fn) FREObject (fn)(FREContext context, void* functionData, uint32_t argc, FREObject argv[])
#define MAP_FUNCTION(fn, data) { (const uint8_t*)(#fn), (data), &(fn) }

DEFINE_ANE_FUNCTION(init) {
    
    [[BMResourceManager sharedInstance] showVideoForGUID:@"ca92b245-7951-43f3-b76d-ab10f9ade5c3" withType:BMPreroll];
    
    return NULL;
}

void BoomVideoContextInitializer(void* extData, const uint8_t* ctxType, FREContext ctx, uint32_t* numFunctionsToSet, const FRENamedFunction** functionsToSet) {
    
    static FRENamedFunction functionMap[] = {
    };
    
    *numFunctionsToSet = sizeof(functionMap) / sizeof(FRENamedFunction);
    *functionsToSet = functionMap;
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
