# Use the latest stable Node.js version for better performance
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install system dependencies for building native modules
RUN apk --no-cache add make gcc g++ python3

# Copy only package files to avoid rebuilding for code changes
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the application (for production mode)
RUN npm run build

# Expose application and debugging ports
EXPOSE 3000
EXPOSE 9229

# Use a conditional command based on the environment
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm start; else npm run start:dev; fi"]
