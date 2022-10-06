import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import VendingMachine from './VendingMachine.svelte';
import type { VendingMachineType } from '$lib/models/vendingMachine';

describe("VendingMachine component", () => {
    let machine: VendingMachineType;

    beforeEach(() => {
        machine = {
            id: 'c1d0185f-8c58-4d2e-ba1f-fa9d01dd4eb0',
            name: 'Sunny Vending Machine',
            salesTotal: 0,
            selections: [{
                sku: 'CIT-COLA-LIME-001',
                label: 'Citrus Cola: Lime',
                price: 50,
                count: 10,
                maxCount: 10
            }, {
                sku: 'CIT-COLA-YUZU-001',
                label: 'Citrus Cola: Yuzu',
                price: 60,
                count: 10,
                maxCount: 10
            }]
        }
    });

    it("should display the vending machine name", () => {
        render(VendingMachine, {machine});
        const name = screen.getByText(machine.name)
        expect(name).toBeInTheDocument();
    });

    it("should display the vending machine selections", () => {
        render(VendingMachine, {machine});
        const lime = screen.getByLabelText('Citrus Cola: Lime');
        expect(lime).toBeInTheDocument();
        const yuzu = screen.getByLabelText('Citrus Cola: Yuzu');
        expect(yuzu).toBeInTheDocument();
    });

    it("should display the vending machine selection prices", () => {
        render(VendingMachine, {machine});
        const lime = screen.getByLabelText('Citrus Cola: Lime');
        const limePrice = within(lime).getByText("50 credits");
        expect(limePrice).toBeInTheDocument();
        const yuzu = screen.getByLabelText('Citrus Cola: Yuzu');
        const yuzuPrice = within(yuzu).getByText("60 credits")
        expect(yuzuPrice).toBeInTheDocument();
    });

    it("should display the default deposit amount buttons", () => {
        render(VendingMachine, {machine});
        const depositList = screen.getByTestId("deposit-list")
        const deposit5 = within(depositList).getByText('5 credits');
        expect(deposit5).toBeInTheDocument();
        const deposit10 = within(depositList).getByText('10 credits');
        expect(deposit10).toBeInTheDocument();
        const deposit20 = within(depositList).getByText('20 credits');
        expect(deposit20).toBeInTheDocument();
        const deposit50 = within(depositList).getByText('50 credits');
        expect(deposit50).toBeInTheDocument();
    });

    it("should display the customized deposit amount buttons", () => {
        const customMachine: VendingMachineType = {
            id: 'c1d0185f-8c58-4d2e-ba1f-fa9d01dd4eb0',
            name: 'Sunny Vending Machine',
            salesTotal: 0,
            selections: [{
                sku: 'CIT-COLA-LIME-001',
                label: 'Citrus Cola: Lime',
                price: 50,
                count: 10,
                maxCount: 10
            }, {
                sku: 'CIT-COLA-YUZU-001',
                label: 'Citrus Cola: Yuzu',
                price: 50,
                count: 10,
                maxCount: 10
            }],
            depositAmounts: [12, 23, 45]
        }
        render(VendingMachine, {machine: customMachine});
        const deposit12 = screen.getByText('12 credits');
        expect(deposit12).toBeInTheDocument();
        const deposit23 = screen.getByText('23 credits');
        expect(deposit23).toBeInTheDocument();
        const deposit45 = screen.getByText('45 credits');
        expect(deposit45).toBeInTheDocument();
    });

    it("should show the amount deposited (transaction amount)", () => {
        render(VendingMachine, {machine});
        const transaction = screen.getByLabelText("Amount Deposited:");
        expect(transaction).toHaveTextContent("0 credits");
    });

    it("should increase the transaction amount by the amount deposited", async () => {
        render(VendingMachine, {machine});
        const deposit5 = screen.getByText('5 credits');
        const deposit10 = screen.getByText('10 credits');
        let transaction = screen.getByLabelText("Amount Deposited:");

        await fireEvent.click(deposit10);
        expect(transaction).toHaveTextContent("10 credits");

        await fireEvent.click(deposit5);
        expect(transaction).toHaveTextContent("15 credits");

        await fireEvent.click(deposit10);
        expect(transaction).toHaveTextContent("25 credits");
    });

});
