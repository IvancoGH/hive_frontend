<template>
    <q-card-section>
        <div class="text-body1 text-bold q-mb-sm">Billing Summary</div>
        <div class="row">
            <div class="text-body1">Rent price</div>
            <q-space />
            <div class="text-body1">
                {{ calcDateDiff(props.startDate, props.endDate) + ' x ' +
                    formatAmount(props.price as number) }}
            </div>
        </div>
        <div class="row">
            <div class="text-body1">Deposit</div>
            <q-space />
            <div class="text-body1"> {{ formatAmount(props.deposit as number) }}
            </div>
        </div>
        <hr class="billing-separator" />
        <div class="row">
            <div class="text-body1 text-bold">Total price</div>
            <q-space />
            <div class="text-body1 text-bold">
                {{ formatAmount(getRentPrice()) }}
            </div>
        </div>
    </q-card-section>
</template>

<script setup lang="ts">
import { formatAmount } from '@/composables/formatter';
import { calcDateDiff, calcRentPrice } from '@/composables/calculator';

const props = defineProps<{
    startDate: string,
    endDate: string,
    price: number | string | undefined,
    deposit: number | string | undefined
}>();

function getRentPrice() {
    return calcRentPrice(
        props.startDate, props.endDate, props.price as number, props.deposit as number);
}
</script>

<style scoped>
.billing-separator {
    border: none;
    border-top: 2px dashed #D1D1D1;
    height: 3px;
}
</style>