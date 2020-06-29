/**
 * @File class models
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import { generateId } from '../Miscellaneous/functions';

export class AttributeBase {
    constructor(name, defaultValue = null, description = '') {
        this.id = generateId();
        this.name = name;
        this.description = description;
        this.defaultValue = defaultValue;
    }
}

export class CharacterSheetAttribute {
    constructor(baseId, value = null) {
        this.baseId = baseId;
        this.value = value;
    }
}

/**
 * character sheet attribute container / invalid on its own without id
 * Todo: possibly redundant model
 */
export class ShallowCharacterSheetAttribute extends CharacterSheetAttribute {
    constructor(baseId, value, source = null) {
        super();
        this.baseId = baseId;
        this.value = value;
        this.source = source;
    }
}

export class AttributeSet {
    constructor(name, attributes) {
        this.id = generateId();
        this.name = name;
        this.attributes = attributes;
    }
}

export class EquationSymbol {
    constructor(type, name, value) {
        this.id = generateId();
        this.type = type;
        this.name = name;
        this.value = value;
    }
}

export class CharacterSheet {
    constructor(name, attributes = []) {
        this.id = generateId();
        this.name = name;
        this.attributes = attributes;
    }
}

export class Equation {
    constructor(name, items = []) {
        this.id = generateId();
        this.name = name;
        this.items = items;
    }
}

/**
 * @param {string} type form item type
 * @param {FormItemConfig} config contains information about the form item and its value
 */
export class EquationUnit {
    constructor(type, config) {
        this.id = generateId();
        this.type = type;
        this.config = config;
    }
}

export class ShallowFormItem extends EquationUnit {
    constructor(type, config) {
        this.type = type;
        this.config = config;
    }
}

/**
 * @param {string} contextId the id of the instance of the type which is currently the context
 * 	eg. type: attribute - the contextId is the id of an attribute
 */
export class EquationUnitConfig {
    constructor(contextId) {
        this.contextId = contextId;
    }
}

/**
 * information container for the equation parsing
 */
export class LinkedEquationUnit {
    constructor() {
        this.config = {};
        this.linked = null;
        this.type = null;
        this.valid = true;
        this.errors = [];
        this.isNew = false; // initially on unit is new except you specifically tell it to be new
    }
}

/**
 * @param {string} key formId and sheetId as "formId_sheetId"
 * @param {array} ignoredAttributes ids of AttributeBases
 */
export class EquationSheetOptions {
    constructor(formId, sheetId, ignoredAttributes = []) {
        this.id = generateId();
        this.key = formId + '_' + sheetId;
        this.ignoredAttributes = ignoredAttributes;
    }
}

/**
 * attribute instance used in FormSheetOptions.ignoredAttributes
 *
 * @param {string} baseId the attribute base id this instance associates to
 * @param {any} defaultValue the value used to avoid unwanted equation results such multiplying with 0
 */
export class IgnoredAttribute {
    constructor(baseId, defaultValue) {
        this.id = generateId();
        this.baseId = baseId;
        this.defaultValue = defaultValue;
    }
}
