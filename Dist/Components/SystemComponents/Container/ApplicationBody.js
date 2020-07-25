/**
 * @File the area where the main content of the app lies
 * 	this includes everything!
 *
 * 	there is another Component called ApplicationContent
 * 	this component takes care of content only
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
import SideMenu from '../../AppComponents/SideMenu';
import FlexContainer from './FlexContainer';
var StyledApplicationBody = styled.main(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n"], ["\n    display: flex;\n"])));
var ApplicationBody = function () {
    // const contentProps = {
    //     id: '',
    //     key: '',
    //     route: '',
    //     component: [],
    //     title: ''
    // };
    // const middlewares = ContentMiddleware;
    return (React.createElement(StyledApplicationBody, null,
        React.createElement(SideMenu, null),
        React.createElement(FlexContainer, { vertical: true })));
};
export default ApplicationBody;
var templateObject_1;
