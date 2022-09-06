var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
export function Field() {
    return (targetClass, fieldKey) => {
        let fields = targetClass["__fields__"] || [];
        const className = targetClass.constructor.name;
        if (!fields.hasOwnProperty(className)) {
            fields[className] = ['id'];
        }
        if (!fields[className].includes(fieldKey)) {
            fields[className].push(fieldKey);
        }
        if (!targetClass.hasOwnProperty("__fields__")) {
            targetClass["__fields__"] = fields;
        }
    };
}
export class BaseModel {
    constructor(data) {
        this.apiFields = [];
        this.originalFields = {};
        const fields = this.getFields();
        Object.keys(data).forEach(key => {
            if (this.hasSetter(key) || fields.includes(key)) {
                this[key] = data[key];
                this.originalFields[key] = data[key];
            }
        });
    }
    get transformObjectForApi() {
        const apiObject = {};
        if (this.apiFields.length > 0) {
            this.apiFields
                .forEach((field) => {
                if ((field === 'id' && !this.id) || this[field] == null) {
                    return;
                }
                apiObject[field] = this[field];
            });
        }
        else {
            this.getFields()
                .forEach((field) => {
                if ((field === 'id' && !this.id) || this[field] == null) {
                    return;
                }
                apiObject[field] = this[field];
            });
        }
        return apiObject;
    }
    get isNew() {
        return !this.id;
    }
    isDirty() {
        const fields = this.getFields();
        for (let key of fields) {
            if (!this.originalFields.hasOwnProperty(key)) {
                continue;
            }
            if (this.originalFields[key] !== this[key]) {
                return true;
            }
        }
        return false;
    }
    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
    hasSetter(key) {
        var _a;
        return !!((_a = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), key)) === null || _a === void 0 ? void 0 : _a.set);
    }
    getFields() {
        let allFields = [];
        let prototype = Object.getPrototypeOf(this);
        while (prototype != null) {
            let fields = prototype["__fields__"];
            let classFields = [];
            if (fields) {
                if (fields.hasOwnProperty(this.constructor.name)) {
                    classFields = fields[this.constructor.name];
                }
                if (classFields.length > 0) {
                    allFields = classFields;
                }
            }
            prototype = null;
        }
        return allFields;
    }
}
__decorate([
    Field()
], BaseModel.prototype, "id", void 0);
