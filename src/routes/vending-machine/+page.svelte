<script lang="ts">
	import VendingMachine from "$lib/components/VendingMachine.svelte";
    import type { VendingMachineType } from "$lib/models/vendingMachine";
	import { onMount } from "svelte";

    let id: string;

    let machine: VendingMachineType = {
        id: '',
        name: '',
        salesTotal: 0,
        selections: [],
        depositAmounts: []
    };

    function purchase(event: any) {
        alert("PURCHASED: " + event.detail.selection.label)
    }

    onMount(async () => {
        const url: URL = new URL(window.location.href);
        id = url.searchParams.get('id') || '';
        machine = {
            id: id,
            name: 'My First Machine',
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
            }]
        }
    });
</script>
  
<!-- <h1>Vending Machine ({machine?.name})</h1>
<h2>Sales Total: {machine?.salesTotal}</h2>
<div>
    {#each machine?.selections as selection }
        <button data-sku="{selection.sku}" on:click={purchase} disabled={selection.count < 1}>{selection.label} - {selection.count}</button>
    {/each}
</div> -->

<VendingMachine machine={machine} on:purchase={purchase}></VendingMachine>