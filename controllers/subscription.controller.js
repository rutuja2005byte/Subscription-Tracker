import Subscription from '../models/Subscription.model.js';

export const createSubscription = (req, res, next) => {
    try {
        const subscription = await Subscription.create ({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json({ success: true, data: subscription});
    } catch (e) {
        next(e);
    }
}