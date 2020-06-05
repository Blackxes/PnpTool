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
export const MenuGroup = ({ groupKey, children }) => {
  const classNames = joinStrings([
    "menu-group",
    [groupKey, "menu-group-" + keyifyString(groupKey, true)]
  ]);

  return <div className={classNames}>{children}</div>;
};

/**
 * wraps menu items together
 */
export const MenuItems = ({ children }) => {
  const classNames = joinStrings(["menu-items"]);

  return <ul className={classNames}>{children}</ul>;
};

/**
 * actual menu item which builds the <NavLink /> for the menu
 */
export const MenuItem = ({ item }) => {
  const classNames = joinStrings([
    "menu-item",
    [item.key, "menu-item-" + keyifyString(item.key, true)]
  ]);

  const iconClassNames = joinStrings([[item.key, item.key + "-color"]]);

  return (
    <li key={item.id} className={classNames}>
      <NavLink to={String(item.route)} exact={item.exact}>
        {item.renderPrefixArrow ? null : (
          <FontAwesomeIcon
            className="menu-title-prefix"
            icon={faAngleDoubleRight}
          />
        )}
        {item.icon ? (
          <FontAwesomeIcon
            className={iconClassNames}
            fixedWidth
            icon={item.icon}
          />
        ) : null}
        {!item.renderTitle ? null : <p>{item.title}</p>}
      </NavLink>
    </li>
  );
};
