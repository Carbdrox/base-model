import { KeyValue } from './types';
export declare function Field(): PropertyDecorator;
export declare class BaseModel {
    id?: number;
    protected apiFields: string[];
    protected originalFields: KeyValue;
    constructor(data: KeyValue);
    get transformObjectForApi(): KeyValue;
    get isNew(): boolean;
    isDirty(): boolean;
    clone(): BaseModel;
    private hasSetter;
    private getFields;
}
