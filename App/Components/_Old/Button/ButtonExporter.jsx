/**
 * @File contains button designs
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
 */

import React from 'react';
import { NavLink } from 'react-router-dom';

import { joinStrings } from '../../Logic/Source/Miscellaneous/functions';

/**
 * builds an ok button
 * uses the <Button /> Component in this file
 */
export const OkButton = ({ small, className, ...rest }) => {
    return Button({ type: 'ok', small, className, ...rest });
};

/**
 * builds a error button
 * uses the <Button /> Component in this file
 */
export const ErrorButton = ({ small, className, ...rest }) => {
    return Button({ type: 'error', small, className, ...rest });
};

/**
 * builds an warning button
 * uses the <Button /> Component in this file
 */
export const WarningButton = ({ small, className, ...rest }) => {
    return Button({ type: 'warning', small, className, ...rest });
};

/**
 * builds an info button
 * uses the <Button /> Component in this file
 */
export const InfoButton = ({ small, className, ...rest }) => {
    return Button({ type: 'info', small, className, ...rest });
};

/**
 * builds a submit button
 * uses the <Button /> Component in this file
 */
export const SubmitButton = ({ small, type, ...rest }) => {
    return Button({ type: 'submit', small, ...rest });
};

/**
 * creates an a tag link in button style
 */
export const Link = ({ to, label, small, className, ...rest }) => {
    const classNames = joinStrings([
        'btn',
        [rest.type, 'btn-' + rest.type],
        [small, 'btn-small'],
        className
    ]);

    return (
        <NavLink to={to} className={classNames} {...rest}>
            {label}
        </NavLink>
    );
};

/**
 * builds an ok link
 * uses the <Link /> component in this file
 */
export const OkLink = ({ to, label, small, className, ...rest }) => {
    return Link({ to, label, small, className, ...rest, type: 'ok' });
};

/**
 * builds an error link
 * uses the <Link /> component in this file
 */
export const ErrorLink = ({ to, label, small, className, ...rest }) => {
    return Link({
        to,
        label,
        small,
        className,
        ...rest,
        type: 'error'
    });
};

/**
 * builds an warning link
 * uses the <Link /> component in this file
 */
export const WarningLink = ({ to, label, small, className, ...rest }) => {
    return Link({
        to,
        label,
        small,
        className,
        ...rest,
        type: 'warning'
    });
};

/**
 * builds an info link
 * uses the <Link /> component in this file
 */
export const InfoLink = ({ to, label, small, className, ...rest }) => {
    return Link({
        to,
        label,
        small,
        className,
        ...rest,
        type: 'info'
    });
};
