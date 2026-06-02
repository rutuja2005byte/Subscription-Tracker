import { Router } from 'express';

const subscriptionRouter = Router();

subscription.get ('/', (req, res) =>
    res.send({title: 'GET all subcription'})
);

subscription.get('/id:', (req, res) =>
    res.send({title: 'GET subscription details'})
);

subscription.post('/',(req, res) =>
    res.send({title: 'CREATE subscription'})
);

subscription.put('/id:',(req, res) =>
    res.send({title: 'UPDATE subscription'})
);

subscription.delete('/id:', (req, res) =>
    res.send({title: 'DELETE subscription'})
);
export default subscriptionRouter;