class Basket {
    constructor() {
        this.items = []; // Each item is an object { name: 'Item', price: 1.99 }
    }

    // Add an item to the basket
    addItem(name, price) {
        if (price <= 0) {
            throw new Error('Price must be greater than 0');
        }
        this.items.push({ name: name, price: price });
        console.log(`${name} has been successfully added. Your basket is starting to look like a treasure trove!`);
    }

    applyDiscount(code, percentage) {
        // Vérifie si une remise a déjà été appliquée
        if (percentage <= 0) {
            throw new Error('Discount percentage must be greater than 0');
        }
        if (this.discount) {
            console.log("Une remise a déjà été appliquée à ce panier.");
            return;
        }
        // Simule la validation du code de remise
        // Dans un cas réel, cela impliquerait probablement de vérifier une base de données ou un service externe
        this.discount = {
            code,
            percentage
        };
        console.log(`La remise de ${percentage}% a été appliquée.`);
    }

    calculateTotal() {
        let total = this.items.reduce((total, item) => total + item.price, 0);
        // Applique la remise si elle existe
        if (this.discount) {
            total = total - (total * (this.discount.percentage / 100));
            // Après application, retirez la remise pour empêcher une utilisation ultérieure
            this.discount = null; // Assurez-vous de gérer cela selon les besoins de votre application
        }
        return total;
    }

    // Remove an item from the basket by its name
    removeItem(itemToRemove) {
        const index = this.items.findIndex(item => item.name === itemToRemove);
        if (index !== -1) {
            this.items.splice(index, 1);
            console.log(`${itemToRemove} has been removed. Lighter and faster now!`);
        } else {
            console.log(`Unable to find ${itemToRemove}... Are you sure it was in the basket, or is it just an illusion?`);
        }
    }

    // Empty the basket
    emptyBasket() {
        this.items = [];
        console.log("The basket is now as empty as a salesman's promises on Black Friday.");
    }
}

export default Basket;