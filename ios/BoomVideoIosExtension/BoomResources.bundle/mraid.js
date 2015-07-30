/**
 * MRAID js.
 */

(function() {
  var mraid = window.mraid = {};
  var version = "2.0";
  
  /**Constants and Properties*/
  
  /** Expand Properties */
  var expandProperties = {
    width: 0,
    height: 0,
    useCustomClose: false,
    isModal: true
  };

  /** Resize Properties */
  var RESIZE_PROPERTIES_CUSTOM_CLOSE_POSITION = 
    mraid.RESIZE_PROPERTIES_CUSTOM_CLOSE_POSITION = {
      TL       : "top-left",
      TR       : "top-right",
	  TC       : "top-center",
      C        : "center",
      BL       : "bottom-left",
      BR       : "bottom-right",
	  BC       : "bottom-center"
  };
  var resizeProperties = {
    width:0,
    height:0,
    customClosePosition: RESIZE_PROPERTIES_CUSTOM_CLOSE_POSITION.TR,
    offsetX:0,
    offsetY:0,
    allowOffscreen:false
  };
	
  /** EVENTS*/
  var EVENTS = mraid.EVENTS = {
	READY                   :"ready",
	ERROR                   :"error",
	STATE_CHANGE            :"stateChange",
	VIEWABLE_CHANGE         :"viewableChange",
	SIZE_CHANGE             :"sizeChange"
  };
  
  /**State*/
  var STATES = mraid.STATES = {
    LOADING : "loading",
	DEFAULT: "default",
    RESIZED: "resized",
    EXPANDED: "expanded",
    HIDDEN: "hidden"
  };
  var currentState = STATES.LOADING;
  
  /**Placement Type*/
  var PLACEMENT_TYPE = mraid.PLACEMENT_TYPE = {
    INLINE : "inline",
    INTERSTITIAL : "interstitial"
  };
  var placementType = PLACEMENT_TYPE.INLINE;
  var isViewable = false;
  
  /** Orientation Properties */
  var ORIENTATION_PROPERTIES_FORCE_ORIENTATION = mraid.ORIENTATION_PROPERTIES_FORCE_ORIENTATION = {
	PORTRAIT    :"portrait",
	LANDSCAPE   :"landscape",
	NONE        :"none"
  };
  var orientationProperties = {
    allowOrientationChange: true,
    forceOrientation: "none"
  };
  
  /** Size and Position properties*/
  var shouldResize = false;
  var currentPosition = {
    x:0,
    y:0,
    width:0,
    height:0
  };
  var maxSize = {
    width:0,
    height:0
  };
  var defaultPosition = {
    x:0,
    y:0,
    width:0,
    height:0
  };
  var screenSize = {
    width:0,
    height:0
  };
  
  /**Property validators*/
  var expandPropertiesValidator = {
    width : function(width) {
      return !isNaN(width);
    },
    height : function(height) {
      return !isNaN(height);
    },
    useCustomClose : function(useCustomClose) {
      return (typeof useCustomClose === "boolean");
    }
  };
  
  var orientationPropertiesValidator = {
    allowOrientationChange : function(allowOrientationChange) {
      return (typeof allowOrientationChange === "boolean");
    },
    forceOrientation : function(forceOrientation) {
      var validValues = [ "portrait","landscape","none" ];
      return validValues.indexOf(forceOrientation) !== -1;
    }
  };
  
  var resizePropertiesValidator = {
    width : function(width) {
      return !isNaN(width) && width >= 50;
    },
    height : function(height) {
      return !isNaN(height) && height >= 50;
    },
    offsetX : function(offsetX) {
      return !isNaN(offsetX);
    },
    offsetY : function(offsetY) {
      return !isNaN(offsetY);
    },
    customClosePosition : function(customClosePosition) {
      var validPositions = [ "top-left","top-center","top-right","center","bottom-left","bottom-center","bottom-right" ];
      return validPositions.indexOf(customClosePosition) !== -1;
    },
    allowOffscreen : function(allowOffscreen) {
      return (typeof allowOffscreen === "boolean");
    }
  };
  
  /**FEATURES properties*/
  var FEATURES = mraid.FEATURES = {
    SMS             :"sms",
    PHONE           :"tel",
    CALENDAR        :"calendar",
    STORE_PICTURE   :"storePicture",
    INLINE_VIDEO    :"inlineVideo"
  };
  var supportedFeatures = {};
  
  /** Event Listeners*/
  var listeners = {};
  
  mraid.addEventListener = function(event, listener) {
    if (!event || !listener) {
      triggerEvent(EVENTS.ERROR, 'Both event and listener are required.', 'addEventListener');
    } else if (!contains(event, EVENTS)) {
	  triggerEvent(EVENTS.ERROR, 'Unknown event: ' + event, 'addEventListener');
	} else {
	  var handlers = listeners[event] = listeners[event] || [];
      for (var i = 0; i < handlers.length; i++) {
        if (listener === handlers[i]) {
          return;
        }
      }
      handlers.push(listener);
	}
  };
  
  mraid.removeEventListener = function(event, listener) {
    if (!event) {
      triggerEvent(mraid.EVENTS.ERROR, 'An event must be specified.', 'removeEventListener');
    } else if (!contains(event, EVENTS)) {
	  triggerEvent(mraid.EVENTS.ERROR, 'Unknown event: ' + event, 'removeEventListener');
	} else {
	  var handlers = listeners[event];
      for (var idx = 0; idx < handlers.length; idx++) {
        var registeredListener = handlers[idx];
        if (listener === registeredListener) {
          handlers.splice(idx, 1);
          break;
        }
	  }	
      if (handlers.length === 0) {
        delete listeners[event];
      }
	}
  };  
  
  mraid.triggerReadyEvent = function() {
    triggerEvent(mraid.EVENTS.READY);
  };
 
 mraid.triggerErrorEvent = function(errorMessage, nameOfFunction) {
 triggerEvent(mraid.EVENTS.ERROR,errorMessage,nameOfFunction);
 };
 
  mraid.triggerSizeChangeEvent = function(width, height) {
    triggerEvent(mraid.EVENTS.SIZE_CHANGE, width, height);
  };
  
  /**State get/set*/  
  mraid.setState = function(newState) {
    var diff = currentState != newState;
    if (diff) {
      currentState = newState;
	  triggerEvent(EVENTS.STATE_CHANGE, currentState);
    }
  };
  mraid.getState = function() {
    return currentState;
  };
  
  /**Placement get/set*/
  mraid.setPlacementType = function(newPlacementType) {
    placementType = newPlacementType;
  };
  mraid.getPlacementType = function() {
    return placementType;
  };
  
  /**Viewable get/set*/
  mraid.setViewable = function(viewable) {
    var diff = isViewable != viewable;
    if (diff) {
	  isViewable = viewable;
      triggerEvent(EVENTS.VIEWABLE_CHANGE, isViewable);
    }
  };
  mraid.isViewable = function() {
    return isViewable;
  };
  
  /**MRAID open-close*/
  mraid.open = function(url) {
    if (!url) {
      triggerEvent(mraid.EVENTS.ERROR, 'An URL is required.', 'open');
    } else {
	  callBoomNative(url,"open");
	}
  };
  mraid.close = function() {
    if (currentState === STATES.LOADING ||
        (currentState === STATES.DEFAULT && placementType === PLACEMENT_TYPE.INLINE) ||
        currentState === STATES.HIDDEN) {
      return;
    }
    callBoomNative("nil","close");
  };
  
  /**Orientation properties - get/set*/ 
  mraid.setOrientationProperties = function(properties) {
    if (!isValidProperties(properties, orientationPropertiesValidator, 'setOrientationProperties')) {
      return;
    }
	var currOrientationProperties = {};
    currOrientationProperties.allowOrientationChange = orientationProperties.allowOrientationChange,
    currOrientationProperties.forceOrientation = orientationProperties.forceOrientation;
    
    var writableProperties = [ "allowOrientationChange", "forceOrientation" ];
    for (wf in writableProperties) {
      var nameProp = writableProperties[wf];
      if (properties[nameProp] !== undefined) {
        currOrientationProperties[nameProp] = properties[nameProp];
      }
    }
	if (currOrientationProperties.allowOrientationChange &&
      currOrientationProperties.forceOrientation !== mraid.ORIENTATION_PROPERTIES_FORCE_ORIENTATION.NONE) {
      triggerEvent(EVENTS.ERROR, "allowOrientationChange is true but forceOrientation is " + currOrientationProperties.forceOrientation,
                       "setOrientationProperties");
      return;
    }
    orientationProperties.allowOrientationChange = currOrientationProperties.allowOrientationChange;
    orientationProperties.forceOrientation = currOrientationProperties.forceOrientation;
    var params ={"allowOrientationChange":orientationProperties.allowOrientationChange,
	 "forceOrientation":orientationProperties.forceOrientation};
	var jsonStr = JSON.stringify(params);
    callBoomNative(jsonStr, "setOrientationProperties");
  };
  mraid.getOrientationProperties = function() {
    return orientationProperties;
  };
 
  /**Resize properties - get/set*/
  mraid.setResizeProperties = function(properties) {
    shouldResize = false;
    var writableFields = [ "width", "height", "offsetX", "offsetY" ];
    for (var i = 0; i < writableFields.length; i++) {
      var propName = writableFields[i];
      if (properties[propName] === undefined) {
        triggerEvent(mraid.EVENTS.ERROR, "required property " + propName + " is missing", "setResizeProperties");
        return;
      }
    }
	if (!isValidProperties(properties, resizePropertiesValidator, 'setResizeProperties')) { 
      triggerEvent(mraid.EVENTS.ERROR, "Validation is failed", "setResizeProperties");
      return;
    }
    var adjustments = { "x": 0, "y": 0 };
    var allowOffscreen = properties.hasOwnProperty("allowOffscreen") ? properties.allowOffscreen : resizeProperties.allowOffscreen;
    if (!allowOffscreen) {
      if (properties.width > maxSize.width || properties.height > maxSize.height) {
        triggerEvent(mraid.EVENTS.ERROR, "Resize width or height is greater than the maxSize width or height", "setResizeProperties");
        return;
      }
      adjustments = setResizeViewOnScreen(properties);
    } else if (!isContainedOnScreen(properties)) {
        triggerEvent(mraid.EVENTS.ERROR, "Close event region will not appear entirely on screen", "setResizeProperties");
        return;
    }
 
    var writableProperties = [ "width", "height", "offsetX", "offsetY", "customClosePosition", "allowOffscreen" ];
    for (var i = 0; i < writableProperties.length; i++) {
      var propName = writableProperties[i];
      if (properties.hasOwnProperty(propName)) {
        resizeProperties[propName] = properties[propName];
      }
    }
    var params ={"width":resizeProperties.width,
        "height":resizeProperties.height,
        "offsetX":resizeProperties.offsetX + adjustments.x,
        "offsetY":resizeProperties.offsetY + adjustments.y,
        "customClosePosition":resizeProperties.customClosePosition,
        "allowOffscreen":resizeProperties.allowOffscreen
    };
    var jsonStr = JSON.stringify(params);
    callBoomNative(jsonStr, "setResizeProperties");
    shouldResize = true;
  };

  mraid.getResizeProperties = function() {
    return resizeProperties;
  };
  
  /**Expand properties- get/set*/
  mraid.setExpandProperties = function(properties) {
    if (!isValidProperties(properties, expandPropertiesValidator, 'setExpandProperties')) {
	  return;
    }
	var currUseCustomClose = expandProperties.useCustomClose;
	var writableProperties = ["width", "height", "useCustomClose"];
    for (wf in writableProperties) {
      var nameProp = writableProperties[wf];
      if (properties[nameProp] !== undefined) {
        expandProperties[nameProp] = properties[nameProp];
      }
    }
	if (expandProperties.useCustomClose !== currUseCustomClose) {
      callBoomNative(expandProperties.useCustomClose, "useCustomClose");
    }
  };
  mraid.getExpandProperties = function() {
    return expandProperties;
  };
  
  mraid.useCustomClose = function(isCustomClose) {
    if (expandProperties.useCustomClose !== isCustomClose) {
      expandProperties.useCustomClose = isCustomClose;
      callBoomNative(expandProperties.useCustomClose,"useCustomClose");
    }
  };
  
  mraid.expand = function(url) {
    if (placementType !== PLACEMENT_TYPE.INLINE ||
      (currentState !== STATES.DEFAULT && currentState !== STATES.RESIZED)) {
      return;
    }
    if (url === undefined) {
      callBoomNative("nil","expand");
	  return;
    } 
    callBoomNative(url,"expand");
  };
  
  /** Current Position - get/set*/
  mraid.setCurrentPosition = function(x, y, width, height) {
    var previousSize = {};
    previousSize.width = currentPosition.width;
    previousSize.height = currentPosition.height;
	if (width === previousSize.width && height === previousSize.height) {
      return;
    }
    currentPosition.x = x;
    currentPosition.y = y;
    currentPosition.width = width;
    currentPosition.height = height;
    triggerEvent(mraid.EVENTS.SIZE_CHANGE, width, height);
  };
  mraid.getCurrentPosition = function() {
    return currentPosition;
  };

  /** Default Position - get/set*/
  mraid.setDefaultPosition = function(x, y, width, height) {
    defaultPosition.x = x;
    defaultPosition.y = y;
    defaultPosition.width = width;
    defaultPosition.height = height;
  };
  mraid.getDefaultPosition = function() {
    return defaultPosition;
  };
   
  mraid.setExpandSize = function(width, height) {
    expandProperties.width = width;
    expandProperties.height = height;
  };

  /**MaxSize get/set*/
  mraid.setMaxSize = function(width, height) {
    maxSize.width = width;
	maxSize.height = height;
  };
  mraid.getMaxSize = function() {
    return maxSize;
  };
  
  /**ScreenSize get/set*/
  mraid.setScreenSize = function(width, height) {
    screenSize.width = width;
    screenSize.height = height;
  };
  mraid.getScreenSize = function() {
    return screenSize;
  };
  
  mraid.resize = function() {
    if (placementType === PLACEMENT_TYPE.INTERSTITIAL || currentState === STATES.LOADING || currentState === STATES.HIDDEN) {
      return;
    }
    if (currentState === STATES.EXPANDED) {
      triggerEvent(EVENTS.ERROR, "resize is called when ad is in expanded state", "resize");
      return;
    }
    if (!shouldResize) {
      triggerEvent(EVENTS.ERROR, "resize is not ready to be called", "resize");
      return;
    }
	callBoomNative("nil","resize");
  };
  
  mraid.setSupports = function(feature, supported) {
    supportedFeatures[feature] = supported;
  };
  mraid.supports = function(feature) {
    var retVal = supportedFeatures[feature];
    return (typeof retVal !== "undefined");
  };
  
  mraid.storePicture = function(url) {
    if (mraid.supports(FEATURES.STORE_PICTURE)) {
	  callBoomNative(url, "storePicture");
	}
  };
  
  mraid.getVersion = function() {
    return version;
  }; 
  
  mraid.createCalendarEvent = function(parameters) {
    var jsonStr = JSON.stringify(parameters); 
    callBoomNative(jsonStr, "createCalendarEvent");
  };
  
  mraid.playVideo = function(url) {
    url = JSON.stringify(url);
    callBoomNative(url,"playVideo");
  };
  
  /**Common methods*/
  var isValidProperties = function(properties, validators, action) {
    for (var prop in properties) {
      if (!validators[prop]) {
        triggerEvent(EVENTS.ERROR, 'Invalid property specified - ' + prop + '.', action);
        return false;
      } else if (!validators[prop](properties[prop])) {
        triggerEvent(EVENTS.ERROR, 'Value of property ' + prop + ' is invalid.', action);
        return false;
      }
    }
    return true;
  };
  
  /*common method to fire event*/
  var triggerEvent = function(event) {

    var args = Array.prototype.slice.call(arguments);
    args.shift();
    var eventListeners = listeners[event];
    if (eventListeners) {
      var len = eventListeners.length;
      for (var i = 0; i < len; i++) {
        eventListeners[i].apply(null, args);
      }
    }
  };
 
  var contains = function(value, array) {
    for (var i in array) if (array[i] === value) return true;
    return false;
  };

  function isContainedOnScreen(properties) {
    var resizedRect = {};
    resizedRect.x = defaultPosition.x + properties.offsetX;
    resizedRect.y = defaultPosition.y + properties.offsetY;
    resizedRect.width = properties.width;
    resizedRect.height = properties.height;
 
    var customClosePosition = properties.hasOwnProperty("customClosePosition") ? properties.customClosePosition : resizeProperties.customClosePosition;
    var closeRect = { "width": 50, "height": 50 };
 
    if (customClosePosition.search("left") !== -1) {
      closeRect.x = resizedRect.x;
    } else if (customClosePosition.search("center") !== -1) {
      closeRect.x = resizedRect.x + (resizedRect.width / 2) - 25;
    } else if (customClosePosition.search("right") !== -1) {
      closeRect.x = resizedRect.x + resizedRect.width - 50;
    }
    if (customClosePosition.search("top") !== -1) {
      closeRect.y = resizedRect.y;
    } else if (customClosePosition === "center") {
      closeRect.y = resizedRect.y + (resizedRect.height / 2) - 25;
    } else if (customClosePosition.search("bottom") !== -1) {
      closeRect.y = resizedRect.y + resizedRect.height - 50;
    }
    var maxRect = { "x": 0, "y": 0 };
    maxRect.width = maxSize.width;
    maxRect.height = maxSize.height;
    return isInContainerRect(maxRect, closeRect);
  }
 
  function setResizeViewOnScreen(properties) {
    var resizedRect = {};
    resizedRect.x = defaultPosition.x + properties.offsetX;
    resizedRect.y = defaultPosition.y + properties.offsetY;
    resizedRect.width = properties.width;
    resizedRect.height = properties.height;
 
    var maxRect = { "x": 0, "y": 0 };
    maxRect.width = maxSize.width;
    maxRect.height = maxSize.height;
 
    var adjustments = { "x": 0, "y": 0 };
    if (isInContainerRect(maxRect, resizedRect)) {
      return adjustments;
    }
 
    if (resizedRect.x < maxRect.x) {
      adjustments.x = maxRect.x - resizedRect.x;
    } else if ((resizedRect.x + resizedRect.width) > (maxRect.x + maxRect.width)) {
      adjustments.x = (maxRect.x + maxRect.width) - (resizedRect.x + resizedRect.width);
    }
    if (resizedRect.y < maxRect.y) {
        adjustments.y = maxRect.y - resizedRect.y;
    } else if ((resizedRect.y + resizedRect.height) > (maxRect.y + maxRect.height)) {
        adjustments.y = (maxRect.y + maxRect.height) - (resizedRect.y + resizedRect.height);
    }
    resizedRect.x = defaultPosition.x + properties.offsetX + adjustments.x;
    resizedRect.y = defaultPosition.y + properties.offsetY + adjustments.y;
    return adjustments;
  }
 
  function isInContainerRect(containerRect, containedRect) {
    return (containedRect.x >= containerRect.x &&
      (containedRect.x + containedRect.width) <= (containerRect.x + containerRect.width) &&
      containedRect.y >= containerRect.y &&
      (containedRect.y + containedRect.height) <= (containerRect.y + containerRect.height));
  }
}());
