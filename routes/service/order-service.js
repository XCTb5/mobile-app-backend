const { getOrderCollection } = require("../models/orders");

class OrderService {

    async saveOrder(order) {
        console.log('Order: ' + JSON.stringify(order));
        const orderCollection = await getOrderCollection();
        return await orderCollection.insertOne(order);
    }
}
module.exports = OrderService;