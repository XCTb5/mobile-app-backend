const express = require('express');
const router = express.Router();
const OrderService = require('../service/order-service');
const orderService = new OrderService();

router.post('/', async (req, res) => {
    try {
        const orderResult = await orderService.saveOrder(req.body);
        res.json(orderResult);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error processing request at this time!" });
    }
});

module.exports = router;