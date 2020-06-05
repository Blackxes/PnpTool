/**
 * @File component to create a simple form
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
 */

import React from "react";
import { Field } from "react-final-form";
import { joinStrings } from "../../core/misc/functions";
import _ from "underscore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopCircle } from "@fortawesome/free-solid-svg-icons";

/**
 * inline form wrapper to take some regular/default operations away
 */
export const InlineFormWrapper = ({
  onSubmit,
  form,
  className,
  children,
  resetForm = true,
  resetState = true,
  preventDefault = true,
  ...rest
}) => {
  const classNames = joinStrings(["form container", className]);

  return (
    <form
      className={classNames}
      onSubmit={evt => {
        if (preventDefault) evt.preventDefault();

        onSubmit(evt);

        if (resetForm) form.reset();

        if (resetState)
          form
            .getRegisteredFields()
            .forEach(name => form.resetFieldState(name));
      }}
      {...rest}
    >
      {children}
    </form>
  );
};

/**
 * wrapper for a form input field
 */
export const FormFieldContainer = ({
  fieldKey,
  horizontal,
  className,
  children,
  ...rest
}) => {
  const classNames = joinStrings([
    "form-field",
    [fieldKey, "form-field-" + fieldKey],
    "flex",
    [horizontal, "flex-h flex-align", "flex-v"],
    className
  ]);
  const restProps = _.isEmpty(rest) ? [] : rest;

  return (
    <div className={classNames} {...restProps}>
      {children}
    </div>
  );
};

/**
 * wrapper for fields which need their own width
 */
export const FormFieldWrapper = ({ className, children, ...rest }) => {
  const classNames = joinStrings(["form-field-wrapper", className]);
  const restProps = _.isEmpty(rest) ? [] : rest;

  return (
    <div className={classNames} {...restProps}>
      {children}
    </div>
  );
};

/**
 * contains form field meta information
 */
export const FormFieldHeader = ({ className, children, ...rest }) => {
  const classNames = joinStrings(["form-field-header", className]);
  const restProps = _.isEmpty(rest) ? [] : rest;

  return (
    <div className={classNames} {...restProps}>
      {children}
    </div>
  );
};

/**
 * title field for a form field
 */
export const FormFieldTitle = ({ title, className, children, ...rest }) => {
  const classNames = joinStrings(["form-field-title"], className);
  const restProps = _.isEmpty(rest) ? [] : rest;

  return (
    <div className={classNames} {...restProps}>
      {children != undefined ? children : <label>{title}</label>}
    </div>
  );
};

/**
 * description field for a form field
 */
export const FormFieldDescription = ({
  description,
  className,
  children,
  ...rest
}) => {
  const classNames = joinStrings(["form-field-description", className]);
  const restProps = _.isEmpty(rest) ? [] : rest;

  return (
    <div className={classNames} {...restProps}>
      {children != undefined ? children : description}
    </div>
  );
};

/**
 * error messages within the form field header
 */
export const FormFieldDescriptionErrorMessage = ({
  formStateMeta,
  type = "error"
}) => {
  if (!formStateMeta || formStateMeta.constructor !== Object) return null;

  const classNames = joinStrings([[type, "msg-" + type, "msg-error"]]);

  const Component =
    meta.touched && meta.error ? (
      <FormFieldDescription>
        <p className={classNames}>{formStateMeta.error}</p>
      </FormFieldDescription>
    ) : null;

  return Component;
};

/**
 * checkbox form field
 */
export const FieldCheckbox = ({ className, ...rest }) => {
  const classNames = joinStrings([
    "form-field",
    "form-field-checkbox",
    className
  ]);

  return (
    <label className={classNames}>
      <input type="checkbox" {...rest} />
      <span className="field-checkbox-marker">
        <FontAwesomeIcon icon={faStopCircle} />
      </span>
    </label>
  );
};
