# ---- Build Stage ----
    FROM node:20-alpine AS build

    # Set working directory inside the container
    WORKDIR /app
    
    # Copy package files and install dependencies
    COPY package*.json ./
    RUN npm ci
    
    # Copy the full source code and build it
    COPY . .
    RUN npm run build
    
    # ---- Production Stage ----
    FROM nginx:alpine AS production
    
    # Remove the default NGINX site
    # RUN rm -rf /usr/share/nginx/html/*
    
    # Copy custom nginx config
    # COPY nginx.conf /etc/nginx/conf.d/default.conf
     
    # Copy built app from previous stage
    COPY --from=build /app/dist /usr/share/nginx/html
    
    EXPOSE 80
    
    # Start NGINX
    CMD ["nginx", "-g", "daemon off;"]
    