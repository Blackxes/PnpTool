/**
 * @File menu part components to build a menu
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
 */
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { keyifyString, joinStrings } from "../../core/misc/functions";
/**
 * serves as a wrapper for menu items with the same group
 */
export var MenuGroup = function (_a) {
    var groupKey = _a.groupKey, children = _a.children;
    var classNames = joinStrings([
        "menu-group",
        [groupKey, "menu-group-" + keyifyString(groupKey, true)]
    ]);
    return React.createElement("div", { className: classNames }, children);
};
/**
 * wraps menu items together
 */
export var MenuItems = function (_a) {
    var children = _a.children;
    var classNames = joinStrings(["menu-items"]);
    return React.createElement("ul", { className: classNames }, children);
};
/**
 * actual menu item which builds the <NavLink /> for the menu
 */
export var MenuItem = function (_a) {
    var item = _a.item;
    var classNames = joinStrings([
        "menu-item",
        [item.key, "menu-item-" + keyifyString(item.key, true)]
    ]);
    var iconClassNames = joinStrings([[item.key, item.key + "-color"]]);
    return (React.createElement("li", { key: item.id, className: classNames },
        React.createElement(NavLink, { to: String(item.route), exact: item.exact },
            item.renderPrefixArrow ? null : (React.createElement(FontAwesomeIcon, { className: "menu-title-prefix", icon: faAngleDoubleRight })),
            item.icon ? (React.createElement(FontAwesomeIcon, { className: iconClassNames, fixedWidth: true, icon: item.icon })) : null,
            !item.renderTitle ? null : React.createElement("p", null, item.title))));
};
