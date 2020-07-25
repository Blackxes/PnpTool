/**
 * @File functions for FlatData
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
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
import { AttributeBase, CharacterSheetAttribute, AttributeSet, CharacterSheet, ShallowCharacterSheetAttribute, LinkedEquationUnit } from './models';
import { processCallbacks, findInArray, joinStrings } from '../Miscellaneous/functions';
/**
 * creation functions
 */
export var createAttributeBase = function (name, defaultValue) {
    return new AttributeBase(name, defaultValue);
};
export var createAttributeSet = function (name, description, attributes) {
    return new AttributeSet(name, description, attributes);
};
export var createCharacterSheetAttribute = function (baseId, value) {
    return new CharacterSheetAttribute(baseId, value);
};
export var createCharacterSheet = function (name, attributes) {
    return new CharacterSheet(name, attributes);
};
// const createEquationSymbol = (type, name, value) =>
//     new EquationSymbol(type, name, value);
// const createForm = (name, items) => new Form(name, items);
// const createFormItem = (type, value) => new FormItem(type, value);
// const createFormItemValue = (contextId) => new FormItemValue(contextId);
// const createFormSheetOptions = (formId, sheetId, IgnoredAttributes) => new FormSheetOptions(formId, sheetId, IgnoredAttributes);
// const createIgnoredAttribute = (baseId, defaultValue) => new IgnoredAttribute(baseId, defaultValue);
/**
 * creation functions from submitted forms
 */
export var createAttributeBaseFromSubmission = function (values) {
    return createAttributeBase(values.name, values.defaultValue);
};
// const createEquationSymbolFromSubmission = (type, name, value) =>
//     new EquationSymbol(type, name, value);
// const createFormFromSubmission = (name, items) => new Form(name, items);
// const createFormItemFromSubmission = (type, value) => new FormItem(type, value);
// const createFormItemValueFromSubmission = (contextId) => new FormItemValue(contextId);
// const createFormSheetOptionsFromSubmission = (formId, sheetId, IgnoredAttributes) => new FormSheetOptions(formId, sheetId, IgnoredAttributes);
/**
 * shallow creation functions
 * these instance have no id and are invalid on their own
 * they are only used to be value container and overwrite existing instances
 */
export var CreateShallowCharacterSheetAttribute = function (BaseId, Value) {
    return new ShallowCharacterSheetAttribute(BaseId, Value);
};
export var CreateShallowCharacterSheet = function (values) {
    var Sheet = CreateCharacterSheet(values.name, values.attributes);
    delete Sheet.id;
    return Sheet;
};
/**
 * value getter from submission
 */
export var getAttributeIdFromSubmission = function (values) { return values.attributeId; };
/**
 * linker
 */
export var getLinkedAttribute = function (id, attrs) {
    return attrs.find(function (aitem) { return aitem.id == id; });
};
export var getLinkedAttributes = function (ids, attrs) {
    return Array.from(ids || 0).map(function (id) { return attrs.find(function (aitem) { return aitem.id == id; }); });
};
export var getLinkedSet = function (id, sets) {
    return sets && sets.find(function (sitem) { return sitem.id == id; });
};
/**
 * links an equation unit to its type as well as linking every id in the instanse
 * 	behind the contextId to the referenced values
 * 	- eg. the attributes array of the sheet object - these ids 	will get linked
 * 	to the base attribute - obviously getting overwritten with the user configuration
 */
export var getlinkedEquationUnit = function (equationUnitConfiguration, sheetEntity, attributeBases) {
    // component and sheet is necessary since they contain the information needed
    // to link the components to their associated values
    if (equationUnitConfiguration === undefined || sheetEntity === undefined) {
        return false;
    }
    // default defined information container
    var initialEquationUnit = function (state) {
        var initialLinkedUnit = new LinkedEquationUnit();
        var overwrites = __assign({}, equationUnitConfiguration
        // config: {
        //     contextId: equationUnitConfiguration.config.contextId,
        //     equationUnitId:
        // },
        // type: equationUnitConfiguration.type
        );
        overwrites.config.equationUnitId = equationUnitConfiguration.id;
        return {
            linkedEquationUnit: __assign(__assign({}, initialLinkedUnit), overwrites)
        };
    };
    // defining component / based on type
    // initial equation unit which is built when creating a new unit
    var onNone = function (state) {
        if (state.linkedEquationUnit.type != 'none')
            return true;
        throw {
            linkedEquationUnit: __assign(__assign({}, state.linkedEquationUnit), { linked: null, isNew: true })
        };
    };
    var onAttribute = function (state) {
        var _a, _b;
        var linkedEquationUnit = state.linkedEquationUnit;
        if (linkedEquationUnit.type != 'attribute')
            return true;
        var attribute = findInArray(sheetEntity.attributes, (_a = linkedEquationUnit.config) === null || _a === void 0 ? void 0 : _a.contextId, 'baseId');
        var base = findInArray(attributeBases, (_b = linkedEquationUnit.config) === null || _b === void 0 ? void 0 : _b.contextId);
        if (base === undefined) {
            throw {
                linkedEquationUnit: __assign(__assign({}, linkedEquationUnit), { errors: linkedEquationUnit.isNew
                        ? ''
                        : 'Basisattribut nicht gefunden' })
            };
        }
        var linked = __assign(__assign(__assign({}, base), attribute), { isFallback: attribute === undefined });
        // the id is not necessary in this context because the attribute is associated by its baseId
        delete linked.id;
        var missingAttributeError = joinStrings([
            'Für das Attribute',
            [base === null || base === void 0 ? void 0 : base.name, base.name, '"Unbenannt"'],
            'wird die Basis verwendet.'
        ]);
        var errors = attribute == undefined ? missingAttributeError : null;
        throw {
            linkedEquationUnit: __assign(__assign({}, state.linkedEquationUnit), { linked: linked,
                errors: errors })
        };
    };
    var onSymbol = function (state) {
        console.log('implement component parsing for "symbol"');
        throw state;
    };
    var onConstant = function (state) {
        console.log('implement component parsing for "constant"');
        throw state;
    };
    var onEquation = function (state) {
        console.log('implement component parsing for "equation"');
        throw state;
    };
    // in here are only the values which are necessary to proceed without errors
    var initialState = {
        linkedEquationUnit: null
    };
    var result = processCallbacks(initialState, [
        initialEquationUnit,
        onNone,
        onAttribute,
        onSymbol,
        onConstant,
        onEquation
    ]);
    return result;
};
/**
 * differ
 */
export var getAttributesIntersection = function (attrIdsA, attrIdsB) {
    var _a = attrsIdsA.length < attrsIdsB.length
        ? [attrsIdsA, attrsIdsB]
        : [attrsIdsB, attrsIdsA], shortest = _a[0], longest = _a[1];
    return Array.from(shortest).filter(function (id) { return longest.find(id); });
};
