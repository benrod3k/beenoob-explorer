FROM node:10 AS builder
RUN \
    apt-get update && apt-get upgrade -q -y && \
    apt-get install -y ca-certificates git node-gyp make
WORKDIR /root/beenoob

# Cache npm install
COPY package*.json ./
RUN npm install
COPY . .

# Build static assets
RUN npm run build

# STEP 2 build a small nginx image with static website
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets to nginx image
COPY --from=builder /root/beenoob/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
