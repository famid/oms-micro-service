# Use the latest stable Node.js version
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only package files to avoid rebuilding for code changes
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the application (for production mode)
RUN npm run build

# Expose application and debugging ports
EXPOSE 4000
EXPOSE 9228

# Use a conditional command based on the environment
CMD ["sh", "-c", "npm install && if [ \"$NODE_ENV\" = \"production\" ]; then npm start; else npm run start:dev; fi"]
