import { PricingRule } from "./Checkout";

export const pricingRules: PricingRule[] = [
    {
        sku: "atv",
        condition: (count) => count >= 3,
        applyDiscount: (count, price) => {
            const numSetsOfThree = Math.floor(count / 3);
            const remainingItems = count % 3;
            return numSetsOfThree * 2 * price + remainingItems * price;
        },
    },
    {
        sku: "ipd",
        condition: (count) => count > 4,
        applyDiscount: (count, price) => count * 499.99,
    },
];