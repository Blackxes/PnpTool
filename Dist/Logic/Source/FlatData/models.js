/**
 * @File class models
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
import { generateId } from '../Miscellaneous/functions';
/**
 * base attribute from which the subclasses of attributes inherit
 */
var AttributeBase = /** @class */ (function () {
    function AttributeBase(id, name, defaultValue, description) {
        if (defaultValue === void 0) { defaultValue = null; }
        if (description === void 0) { description = ''; }
        this.id = id;
        this.name = name;
        this.description = description;
        this.defaultValue = defaultValue;
    }
    return AttributeBase;
}());
export { AttributeBase };
/**
 * attribute which has the actual value
 */
var CharacterSheetAttribute = /** @class */ (function () {
    function CharacterSheetAttribute(baseId, value) {
        if (value === void 0) { value = null; }
        this.baseId = baseId;
        this.value = value;
    }
    return CharacterSheetAttribute;
}());
export { CharacterSheetAttribute };
/**
 * basically a regular value but this one describes what type this value is
 */
var ContextValue = /** @class */ (function () {
    function ContextValue(type, value) {
        this.type = type;
        this.value = value;
    }
    return ContextValue;
}());
export { ContextValue };
/**
 * character sheet attribute container / invalid on its own without id
 * Todo: possibly redundant model
 */
var ShallowCharacterSheetAttribute = /** @class */ (function (_super) {
    __extends(ShallowCharacterSheetAttribute, _super);
    function ShallowCharacterSheetAttribute(baseId, value, source) {
        if (source === void 0) { source = null; }
        var _this = _super.call(this) || this;
        _this.baseId = baseId;
        _this.value = value;
        _this.source = source;
        return _this;
    }
    return ShallowCharacterSheetAttribute;
}(CharacterSheetAttribute));
export { ShallowCharacterSheetAttribute };
var AttributeSet = /** @class */ (function () {
    function AttributeSet(name, attributes) {
        this.id = generateId();
        this.name = name;
        this.attributes = attributes;
    }
    return AttributeSet;
}());
export { AttributeSet };
var EquationSymbol = /** @class */ (function () {
    function EquationSymbol(type, name, value) {
        this.id = generateId();
        this.type = type;
        this.name = name;
        this.value = value;
    }
    return EquationSymbol;
}());
export { EquationSymbol };
var CharacterSheet = /** @class */ (function () {
    function CharacterSheet(name, attributes) {
        if (attributes === void 0) { attributes = []; }
        this.id = generateId();
        this.name = name;
        this.attributes = attributes;
    }
    return CharacterSheet;
}());
export { CharacterSheet };
var Equation = /** @class */ (function () {
    function Equation(name, items) {
        if (items === void 0) { items = []; }
        this.id = generateId();
        this.name = name;
        this.items = items;
    }
    return Equation;
}());
export { Equation };
/**
 * @param {string} type form item type
 * @param {FormItemConfig} config contains information about the form item and its value
 */
var EquationUnit = /** @class */ (function () {
    function EquationUnit(type, config) {
        this.id = generateId();
        this.type = type;
        this.config = config;
    }
    return EquationUnit;
}());
export { EquationUnit };
var ShallowFormItem = /** @class */ (function (_super) {
    __extends(ShallowFormItem, _super);
    function ShallowFormItem(type, config) {
        var _this = this;
        _this.type = type;
        _this.config = config;
        return _this;
    }
    return ShallowFormItem;
}(EquationUnit));
export { ShallowFormItem };
/**
 * @param {string} contextId the id of the instance of the type which is currently the context
 * 	eg. type: attribute - the contextId is the id of an attribute
 */
var EquationUnitConfig = /** @class */ (function () {
    function EquationUnitConfig(contextId) {
        this.contextId = contextId;
    }
    return EquationUnitConfig;
}());
export { EquationUnitConfig };
/**
 * information container for the equation parsing
 */
var LinkedEquationUnit = /** @class */ (function () {
    function LinkedEquationUnit() {
        this.config = {};
        this.linked = null;
        this.type = null;
        this.valid = true;
        this.errors = [];
        this.isNew = false; // initially on unit is new except you specifically tell it to be new
    }
    return LinkedEquationUnit;
}());
export { LinkedEquationUnit };
/**
 * @param {string} key formId and sheetId as "formId_sheetId"
 * @param {array} ignoredAttributes ids of AttributeBases
 */
var EquationSheetOptions = /** @class */ (function () {
    function EquationSheetOptions(formId, sheetId, ignoredAttributes) {
        if (ignoredAttributes === void 0) { ignoredAttributes = []; }
        this.id = generateId();
        this.key = formId + '_' + sheetId;
        this.ignoredAttributes = ignoredAttributes;
    }
    return EquationSheetOptions;
}());
export { EquationSheetOptions };
/**
 * attribute instance used in FormSheetOptions.ignoredAttributes
 *
 * @param {string} baseId the attribute base id this instance associates to
 * @param {any} defaultValue the value used to avoid unwanted equation results such multiplying with 0
 */
var IgnoredAttribute = /** @class */ (function () {
    function IgnoredAttribute(baseId, defaultValue) {
        this.id = generateId();
        this.baseId = baseId;
        this.defaultValue = defaultValue;
    }
    return IgnoredAttribute;
}());
export { IgnoredAttribute };
