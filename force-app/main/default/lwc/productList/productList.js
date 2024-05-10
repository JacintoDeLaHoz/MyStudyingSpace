import { LightningElement } from 'lwc';

export default class ProductList extends LightningElement {
    products = [
        { id: 1, name: 'Laptop', price: 1000 },
        { id: 2, name: 'Smartphone', price: 500 },
        { id: 3, name: 'Tablet', price: 700 },
    ];

    selectedProductId = null;

    selectProduct(event) {
        this.selectedProductId = parseInt(event.target.dataset.id, 10);
    }

    get selectedProduct() {
        return this.products.find(product => product.id === this.selectedProductId);
    }
}