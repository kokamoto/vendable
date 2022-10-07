<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { VendingMachineSelectionType } from "$lib/models/vendingMachine";
    export let selection: VendingMachineSelectionType;
    export let threshold: number | undefined = undefined;

    const dispatch = createEventDispatcher();

    $: disabled = (threshold !== undefined && selection.price > threshold) ? true : false;

</script>

<div class="selection" aria-labelledby="{selection.sku}" role="listitem" aria-disabled={disabled}
    on:click={() => dispatch("click")}>
    <div class="selection-label" id="{selection.sku}">{selection.label}</div>
    <div class="selection-price">{selection.price} credits</div>
</div>

<style>
    .selection {
        height: 10rem;
        width: 15rem;
        border: 1px solid #333;
        border-radius: 5px;
        text-align: center;
        margin: 1rem;
        cursor: pointer;
    }
    .selection[aria-disabled="true"] {
        background-color: #eee;
    }
    .selection:active {
        border-color: #0f0;
    }
    .selection:hover {
        border-color: #090;
    }
</style>