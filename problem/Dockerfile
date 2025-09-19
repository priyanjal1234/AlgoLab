FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your auth service runs on (change if needed)
EXPOSE 3002

# Start the auth service
CMD ["node", "index.js"]
