import {FieldList, KeyValue} from './types'

export function Field(): PropertyDecorator {
    return (targetClass: Object, fieldKey: string | symbol): void => {

        let fields: FieldList = (targetClass as any)["__fields__"] || [];
        const className: string = targetClass.constructor.name;

        if(!fields.hasOwnProperty(className)) {
            fields[className] = ['id'];
        }

        if(!fields[className].includes(<string>fieldKey)) {
            fields[className].push(<string>fieldKey);
        }

        if (!targetClass.hasOwnProperty("__fields__")) {
            (targetClass as any)["__fields__"] = fields;
        }
    }
}

export class BaseModel {

    @Field()
    id?: number;

    protected apiFields: string[] = [];
    protected originalFields: KeyValue = {};

    constructor(data: KeyValue) {
        const fields: string[] = this.getFields();
        type ObjectKey = keyof typeof this;

        Object.keys(data).forEach(key => {
            if (this.hasSetter(key) || fields.includes(key)) {
                this[<ObjectKey>key] = data[key];
                this.originalFields[key] = data[key];
            }
        });
    }

    get transformObjectForApi(): KeyValue {
        const apiObject: KeyValue = {};
        type ObjectKey = keyof typeof this;

        if (this.apiFields.length > 0) {
            this.apiFields
                .forEach((field: string) => {
                    if((field === 'id' && !this.id) || this[<ObjectKey>field] == null) {
                        return;
                    }

                    apiObject[field] = this[<ObjectKey>field];
                });
        } else {
            this.getFields()
                .forEach((field: string) => {
                    if((field === 'id' && !this.id) || this[<ObjectKey>field] == null) {
                        return;
                    }

                    apiObject[field] = this[<ObjectKey>field];
                });
        }

        return apiObject;
    }

    get isNew(): boolean {
        return !this.id;
    }

    public isDirty(): boolean {
        const fields: string[] = this.getFields();
        type ObjectKey = keyof typeof this;


        for (let key of fields) {
            if(!this.originalFields.hasOwnProperty(key)) {
                continue;
            }

            if(this.originalFields[key] !== this[<ObjectKey>key]) {
                return true;
            }
        }

        return false;
    }

    public clone(): BaseModel {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    private hasSetter(key: string): boolean {
        return !!Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), key)?.set;
    }

    private getFields(): string[] {
        let allFields: string[] = [];
        let prototype = Object.getPrototypeOf(this);

        while(prototype != null) {
            let fields: FieldList = prototype["__fields__"];
            let classFields: string[] = [];

            if(fields) {
                if(fields.hasOwnProperty(this.constructor.name)) {
                    classFields = fields[this.constructor.name];
                }

                if(classFields.length > 0){
                    allFields = classFields;
                }
            }

            prototype = null;
        }

        return allFields;
    }
}