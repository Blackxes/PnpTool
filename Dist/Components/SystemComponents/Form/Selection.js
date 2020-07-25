/**
 * @File form input field select
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import { generateId, joinStrings } from '../../../Logic/Source/Miscellaneous/functions';
var Selection = function (_a) {
    var items = _a.items, name = _a.name, onChange = _a.onChange, _b = _a.defaultValue, defaultValue = _b === void 0 ? '' : _b, _c = _a.type, type = _c === void 0 ? 'regular' : _c, _d = _a.nothingSelectedLabel, nothingSelectedLabel = _d === void 0 ? '- Select - ' : _d, _e = _a.renderOnNoItems, renderOnNoItems = _e === void 0 ? false : _e, props = __rest(_a, ["items", "name", "onChange", "defaultValue", "type", "nothingSelectedLabel", "renderOnNoItems"]);
    if (!renderOnNoItems && !items && !items.length) {
        return null;
    }
    // fallbacks to empty array because maybe you want to display the empty select
    // to make the user visible there are no items - or somethings broken
    var options = (items || []).map(function (sitem) { return (React.createElement("option", { key: sitem.id || generateId(), value: sitem === null || sitem === void 0 ? void 0 : sitem.value }, sitem === null || sitem === void 0 ? void 0 : sitem.label)); });
    if (nothingSelectedLabel) {
        options.unshift(React.createElement("option", { key: generateId, value: "" }, nothingSelectedLabel));
    }
    var classNames = joinStrings([
        props.className,
        'selection',
        [name, 'selection-' + name],
        [type, type, 'regular']
    ]);
    delete props.className;
    return (React.createElement("select", __assign({ name: name || 'unused-' + generateId(), value: defaultValue, className: classNames, onChange: onChange }, props), options));
};
export default Selection;
