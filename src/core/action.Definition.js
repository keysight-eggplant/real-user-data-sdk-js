/**
 * @typedef {Object} Action
 * @link https://developer.mozilla.org/en-US/docs/Web/Events
 * @description Considerdations: In case of clipboard events, for instance when somebody pastes, all the actionStart properties may be empty/null
 * @property {String|null} actionStartEventCategory - Enum: "Clipboard", "Focus", "Drag and Drop", "Touch", "Keyboard", "Mouse". More to come, this is only an initial list that I feel we should support
 * @property {String} actionEndEventCategory - Enum: "clipboard", "Focus", "Drag and Drop", "Touch", "Keyboard", "Mouse". More to come, this is only an initial list that I feel we should support
 * @property {String|null} actionStartEventName - The type of the event that started the action. Ex: mousedown
 * @property {String} actionEndEventName - The type of the event that ended the action. Ex: mouseup
 * @property {Number|null} actionStartEventTimestamp - When the action started in miliseconds
 * @property {Number} actionEndEventTimestamp - When the action ended in miliseconds
 * @property {String|null} actionStartElementCategory - Enum: "document", "window", "StaticElement", "FormElement"
 * @property {String} actionEndElementCategory - Enum: "document", "window", "StaticElement", "FormElement"
 * @property {Element|null} actionStartElement - In case of clicks/swipes the element that was under the pointer/finger when the action started. In case of scroll the "document". In case of pan in/pan out, the element that was zoomed in/out. In case of device tilt, the "document" 
 * @property {Element} actionEndElement - In case of clicks/swipes the element that was under the pointer/finger when the action ended. In case of scroll the "document". In case of pan in/pan out, the element that was zoomed in/out. In case of device tilt, the "document" 
 * @property {String|null} actionStartElementXPath - The XPath of the element
 * @property {String} actionEndElementXPath - The XPath of the element
 * @property {String|null} actionStartElementCSSPath - The CSS path of the element
 * @property {String} actionEndElementCSSPath - The CSS path of the element
 * @property {String|null} actionStartElementViewPortCoords - The coordinates of the element in px relative to the top left corner of the screen separated by comma on horizontal and vertical axis
 * @property {Number|null} actionStartElementWidth - The width in px of the element
 * @property {Number|null} actionStartElementHeight - The height in px of the element
 * @property {Boolean|null} actionStartElementHidden - Enum: null if not applicable, true if is hidden, false if is visible
 * @property {Boolean|null} actionStartElementDisabled - Enum: null if not applicable, true if is disabled, false if is enabled
 * @property {String} actionEndElementViewPortCoords - The coordinates of the element in px relative to the top left corner of the screen separated by comma on horizontal and vertical axis
 * @property {Number} actionEndElementWidth - The width in px of the element
 * @property {Number} actionEndElementHeight - The height in px of the element
 * @property {Boolean} actionEndElementHidden - Enum: null if not applicable, true if is hidden, false if is visible
 * @property {Boolean} actionEndElementDisabled - Enum: null if not applicable, true if is disabled, false if is enabled
 * @property {String|null} actionStartElementImage - Cropped image of the element for OCR purposes
 * @property {String} actionEndElementImage - Cropped image of the element for OCR purposes
 * @property {ActionEventLocation[]} actionEventLocations - An array of objects with all the locations of the pointer, finger. This can be used to calculate heatmaps, rage clicks, rage abandonment, user anxiety and other various metrics for abandonment. Probably this can be a phase 2.
 * */


/**
 * PHASE 2
 * @typedef {Object} ActionEventLocation
 * @property {Number} hCoords - Horizontal coordinates in px relative to top left corner of the viewport
 * @property {Number} vCoords - Vertical coordinates in px relative to top left corner of the viewport
 * @property {Number} timestamp - Timestamp when the location was registered
 * */
