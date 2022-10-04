export type VendingMachineSlot = {
    sku: string;
    label: string;
    description?: string;
    price: number;
    count: number;
    maxCount: number;
}

export type VendingMachine = {
    id: string;
    name: string;
    bankTotal: number;
    slots: VendingMachineSlot[];
}
