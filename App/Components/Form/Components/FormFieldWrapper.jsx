/**
 * @File actual form field input wrapper
 * 	wrapper for the value input
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import { joinStrings } from '../../../Logic/Source/Miscellaneous/functions';

const FormFieldWrapper = ({ ...rest }) => {
    const classNames = joinStrings(['form-field-wrapper', rest.className]);
    const restProps = !Object.keys(rest).length ? [] : rest;

    return (
        <div className={classNames} {...restProps}>
            {rest.children}
        </div>
    );
};

export default FormFieldWrapper;
