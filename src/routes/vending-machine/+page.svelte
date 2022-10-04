<script lang="ts">
	import type { VendingMachine } from "$lib/models/vendingMachine";
	import { onMount } from "svelte";

    let id: string;

    let machine: VendingMachine = {
        id: '',
        name: '',
        bankTotal: 0,
        slots: []
    };

    function purchase(event: Event) {
        const target = event.target as Element;
        console.log(target.attributes.getNamedItem("data-sku")?.value);
    }

    onMount(async () => {
        const url: URL = new URL(window.location.href);
        id = url.searchParams.get('id') || '';
        machine = {
            id: id,
            name: 'My First Machine',
            bankTotal: 0,
            slots: [{
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

<div>
    {#each machine?.slots as slot }
        <button data-sku="{slot.sku}" on:click={purchase}>{slot.label}</button>
    {/each}
</div>