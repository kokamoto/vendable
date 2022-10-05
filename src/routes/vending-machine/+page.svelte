<script lang="ts">
	import type { VendingMachine, VendingMachineSelection } from "$lib/models/vendingMachine";
	import { onMount } from "svelte";

    let id: string;

    let machine: VendingMachine = {
        id: '',
        name: '',
        bankTotal: 0,
        selections: []
    };

    function getSelection(sku: string): VendingMachineSelection | undefined {
        return machine.selections.find(selection => selection.sku === sku);
    }

    function purchase(event: Event) {
        const target: Element = event.target as Element;
        const sku = target.attributes.getNamedItem("data-sku")?.value;
        if (sku) {
            const selection: VendingMachineSelection | undefined = getSelection(sku);
            if (selection) {
                machine.bankTotal += selection.price;
                selection.count -= 1;
            }
        }

    }

    onMount(async () => {
        const url: URL = new URL(window.location.href);
        id = url.searchParams.get('id') || '';
        machine = {
            id: id,
            name: 'My First Machine',
            bankTotal: 0,
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
            }]
        }
    });
</script>
  
<h1>Vending Machine ({machine?.name})</h1>
<h2>Sales Total: {machine?.bankTotal}</h2>
<div>
    {#each machine?.selections as selection }
        <button data-sku="{selection.sku}" on:click={purchase} disabled={selection.count < 1}>{selection.label} - {selection.count}</button>
    {/each}
</div>