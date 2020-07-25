/**
 * @File listing component which uses css flex to list components.. yeah..
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
import * as React from 'react';
import styled, { css } from 'styled-components';
var StyledFlexContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    ", "\n"], ["\n    display: flex;\n    ",
    "\n"])), function (props) {
    return props.vertical && css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            flex-direction: column;\n        "], ["\n            flex-direction: column;\n        "])));
});
var FlexContainer = function (props) {
    return React.createElement(StyledFlexContainer, __assign({}, props));
};
export default FlexContainer;
var templateObject_1, templateObject_2;
