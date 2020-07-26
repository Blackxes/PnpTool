/**
 * @File text building components for dynamic .. text .. building, .. yeah
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import { joinStrings } from '../../Logic/Miscellaneous/Functions';

/**
 * takes an array of values and build a p tag Component
 *
 * @param {array} xy array of values
 * 	string: simple text
 * 	array: text will be wrapped into a span
 * 		index: 0 - type of message (ok, error, ..)
 * 		index: 1 - text which will be wrapped
 *
 * @return joined p component (with their configured spans)
 */
export const Message = ({ texts }) => {
    const parsed = texts.map((text) =>
        typeof text != 'object' ? (
            text
        ) : (
            <span className={'msg-' + text[0]}>{text[1]}</span>
        )
    );

    return <p>{parsed}</p>;
};
