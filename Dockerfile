# Get the base image of Node version latest
FROM node:latest

# Get the latest image of Playwright.
FROM mcr.microsoft.com/playwright:v1.43.0-jammy

# Set the working directory
WORKDIR /app

# Set the environment path
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json and package-lock.json
COPY package.json /app/
COPY src /app/src/
COPY tests /app/tests/
COPY tsconfig.json /app/
COPY playwright.config.ts /app/

# Install Libraries
RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

# Install dependencies
RUN npm install

# Set CI to true
ARG CI=true

# Run the tests
CMD ["npx", "playwright", "test"]
