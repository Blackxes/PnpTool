/**
 * @File functions which have no specific place or context in which they fit the most
 * 	since they use has more variety than being for example a createBigMonster function
 * 	which is specificly built for creating a monster
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/**
 * returns a response object containing the message, its type and value
 * as well as optionally a code
 */
export var response = function (type, message, value, code) {
    if (code === void 0) { code = 0; }
    return { type: type, message: message, value: value, code: code };
};
/**
 * creates a success response
 * @see response(...)
 */
export var okResponse = function (message, value, code) {
    if (message === void 0) { message = ''; }
    if (value === void 0) { value = true; }
    if (code === void 0) { code = 200; }
    return response('ok', message, value, code);
};
/**
 * creates a error response
 * @see response(...)
 */
export var errorResponse = function (message, value, code) {
    if (value === void 0) { value = false; }
    if (code === void 0) { code = 0; }
    return response('error', message, value, code);
};
/**
 * creates a warning response
 * @see response(...)
 */
export var warningResponse = function (message, value, code) {
    if (value === void 0) { value = null; }
    if (code === void 0) { code = 0; }
    return response('warning', message, value, code);
};
/**
 * creates a info response
 * @see response(...)
 */
export var infoResponse = function (message, value, code) {
    if (value === void 0) { value = true; }
    if (code === void 0) { code = 0; }
    return response('info', message, value, code);
};
/**
 * generates a simple hash string - dont use this for as password hash!
 * this is by far one of the worst id generations for passwords
 *
 * @param int length - defines the length of the hash string
 * @param string chars - chars from which this function will pick characters
 * 	to generate the hash
 *
 * @return string - the generated hash
 */
var g_defaultHashChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
export var generateHashString = function (length, chars) {
    if (length === void 0) { length = 8; }
    if (chars === void 0) { chars = g_defaultHashChars; }
    var hash = '';
    while (length > hash.length)
        hash += chars.charAt(Math.floor(Math.random() * chars.length));
    return hash;
};
/**
 * generates a section id
 * eg. [1, 2, 3] would eventually generate f-42-l0l
 *
 * @param int sections - defines the number of sections for the id
 * @param int sectionLength - defines the length of each section
 *
 * @return string - returns a string based on the given params
 */
var g_defaultSections = [16];
export var generateId = function (sections) {
    if (sections === void 0) { sections = g_defaultSections; }
    return sections
        .map(function (length) {
        return generateHashString(length);
    })
        .join('-');
};
/**
 * joins an array of values to a string separated by a given separator and ignores null/undefined
 * additionally when an index is an array based on the first index of that array
 * the value of the second index is used or when false the backup value in the third index is used
 *
 * a perfect use for this would be for a className string since null/undefined
 * are getting filtered out
 *
 * @param array strings - array of strings which will be joined
 * @param string (optional) separator - used separator
 *
 * @return string
 * 	- empty string when strings is not an array
 * 	- joined string
 */
export var joinStrings = function (strings, separator) {
    if (separator === void 0) { separator = ' '; }
    if (!strings || strings.constructor != Array)
        return '';
    return strings
        .map(function (item) {
        return !item
            ? false
            : item.constructor == Array
                ? item[0]
                    ? item[1]
                    : item[2] || false
                : item;
    })
        .filter(Boolean)
        .join(separator);
};
/**
 * keyifies a string by lowercasing the string and replacing every
 * character into the one defined within the ASCII charset
 *
 * @param string string - the string which will be keyified
 * @param bool replaceDash - defines whether a dash shall be used
 * 	to replace white spaces / default is underscore
 *
 * @return keyified string
 */
export var keyifyString = function (string, useDash) {
    if (useDash === void 0) { useDash = true; }
    if (typeof string != 'string')
        return '';
    var keyified = string.toLowerCase();
    var whiteSpaceReplacement = useDash ? '-' : '_';
    return keyified.replace(/[-_]|\s+/g, whiteSpaceReplacement);
};
/**
 * calls every callback in the given array and passes a state object
 * as the first argument followed by the given user defined
 *
 * to cancel the process @throw the state or set the _cancel property true
 *
 * @param {object} initialState well initial state for the callbacks to accept
 * @param {array} processes array of objects containing the following properties
 * 	callback: Function - the callback which will be called
 * 		1. argument - result of previous process - undefined on first process
 * 		2. argument - state object to have data shared around callbacks when they rely on them
 * 		>2. argument - user defined arguments passed as applied array
 * 	args: Array - array of arguments passed to the callback
 *
 * @return {object} the shared state object which is processed through the callbacks
 */
export var processCallbacks = function (initialState, processes) {
    var state = __assign(__assign({}, initialState), { _cancel: false });
    for (var _i = 0, processes_1 = processes; _i < processes_1.length; _i++) {
        var config = processes_1[_i];
        var callback = config.callback, args = config.args, thisArg = config.thisArg;
        // a bit more userfriendly when you only have a callback
        // instead of having an object with only the callback property
        if (typeof config == 'function')
            callback = config;
        try {
            state = __assign(__assign({}, state), callback.apply(thisArg, __spreadArrays([state], (args || []))));
            if (state._continue)
                throw state;
        }
        catch (state) {
            return state;
        }
    }
    return state;
};
/**
 * returns intersection of array of objects
 * Todo: implement
 */
// export const arrayObjectIntersection = (key, ...arrays) => {
// 	const intersection = arrays.
// }
/**
 * @Important requirements for these functions are that every entry in the state
 * must be an array and every entry inside the array (first level)
 * must be an object providing an unique id key which is used to identify the entry
 *
 * pattern = state = {
 * 		key: [
 * 			{
 * 				id: string | number
 * 			}
 * 		]
 * 	}
 */
/**
 * returns a new state object containing the new entry
 */
export var addToState = function (state, key, entry, multiple) {
    var _a;
    if (multiple === void 0) { multiple = false; }
    return (__assign(__assign({}, state), (_a = {}, _a[key] = __spreadArrays(state[key], (multiple ? entry : [entry])), _a)));
};
/**
 * returns a new state object from which the entry
 * 	with given id (when found) is deleted
 */
export var deleteFromState = function (state, key, id) {
    var _a;
    return (__assign(__assign({}, state), (_a = {}, _a[key] = __spreadArrays(state[key].filter(function (item) { return item.id != id; })), _a)));
};
/**
 * returns a new state object in which the requested entry (when found)
 * 	has been update with the given one
 */
export var updateInState = function (state, key, id, replacement) {
    var _a;
    return (__assign(__assign({}, state), (_a = {}, _a[key] = __spreadArrays(state[key].map(function (item) { return (item.id == id ? replacement : item); })), _a)));
};
/**
 * returns the requested entry from the state when found else undefined
 */
export var findInState = function (state, key, id) {
    return state[key].find(function (item) { return item.id == id; });
};
/**
 * return an object within an array by key and value
 */
export var findInArray = function (scope, value, key) {
    if (key === void 0) { key = 'id'; }
    return scope.find(function (Item) { return Item[key] == value; });
};
/**
 * returns a boolean whether an object is in an array
 */
export var someInArray = function (scope, value, key) {
    if (key === void 0) { key = 'id'; }
    return scope.some(function (Item) { return Item[key] == value; });
};
