import { Router } from 'express';

const subscriptionRouter = Router();

subscription.get ('/', (req, res) =>
    res.send({title: 'GET all subcription'})
);

subscription.get('/id:', (req, res) =>
    res.send({title: 'GET subscription details'})
);

export default subscriptionRouter;