export type VendingMachineSelectionType = {
    sku: string;
    label: string;
    description?: string;
    price: number;
    count: number;
    maxCount: number;
}

export type VendingMachineType = {
    id: string;
    name: string;
    salesTotal: number;
    selections: VendingMachineSelectionType[];
    depositAmounts?: number[]
}
