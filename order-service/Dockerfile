# Use the latest stable Node.js version
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install dependencies for building native modules
RUN apk --no-cache add make gcc g++ python3

# Copy package files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the application code
COPY . .

# Set the port via environment variable
ENV PORT=3000

# Use environment-based commands
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm start; else npm run start:dev; fi"]
