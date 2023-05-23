# Start from a base image that includes Node.js
FROM node:latest

# Set the working directory
WORKDIR /

# Copy package.json and package-lock.json
COPY package.json package*.json 

# Install Node.js dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Run on container app
CMD [ "npm", "start" ]
