import { Checkout } from "../src/Checkout";
import { pricingRules } from "../src/PricingRules";


describe("Checkout", () => {
    it("should calculate total correctly for atv, atv, atv, vga", () => {
        const co = new Checkout(pricingRules);
        co.scan("atv");
        co.scan("atv");
        co.scan("atv");
        co.scan("vga");
        expect(co.total()).toBeCloseTo(249.00);
    });

    it("should calculate total correctly for atv, ipd, ipd, atv, ipd, ipd, ipd", () => {
        const co = new Checkout(pricingRules);
        co.scan("atv");
        co.scan("ipd");
        co.scan("ipd");
        co.scan("atv");
        co.scan("ipd");
        co.scan("ipd");
        co.scan("ipd");
        expect(co.total()).toBeCloseTo(2718.95);
    });

    it("should handle no items scanned", () => {
        const co = new Checkout(pricingRules);
        expect(co.total()).toBe(0);
    })

    it("should handle unknown SKU", () => {
        const co = new Checkout(pricingRules);
        co.scan("xyz");
        expect(co.total()).toBe(0);
    })
});