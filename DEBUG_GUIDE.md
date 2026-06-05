#!/bin/bash

# Subscription Tracker - Debugging Guide

echo "=== Subscription Tracker - Debugging Email Issues ==="
echo ""
echo "Step 1: Verify Environment Variables"
echo "Run this to check your .env file is loaded:"
echo "node -e \"import('./config/env.js').then(m => console.log(m))\""
echo ""

echo "Step 2: Test Email Function Directly"
echo "Run this to test if emails can be sent:"
echo "npm run test-email"
echo ""

echo "Step 3: Check QStash Connection (if using local QStash)"
echo "Local QStash should be running at: http://127.0.0.1:8080"
echo "Test with: curl http://127.0.0.1:8080/health"
echo ""

echo "Step 4: Create a subscription and check console logs"
echo "POST http://localhost:5500/api/v1/subscriptions"
echo ""

echo "Step 5: Common Issues:"
echo "- EMAIL_PASSWORD: Make sure you're using Gmail App Password (not regular password)"
echo "- Gmail requires 'Less secure apps' OR use 2FA with App Passwords"
echo "- SERVER_URL must be correct for workflow to trigger"
echo "- QStash must be running locally (docker or qstash-local)"
echo "- Database must be connected"
echo ""

echo "Step 6: Check Logs"
echo "Look for these messages in console:"
echo "✓ Subscription created: [id]"
echo "✓ Triggering workflow with URL: http://localhost:5500/api/v1/workflows/subscription/reminder"
echo "✓ Workflow triggered successfully: [id]"
echo "✓ Email sent successfully to [email]"
echo ""

echo "For Production (using actual QStash):"
echo "1. Update .env.production.local with your real QSTASH credentials"
echo "2. Set SERVER_URL to your deployed URL"
echo "3. Update Gmail credentials if needed"
