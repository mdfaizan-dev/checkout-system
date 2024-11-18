export interface Product {
    sku: string;
    name: string;
    price: number;
}

export interface PricingRule {
    sku: string;
    condition: (count: number) => boolean;
    applyDiscount: (count: number, price: number) => number;
}

export class Checkout {
    private items: { [sku: string]: number } = {};
    private pricingRules: PricingRule[];

    constructor(pricingRules: PricingRule[]) {
        this.pricingRules = pricingRules;
    }

    scan(sku: string) {
        this.items[sku] = (this.items[sku] || 0) + 1;
    }

    total(): number {
        let total = 0;
        for (const sku in this.items) {
            const count = this.items[sku];
            const rule = this.pricingRules.find((r) => r.sku === sku);
            const price = this.getPrice(sku);
            total += rule?.condition(count) ? rule.applyDiscount(count, price) : price * count;
        }
        return total;
    }

    private getPrice(sku: string): number {
        const productPrices: { [sku: string]: number } = {
            ipd: 549.99,
            mbp: 1399.99,
            atv: 109.50,
            vga: 30.00
        }
        return productPrices[sku] ?? 0;

    }
}