/**
 * @File component to create a simple form
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
 */

import React from 'react';
import { Form } from 'react-final-form';
import { Button } from './Buttons';
import { joinStrings } from '../../Logic/Source/Miscellaneous/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * form wrapper for a react final form Form
 */
export const FormWrapper = ({
    onSubmit,
    render,
    InnerFormProps,
    resetForm = true,
    resetState = true,
    formKey = '',
    ...rest
}) => {
    const classNames = joinStrings([
        'form container',
        rest.className,
        [formKey, 'form-' + formKey]
    ]);

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, ...renderProps }) => (
                <form
                    className={classNames}
                    onSubmit={(evt) => {
                        handleSubmit(evt);

                        if (resetForm) form.reset();

                        if (resetState) {
                            form.getRegisteredFields().forEach((name) =>
                                form.resetFieldState(name)
                            );
                        }
                    }}
                    {...InnerFormProps}
                >
                    {render({ form, ...renderProps })}
                </form>
            )}
            {...rest}
        />
    );
};

/**
 * title of a form / form field title are the inner ones. This is the one leading the whole form
 */
export const FormTitle = ({ title, ...rest }) => {
    if (!title) {
        return null;
    }

    const classNames = joinStrings(['form-title', rest.className]);

    return <p className={classNames}>{title}</p>;
};

/**
 * wrapper for a form input field
 */
export const FormFieldContainer = ({ fieldKey, horizontal, ...rest }) => {
    const classNames = joinStrings([
        'form-field',
        [fieldKey, 'form-field-' + fieldKey],
        'flex',
        [horizontal, 'flex-h flex-align', 'flex-v'],
        rest.className
    ]);
    const restProps = !Object.keys(rest).length ? [] : rest;

    return (
        <div className={classNames} {...restProps}>
            {rest.children}
        </div>
    );
};

/**
 * wrapper for fields which need their own width
 */
export const FormFieldWrapper = ({ ...rest }) => {
    const classNames = joinStrings(['form-field-wrapper', rest.className]);
    const restProps = !Object.keys(rest).length ? [] : rest;

    return (
        <div className={classNames} {...restProps}>
            {rest.children}
        </div>
    );
};

/**
 * contains form field meta information
 */
export const FormFieldHeader = ({ ...rest }) => {
    const className = rest.className;
    const children = rest.children;
    delete rest.className;
    delete rest.children;
    const classNames = joinStrings(['form-field-header', className]);
    const restProps = !Object.keys(rest).length ? [] : rest;

    return (
        <div className={classNames} {...restProps}>
            {children}
        </div>
    );
};

/**
 * title field for a form field
 */
export const FormFieldTitle = ({ title, ...rest }) => {
    const classNames = joinStrings(['form-field-title'], rest.className);
    const restProps = !Object.keys(rest).length ? [] : rest;

    return (
        <div className={classNames} {...restProps}>
            {rest.children != undefined ? (
                rest.children
            ) : (
                <label>{title}</label>
            )}
        </div>
    );
};

/**
 * description field for a form field
 */
export const FormFieldDescription = ({ description, ...rest }) => {
    const classNames = joinStrings(['form-field-description', rest.className]);
    const children = rest.children;
    const restProps = !Object.keys(rest).length ? [] : rest;

    delete rest.className;
    delete rest.children;

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
    type = 'error'
}) => {
    if (!formStateMeta || formStateMeta.constructor !== Object) return null;

    const classNames = joinStrings([[type, 'msg-' + type, 'msg-error']]);

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
export const FieldCheckbox = ({ ...rest }) => {
    const classNames = joinStrings([
        'form-field',
        'form-field-checkbox',
        rest.className
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

/**
 * form action configuration
 * defines the way a button within a form has to be
 * and can be used to have an array of form actions
 * to make generic forms
 */
export const FormAction = ({
    label,
    type,
    action,
    context = 'default',
    submitType = 'default',
    ...rest
}) => {
    return (
        <Button
            type={type}
            onClick={(evt) => action(evt, context, submitType)}
            {...rest}
        >
            {label}
        </Button>
    );
};

/**
 * creates an action list
 */
export const FormActionList = ({
    actions,
    horizontal = true,
    positionRight = true
}) => {
    if (!actions || !actions.length) return null;

    const classNames = joinStrings([
        'actions flex',
        [horizontal, 'flex-h', 'flex-v'],
        [positionRight, 'flex-end']
    ]);

    return (
        <div className={classNames}>
            {actions.map(
                ({ label, type, submitType, action, context, ...rest }) => {
                    return (
                        <Button
                            key={label}
                            type={type}
                            onClick={(evt) => action(evt, context, submitType)}
                            {...rest}
                        >
                            {label}
                        </Button>
                    );
                }
            )}
        </div>
    );
};
