#!/bin/bash

# Aletheia Unified - AWS Lambda Deployment Script
# One command deployment for the unified Boa + Aletheia platform

set -e

echo "🚀 Aletheia Unified - AWS Lambda Deployment"
echo "==========================================="
echo ""

# Configuration
AWS_REGION=${AWS_REGION:-us-east-1}
AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID:-$(aws sts get-caller-identity --query Account --output text)}
FUNCTION_NAME="aletheia-unified"
RUNTIME="nodejs22.x"

echo "📋 Configuration:"
echo "  Region: $AWS_REGION"
echo "  Account: $AWS_ACCOUNT_ID"
echo "  Function: $FUNCTION_NAME"
echo ""

# Build
echo "🔨 Building application..."
npm run build
echo "✓ Build complete"
echo ""

# Create deployment package
echo "📦 Creating deployment package..."
cd dist
zip -r ../aletheia-deployment.zip . -q
cd ..
echo "✓ Package created: aletheia-deployment.zip"
echo ""

# Deploy to Lambda
echo "🚀 Deploying to AWS Lambda..."

# Check if function exists
if aws lambda get-function --function-name $FUNCTION_NAME --region $AWS_REGION 2>/dev/null; then
  echo "  Updating existing function..."
  aws lambda update-function-code \
    --function-name $FUNCTION_NAME \
    --zip-file fileb://aletheia-deployment.zip \
    --region $AWS_REGION > /dev/null
else
  echo "  Creating new function..."
  aws lambda create-function \
    --function-name $FUNCTION_NAME \
    --runtime $RUNTIME \
    --role arn:aws:iam::$AWS_ACCOUNT_ID:role/lambda-execution-role \
    --handler index.handler \
    --zip-file fileb://aletheia-deployment.zip \
    --timeout 60 \
    --memory-size 512 \
    --region $AWS_REGION > /dev/null
fi

echo "✓ Lambda function deployed"
echo ""

# Create/Update Lambda URL
echo "🔗 Setting up Lambda URL..."
LAMBDA_URL=$(aws lambda get-function-url-config --function-name $FUNCTION_NAME --region $AWS_REGION 2>/dev/null | grep FunctionUrl | cut -d'"' -f4) || true

if [ -z "$LAMBDA_URL" ]; then
  echo "  Creating Lambda URL..."
  RESPONSE=$(aws lambda create-function-url-config \
    --function-name $FUNCTION_NAME \
    --auth-type NONE \
    --region $AWS_REGION)
  LAMBDA_URL=$(echo $RESPONSE | grep -o '"FunctionUrl":"[^"]*' | cut -d'"' -f4)
else
  echo "  Using existing Lambda URL..."
fi

echo "✓ Lambda URL: $LAMBDA_URL"
echo ""

# Cleanup
rm -f aletheia-deployment.zip

echo "✅ Deployment Complete!"
echo ""
echo "🌐 Your app is live at:"
echo "   $LAMBDA_URL"
echo ""
echo "📊 Monitor at:"
echo "   https://console.aws.amazon.com/lambda/home?region=$AWS_REGION#/functions/$FUNCTION_NAME"
echo ""
echo "🐍 Boa Daemon Heartbeat:"
echo "   curl -X POST $LAMBDA_URL/api/trpc/boa.heartbeat"
echo ""
echo "🧠 Aletheia Status:"
echo "   curl $LAMBDA_URL/api/trpc/aletheia.getStatus"
echo ""
