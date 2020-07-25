/**
 * @File general listing of character sheets
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
import * as React from 'react';
import { joinStrings } from '../../Logic/Source/Miscellaneous/functions';
var CharacterSheetsListing = function (_a) {
    var sheets = _a.sheets;
    if (!sheets) {
        return (React.createElement("p", { className: "text-info msg-info" }, "Keine Charactersheets gefunden"));
    }
    var listing = sheets.map(function (sheet) {
        var id = sheet.id, name = sheet.name, attributes = sheet.attributes;
        var classNames = joinStrings(['list-item']);
        return (React.createElement("li", { key: id, className: classNames },
            React.createElement("p", null, name)));
    });
    return React.createElement("ul", { className: "list list-v" }, listing);
};
export default CharacterSheetsListing;
