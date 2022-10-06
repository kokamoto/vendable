<script lang="ts">
	import type { VendingMachineSelectionType, VendingMachineType } from "$lib/models/vendingMachine";
	import { createEventDispatcher } from "svelte";

    export let machine: VendingMachineType;
    let depositAmounts: number[];
    let transactionAmount: number = 0;

    const dispatch = createEventDispatcher();

    $: depositAmounts = machine.depositAmounts || [5, 10, 20, 50];

    function purchase(selection: VendingMachineSelectionType) {
        // check to see if there is enough credits
        if (selection.price > transactionAmount) {
            return;
        }
        // calculate remainder
        const changeBack = transactionAmount - selection.price;
        // zero transaction
        transactionAmount = 0;
        dispatch('purchase', { selection, changeBack });
    }

</script>

<h1>{machine.name}</h1>
<div>
    <span id="amount-deposited">Amount Deposited:</span>
    <span aria-labelledby="amount-deposited">{transactionAmount} credits</span>
</div>
<div role="list" data-testid="deposit-list">
    {#each depositAmounts as depositAmount }
        <button on:click={() => transactionAmount += depositAmount}>{depositAmount} credits</button>
    {/each}
</div>
<div role="list" data-testid="selection-list">
    {#each machine?.selections as selection }
        <div class="selection" data-sku="{selection.sku}" aria-labelledby="{selection.sku}" role="listitem"
            disabled={selection.price > transactionAmount}
            on:click={() => purchase(selection)}>
            <span class="selection-label" id="{selection.sku}">{selection.label}</span>
            <span class="selection-price">{selection.price} credits</span>
        </div>
    {/each}
</div>
