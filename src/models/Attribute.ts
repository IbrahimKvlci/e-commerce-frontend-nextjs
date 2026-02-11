interface AttributeValue {
    valueText: string;
    count: number;
    isSelected: boolean;
}

export interface Attribute {
    key: string;
    values: AttributeValue[];
}