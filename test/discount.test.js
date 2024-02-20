import { expect } from "chai";
import { describe, it } from "mocha";
import Basket from "../src/basket.js";

describe("Basket Class with Discounts", function () {
  let basket;

  beforeEach(() => {
    basket = new Basket();
  });

  describe("addItem()", function () {
    it("should not allow items with a price less than or equal to 0", function () {
      expect(() => basket.addItem("Freebie", 0)).to.throw();
      expect(() => basket.addItem("Negative Price", -1)).to.throw();
    });
  });

  describe("applyDiscount()", function () {
    it("should not allow discounts less than or equal to 0%", function () {
      basket.addItem("Apple", 1.0);
      expect(() => basket.applyDiscount("INVALID", 0)).to.throw();
      expect(() => basket.applyDiscount("MOREINVALID", -10)).to.throw();
    });

    it("the amount of the price of an item after discount is proportionally less than the initial amount", function () {
      basket.addItem("Banana", 1.5);
      basket.applyDiscount("GOODDEAL", 10); // Apply 10% discount
      const total = basket.calculateTotal();
      expect(total).to.be.lessThan(1.5);
    });
  });

  describe("calculateTotal()", function () {
    it("should apply the discount correctly to the total price", function () {
      basket.addItem("Apple", 1.0);
      basket.addItem("Banana", 2.0);
      basket.applyDiscount("SUMMER21", 25); // Apply a 25% discount
      const total = basket.calculateTotal();
      const expectedTotal = (1.0 + 2.0) * 0.75; // 25% discount
      expect(total).to.equal(expectedTotal);
    });

    it("the discount can only be applied once", function () {
      basket.addItem("Apple", 1.0);
      basket.applyDiscount("ONEOFF", 10); // Apply 10% discount
      let total = basket.calculateTotal();
      expect(total).to.be.lessThan(1.0);
      // Try to apply another discount and calculate again
      basket.applyDiscount("ANOTHERONE", 10); // This should not work
      total = basket.calculateTotal();
      // The total should not change because the discount can only be applied once
      expect(total).to.equal(0.9);
    });

    it("the coupon has been applied for one product", function () {
      const product = {
        id: 1,
        name: "apple",
        price: 10,
      };
      let couponArray = [{ code: "", cout: 2, idProduit: 1 }];
      basket.addItem(product, 2.0);
      basket.applyDiscountforProduct(couponArray, product); // This should not work
      total = basket.calculateTotal();
      expect(total).to.equal(8);
    });
  });
});
