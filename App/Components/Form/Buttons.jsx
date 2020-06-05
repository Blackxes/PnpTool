/**
 * @File contains button designs
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
 */

import React from "react";
import { joinStrings } from "../../core/misc/functions";

/**
 * main button component
 * uses other button components in this file to build the button
 */
export const Button = ({ type, small, className, children, ...rest }) => {
  // default button
  const classNames = joinStrings([
    "btn",
    [type, "btn-" + type],
    [small, "btn-small"],
    className
  ]);

  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
};

/**
 * builds an ok button
 * uses the <Button /> Component in this file
 */
export const OkButton = ({ small, className, children, ...rest }) => {
  return Button({ type: "ok", small, className, children, ...rest });
};

/**
 * builds an info button
 * uses the <Button /> Component in this file
 */
export const InfoButton = ({ small, className, children, ...rest }) => {
  return Button({ type: "info", small, className, children, ...rest });
};

/**
 * builds a error button
 * uses the <Button /> Component in this file
 */
export const ErrorButton = ({ small, className, children, ...rest }) => {
  return Button({ type: "error", small, className, children, ...rest });
};

/**
 * builds an warning button
 * uses the <Button /> Component in this file
 */
export const WarningButton = ({ small, className, children, ...rest }) => {
  return Button({ type: "warning", small, className, children, ...rest });
};
