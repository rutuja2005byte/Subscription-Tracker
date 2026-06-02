import { Router } from 'express';

const subscriptionRouter = Router();

subscription.get ('/', (req, res) =>
    res.send({title: 'GET all subcription'})
);

export default subscriptionRouter;