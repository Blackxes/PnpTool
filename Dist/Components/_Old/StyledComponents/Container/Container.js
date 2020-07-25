/**
 * @File container component for dividing content
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import styled, { css } from 'styled-components';
import { ContainerMarginBottom, ContainerPadding, BackgroundColorDefault } from '../Variables';
var StyledContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    margin-bottom: ", ";\n    padding: ", ";\n\n    ", "\n"], ["\n    margin-bottom: ", ";\n    padding: ", ";\n\n    ",
    "\n"])), ContainerMarginBottom, ContainerPadding, function (props) {
    return props.box && css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            border: 1px solid ", ";\n        "], ["\n            border: 1px solid ", ";\n        "])), BackgroundColorDefault);
});
var Container = function (_a) {
    var props = __rest(_a, []);
    return React.createElement(StyledContainer, __assign({}, props));
};
export default Container;
var templateObject_1, templateObject_2;
