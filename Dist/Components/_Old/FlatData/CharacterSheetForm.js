/**
 * @File generic form for the character sheet data
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from 'react';
import { Field } from 'react-final-form';
import { FormWrapper, FormTitle, FormFieldContainer, FormFieldHeader, FormFieldTitle, FormFieldWrapper } from '../Form/FormComponents';
import { SubmitButton } from '../Form/Buttons';
import { getLinkedAttribute, CreateShallowCharacterSheetAttribute } from '../../Logic/Source/FlatData/functions';
import { findInArray, joinStrings, someInArray } from '../../Logic/Source/Miscellaneous/functions';
import { faPlus as FasPlus, faMinus as FasMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/**
 * initial props
 */
var defaultProps = {
    onSubmit: function () { },
    submitLabel: 'Hinzufügen',
    characterSheetEntry: null,
    attributeBases: []
};
/**
 * header of the attribute list item
 * regardless of its state (added/preview)
 */
var AttributeListItemHeader = function (_a) {
    var Attribute = _a.Attribute;
    var name = Attribute.name, description = Attribute.description;
    return (React.createElement("div", { className: "list-item col col-4 flex flex-v" },
        React.createElement("p", { className: "attribute-title" }, name),
        React.createElement("p", { className: "attribute-description text-sub" }, description || 'Keine Beschreibung')));
};
/**
 * builds the name for an attribute field
 */
var BuildAttributeFormFieldName = function (id, key) {
    return 'attribute_' + id + '_' + key;
};
/**
 * attribute list item value component for when the attribute has been added to the sheet
 */
var CharacterSheetAttributeValue = function (_a) {
    var Attribute = _a.Attribute, OnChange = _a.OnChange;
    var baseId = Attribute.baseId, value = Attribute.value, defaultValue = Attribute.defaultValue;
    return (React.createElement(React.Fragment, null,
        React.createElement(Field, { name: BuildAttributeFormFieldName(baseId, 'value'), component: "input", defaultValue: value }, function (_a) {
            var input = _a.input;
            return (React.createElement("input", __assign({}, input, { className: "attribute-value list-item", placeholder: defaultValue, onChange: function (evt) {
                    return OnChange(Attribute.baseId, evt.target.value);
                } })));
        })));
};
/**
 * preview value component of an attribute which has not been added so far
 */
var PreviewAttributeListItemValue = function (_a) {
    var AttributeBase = _a.AttributeBase;
    var defaultValue = AttributeBase.defaultValue;
    return (React.createElement("p", { className: "attribute-default-value list-item col col-4 text-center text-super msg-error" }, defaultValue));
};
/**
 * general list item which either can represent a previewed attribute base
 * or an added attribute to the charactersheet therefore an charactersheet attribute
 */
var CharacterSheetAttributeListItem = function (_a) {
    var Base = _a.Base, SheetAttribute = _a.SheetAttribute, OnAdd = _a.OnAdd, OnRemove = _a.OnRemove, OnChange = _a.OnChange;
    var ButtonClassNames = joinStrings([
        'flex-end btn',
        [!SheetAttribute, 'btn-ok', 'btn-error']
    ]);
    return (React.createElement("div", { className: "attribute-item list-item flex flex-h flex-align flex-fill" },
        React.createElement(AttributeListItemHeader, { Attribute: Base }),
        !SheetAttribute ? (React.createElement(PreviewAttributeListItemValue, { AttributeBase: Base })) : (React.createElement(CharacterSheetAttributeValue, { Attribute: SheetAttribute, OnChange: OnChange })),
        React.createElement("div", { className: "list-item col col-4" },
            React.createElement("div", { className: ButtonClassNames, onClick: !SheetAttribute
                    ? function () {
                        OnAdd(Base.id);
                    }
                    : function () { return OnRemove(SheetAttribute.baseId); } }, !SheetAttribute ? (React.createElement(FontAwesomeIcon, { className: "msg-ok", icon: FasPlus })) : (React.createElement(FontAwesomeIcon, { className: "msg-error", icon: FasMinus }))))));
};
/**
 * character sheet form component
 * serves as an creation and update component for character sheets
 */
var CharacterSheetForm = /** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1(props) {
        var _this = _super.call(this, props) || this;
        /**
         * adds an attribute base to this sheets attribute
         */
        _this.AddAttribute = function (baseId) {
            var Attribute = someInArray(_this.state.Attributes, baseId, 'baseId');
            if (!baseId || Attribute)
                return true;
            var base = getLinkedAttribute(baseId, _this.props.attributeBases);
            if (!base)
                return true;
            var SheetAttribute = CreateShallowCharacterSheetAttribute(base.id, base.defaultValue);
            _this.setState({
                Attributes: __spreadArrays(_this.state.Attributes, [SheetAttribute])
            });
            return true;
        };
        /**
         * adds every attribute base to this sheet
         */
        _this.AddAllAttributes = function () {
            // filter bases which are already included
            // and no.. its not a, b, c item.. its b-aseitem and a-ttributeitem
            var free = _this.props.attributeBases.filter(function (bitem) {
                return !_this.state.Attributes.some(function (aitem) { return aitem.baseId == bitem.id; });
            });
            console.log(free);
            // build shallow instances
            var shallows = free.map(function (fitem) {
                return CreateShallowCharacterSheetAttribute(fitem.id, fitem.defaultValue);
            });
            console.log(shallows);
            // insert into state
            _this.setState({
                Attributes: __spreadArrays(_this.state.Attributes, shallows)
            });
            return true;
        };
        /**
         * removes an attribute from this character sheet
         */
        _this.RemoveAttribute = function (ABaseId) {
            _this.setState({
                Attributes: __spreadArrays(_this.state.Attributes.filter(function (AItem) { return AItem.baseId != ABaseId; }))
            });
            return true;
        };
        /**
         * updates the value of an attribute in this sheet
         */
        _this.SetAttributeValue = function (baseId, value) {
            _this.setState({
                Attributes: __spreadArrays(_this.state.Attributes.map(function (aitem) {
                    return aitem.baseId != baseId ? aitem : __assign(__assign({}, aitem), { value: value });
                }))
            });
        };
        /**
         * returns an attribute by the baseId
         */
        _this.GetAttribute = function (baseId) {
            return _this.state.Attributes.find(function (aitem) { return aitem.baseId == baseId; });
        };
        /**
         * returns the attribute base
         */
        _this.GetAttributeBase = function (BaseId) {
            return findInArray(_this.props.attributeBases, BaseId);
        };
        /**
         * returns a concatenated string of added attributes ids
         */
        _this.GetAttributesBaseIdsString = function () {
            return _this.state.Attributes.map(function (aitem) { return aitem.baseId; }).join(',');
        };
        /**
         * checks whether given id refers to an attribute added to this sheet
         */
        _this.IsAdded = function (BaseId) {
            return _this.state.Attributes.some(function (AItem) { return (AItem === null || AItem === void 0 ? void 0 : AItem.baseId) == BaseId; });
        };
        /**
         * resets the attributes state
         */
        _this.ResetAttributes = function () {
            _this.setState({
                Attributes: []
            });
            return true;
        };
        _this.state = {
            Attributes: []
        };
        return _this;
    }
    /**
     * renders this component
     */
    class_1.prototype.render = function () {
        var _this = this;
        var _a = this.props, onSubmit = _a.onSubmit, submitLabel = _a.submitLabel;
        return (React.createElement(React.Fragment, null,
            React.createElement(FormWrapper, { formKey: "character-sheet", onSubmit: function (values) {
                    onSubmit(values);
                    _this.ResetAttributes();
                }, render: function () { return (React.createElement(React.Fragment, null,
                    React.createElement(FormTitle, { title: "Charactersheet Eintr\u00E4ge" }),
                    React.createElement(FormFieldContainer, { horizontal: true },
                        React.createElement(FormFieldHeader, null,
                            React.createElement(FormFieldTitle, { title: "Name" })),
                        React.createElement(FormFieldWrapper, null,
                            React.createElement(Field, { name: "name", component: "input" }, function (_a) {
                                var input = _a.input;
                                return (React.createElement("input", __assign({}, input, { placeholder: "Name", required: true })));
                            }))),
                    React.createElement(FormFieldContainer, { fieldKey: "attributes" },
                        React.createElement("div", { className: "flex flex-h flex-align" },
                            React.createElement(FormFieldHeader, { className: "list-item col col-12" },
                                React.createElement(FormFieldTitle, { title: "Attribute" })),
                            React.createElement("div", { type: "info", className: "list-item btn btn-info flex-end text-nowrap", onClick: _this.AddAllAttributes }, "Alle Attribute hinzuf\u00FCgen")),
                        React.createElement(FormFieldWrapper, { className: "attributes list-item flex flex-v flex-item-box" }, _this.props.attributeBases.map(function (aitem) { return (React.createElement(CharacterSheetAttributeListItem, { key: aitem.name, Base: aitem, SheetAttribute: _this.GetAttribute(aitem.id), OnAdd: _this.AddAttribute, OnRemove: _this.RemoveAttribute, OnChange: _this.SetAttributeValue })); }))),
                    React.createElement(Field, { name: "attribute_ids", component: "input", type: "hidden", defaultValue: _this.GetAttributesBaseIdsString() }),
                    React.createElement(SubmitButton, null, submitLabel))); } }),
            React.createElement("pre", null, JSON.stringify(this.state, null, 2))));
    };
    return class_1;
}(React.Component));
CharacterSheetForm.defaultProps = defaultProps;
export default CharacterSheetForm;
