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

// eslint-disable-next-line no-unused-vars
export class CharacterSheetAttribute extends AttributeBase {
    constructor(baseId, name, value = null, defaultValue = null) {
        super(name, defaultValue);
        this.baseId = baseId;
        this.value = value;
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

export class Form {
    constructor(name, items = []) {
        this.id = generateId();
        this.name = name;
        this.items = items;
    }
}

/**
 * @param {string} type form item type
 * @param {FormItemValue} value contains information about the form item and its value
 */
export class FormItem {
    constructor(type, value) {
        this.id = generateId();
        this.type = type;
        this.value = value;
    }
}

/**
 * @param {string} contextId the id of the instance of the type which is currently the context
 * 	eg. type: attribute - the contextId is the id of an attribute
 */
export class FormItemValue {
    constructor(contextId) {
        this.id = contextId;
    }
}

/**
 * @param {string} key formId and sheetId as "formId_sheetId"
 * @param {array} ignoredAttributes ids of AttributeBases
 */
export class FormSheetOptions {
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
