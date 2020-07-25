/**
 * @File listing of the attribute bases
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash as fasTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../Form/Buttons';
import { Form, Field } from 'react-final-form';
var AttributeBaseListing = function (_a) {
    var attributeBases = _a.attributeBases, _b = _a.silent, silent = _b === void 0 ? false : _b, _c = _a.onDelete, onDelete = _c === void 0 ? null : _c;
    if (!attributeBases || !attributeBases.length) {
        return !silent && React.createElement("p", null, "No Attributebases given");
    }
    var mapped = attributeBases.map(function (item) {
        return (React.createElement("li", { key: item.id, className: "attribute-base-item list-item flex flex-h flex-align" },
            React.createElement("p", { className: "col col-6" }, item.name),
            React.createElement("p", { className: "col col-6" }, item.defaultValue),
            onDelete && (React.createElement(Form, { onSubmit: onDelete, render: function (_a) {
                    var handleSubmit = _a.handleSubmit;
                    return (React.createElement(React.Fragment, null,
                        React.createElement("form", { onSubmit: handleSubmit },
                            React.createElement(Field, { name: "attributeId", component: "input", type: "hidden", defaultValue: item.id }),
                            React.createElement(Button, { type: "error" },
                                React.createElement(FontAwesomeIcon, { icon: fasTrash })))));
                } }))));
    });
    return React.createElement("ul", { className: "list list-v list-align" }, mapped);
};
export default AttributeBaseListing;
