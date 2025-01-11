# Use Node.js 18 LTS as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies (including dev dependencies for development mode)
COPY package*.json ./
RUN npm install

# Install nodemon for development
RUN npm install -g nodemon

# Copy the application code
COPY . .

# Set environment variables (optional)
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}

# Expose the port dynamically based on the .env file
EXPOSE ${PORT}

# Run the app with nodemon in development mode
CMD ["nodemon", "src/server.js"]



