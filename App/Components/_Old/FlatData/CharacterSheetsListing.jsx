/**
 * @File general listing of character sheets
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import { joinStrings } from '../../Logic/Miscellaneous/Functions';

const CharacterSheetsListing = ({ sheets }) => {
    if (!sheets) {
        return (
            <p className="text-info msg-info">Keine Charactersheets gefunden</p>
        );
    }

    const listing = sheets.map((sheet) => {
        const { id, name, attributes } = sheet;
        const classNames = joinStrings(['list-item']);

        return (
            <li key={id} className={classNames}>
                <p>{name}</p>
            </li>
        );
    });

    return <ul className="list list-v">{listing}</ul>;
};

export default CharacterSheetsListing;
