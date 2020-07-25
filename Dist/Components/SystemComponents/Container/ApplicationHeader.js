/**
 * @File main header of the app
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import styled from 'styled-components';
import AppTitle from '../AppTitle';
// import MainMenu from '../../AppComponents/MainMenu';
var StyledApplicationHeader = styled.header(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    padding-top: 30px;\n    border-top: 5px solid #fdcb6e;\n"], ["\n    padding-top: 30px;\n    border-top: 5px solid #fdcb6e;\n"])));
// component
var ApplicationHeader = function (_a) {
    var title = _a.title;
    return (React.createElement(StyledApplicationHeader, null,
        React.createElement(AppTitle, { title: "Daaaaaamnn" })));
};
export default ApplicationHeader;
var templateObject_1;
