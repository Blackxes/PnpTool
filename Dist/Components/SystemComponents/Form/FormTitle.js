/**
 * @File well.. a form title wrapper
 * 	to be honest i couldnt think of a better description
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
 */
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
import { joinStrings } from '../../../Logic/Source/Miscellaneous/functions';
var FormTitle = function (_a) {
    var title = _a.title, rest = __rest(_a, ["title"]);
    if (!title) {
        return null;
    }
    var classNames = joinStrings(['form-title', rest.className]);
    return React.createElement("p", { className: classNames }, title);
};
export default FormTitle;
