import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import type { VendingMachineSelectionType } from '$lib/models/vendingMachine';
import VendingMachineSelection from './VendingMachineSelection.svelte';

describe("VendingMachineSelection component", () => {

    it("should display the selection label", () => {
        const selection: VendingMachineSelectionType = {
            sku: 'CIT-COLA-YUZU-001',
            label: 'Citrus Cola: Yuzu',
            price: 60,
            count: 10,
            maxCount: 10
        };
        render(VendingMachineSelection, {selection});
        const name = screen.getByText(selection.label);
        expect(name).toBeInTheDocument();
    });

    it("should display the selection price", () => {
        const selection: VendingMachineSelectionType = {
            sku: 'CIT-COLA-YUZU-001',
            label: 'Citrus Cola: Yuzu',
            price: 60,
            count: 10,
            maxCount: 10
        };
        render(VendingMachineSelection, {selection});
        const name = screen.getByText(selection.price + ' credits');
        expect(name).toBeInTheDocument();
    });

    it("should be disabled if there is a threshold and the threshold is less than the price", () => {
        const selection: VendingMachineSelectionType = {
            sku: 'CIT-COLA-YUZU-001',
            label: 'Citrus Cola: Yuzu',
            price: 60,
            count: 10,
            maxCount: 10
        };
        const threshold = 50;
        render(VendingMachineSelection, {selection, threshold});
        const yuzu = screen.getByLabelText('Citrus Cola: Yuzu');
        console.log(yuzu.getAttributeNames())
        expect(yuzu.getAttribute('aria-disabled')).toBe("true");
    });

    it("should be disabled if there is a threshold and the threshold is 0", () => {
        const selection: VendingMachineSelectionType = {
            sku: 'CIT-COLA-YUZU-001',
            label: 'Citrus Cola: Yuzu',
            price: 60,
            count: 10,
            maxCount: 10
        };
        const threshold = 0;
        render(VendingMachineSelection, {selection, threshold});
        const yuzu = screen.getByLabelText('Citrus Cola: Yuzu');
        console.log(yuzu.getAttributeNames())
        expect(yuzu.getAttribute('aria-disabled')).toBe("true");
    });

    it("should be enabled if there is a threshold and the threshold is greater than the price", () => {
        const selection: VendingMachineSelectionType = {
            sku: 'CIT-COLA-YUZU-001',
            label: 'Citrus Cola: Yuzu',
            price: 60,
            count: 10,
            maxCount: 10
        };
        const threshold = 70;
        render(VendingMachineSelection, {selection, threshold});
        const yuzu = screen.getByLabelText('Citrus Cola: Yuzu');
        console.log(yuzu.getAttributeNames())
        expect(yuzu.getAttribute('aria-disabled')).toBe("false");
    });

    it("should be enabled if there is no threshold assigned", () => {
        const selection: VendingMachineSelectionType = {
            sku: 'CIT-COLA-YUZU-001',
            label: 'Citrus Cola: Yuzu',
            price: 60,
            count: 10,
            maxCount: 10
        };
        render(VendingMachineSelection, {selection});
        const yuzu = screen.getByLabelText('Citrus Cola: Yuzu');
        console.log(yuzu.getAttributeNames())
        expect(yuzu.getAttribute('aria-disabled')).toBe("false");
    });

});
