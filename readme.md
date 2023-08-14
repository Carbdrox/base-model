# BaseModel
A TypeScript base model

<a href="https://www.npmjs.com/package/@carbdrox/base-model"><img src="https://img.shields.io/npm/dt/@carbdrox/base-model" alt="Total Downloads"></a>
<a href="https://www.npmjs.com/package/@carbdrox/base-model"><img src="https://img.shields.io/npm/v/@carbdrox/base-model" alt="Latest Stable Version"></a>
<a href="https://www.npmjs.com/package/@carbdrox/base-model"><img src="https://img.shields.io/npm/l/@carbdrox/base-model" alt="License"></a>

## Installation

### Using npm

```
npm i @carbdrox/base-model --save
```

## Usage
Inside your self defined Models e.g. `User.ts`

```typescript
import {BaseModel, Field} from '@carbdrox/base-model';

export class User extends BaseModel {
    
    @Field()
    private name?: string;

    constructor(data) {
        super(data);
        this.hydrate(data);
    }
}
```

### Interface

`protected hydrate(data: KeyValue): void;`

This method hydrates the class with the provided data.


`protected apiFields: string[];`

This array should contain all keys that should be returned by transformObjectForApi.


`get transformObjectForApi(): KeyValue;`

This getter returns an Object containing values for all keys specified by transformObjectForApi. 
If transformObjectForApi is empty all class-fields are used.


`get isNew(): boolean;`

Returns true if the id-field contains a nullable value.


`isDirty(): boolean;`

Returns true if one value differs from the initial value.

`clone(): BaseModel;`

Returns a new instance/copy of the class.


## License

MIT
