import { expect } from "chai";
import { describe, it } from "mocha";
import Basket from "../src/basket.js";

describe("Basket Class", function () {
  let basket;

  beforeEach(() => {
    basket = new Basket();
  });

  describe("addItem()", function () {
    it("should add an item to the basket", function () {
      basket.addItem("Apple", 0.99);
      expect(basket.items).to.deep.include({ name: "Apple", price: 0.99 });
    });

    it("should increase the item count in the basket", function () {
      basket.addItem("Apple", 0.99);
      basket.addItem("Banana", 1.49);
      expect(basket.items.length).to.equal(2);
    });
  });

  describe("calculateTotal()", function () {
    it("should calculate the total price of the basket", function () {
      basket.addItem("Apple", 0.99);
      basket.addItem("Banana", 1.49);
      expect(basket.calculateTotal()).to.equal(2.48);
    });

    it("should return 0 if the basket is empty", function () {
      expect(basket.calculateTotal()).to.equal(0);
    });
  });

  describe("removeItem()", function () {
    it("should remove an item from the basket", function () {
      basket.addItem("Apple", 0.99);
      basket.removeItem("Apple");
      expect(basket.items).to.not.deep.include({ name: "Apple", price: 0.99 });
    });

    it("should decrease the item count in the basket", function () {
      basket.addItem("Apple", 0.99);
      basket.addItem("Banana", 1.49);
      basket.removeItem("Apple");
      expect(basket.items.length).to.equal(1);
    });
  });

  describe("emptyBasket()", function () {
    it("should empty the basket", function () {
      basket.addItem("Apple", 0.99);
      basket.emptyBasket();
      expect(basket.items).to.be.empty;
    });

    it("should reset the item count to 0", function () {
      basket.addItem("Apple", 0.99);
      basket.addItem("Banana", 1.49);
      basket.emptyBasket();
      expect(basket.items.length).to.equal(0);
    });
  });
});
