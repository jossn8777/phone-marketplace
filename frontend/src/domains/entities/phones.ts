export interface PhoneInterface {
    name?: string;
    manufacturer?: string;
    description?: string;
    color?: string;
    price?: number;
    picture?: any;
    screen?: string;
    processor?: string;
    ram?: string;
}

export class Phone {
    properties: PhoneInterface;
    constructor(phone: PhoneInterface) {
        this.properties = phone;
    }
}

export class UpdatePhone extends Phone {
    id: string;
    constructor(phone: PhoneInterface, id: string) {
        super(phone);
        this.id = id;
    }
}
