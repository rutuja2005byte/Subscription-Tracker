import Subscription from '../models/Subscription.model.js';
import { workflowClient } from '../config/upstash.js'
import { SERVER_URL } from '../config/env.js'

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    console.log('Subscription created:', subscription._id);
    console.log('Triggering workflow with URL:', `${SERVER_URL}/api/v1/workflows/subscription/reminder`);

    let workflowRunId;
    try {
      const workflowResponse = await workflowClient.trigger({
        url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
        body: {
          subscriptionId: subscription._id.toString(),
        },
        headers: {
          'content-type': 'application/json',
        },
        retries: 0,
      });
      workflowRunId = workflowResponse.workflowRunId;
      console.log('Workflow triggered successfully:', workflowRunId);
    } catch (workflowError) {
      console.error('Workflow trigger error:', workflowError);
      // Continue even if workflow fails - subscription was created
      workflowRunId = null;
    }

    res.status(201).json({ 
      success: true, 
      data: { 
        subscription, 
        workflowRunId,
        message: workflowRunId ? 'Subscription created and workflow triggered' : 'Subscription created but workflow trigger failed'
      } 
    });
  } catch (e) {
    console.error('createSubscription error:', e);
    next(e);
  }
}

export const getUserSubscriptions = async (req, res, next) => {
  try {
    // Check if the user is the same as the one in the token
    if(req.user.id !== req.params.id) {
      const error = new Error('You are not the owner of this account');
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
}