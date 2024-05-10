import { LightningElement, track } from 'lwc';

export default class CustomerOrder extends LightningElement {
    @track customers = [
        { name: 'John Doe', orderStatus: 'Pending' },
        { name: 'Jane Smith', orderStatus: 'Shipped' },
    ];
}