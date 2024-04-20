# Use an official Node.js runtime as the base image
FROM node:21.7.3

# Set the working directory in the Docker image
# All the commands that follow in the Dockerfile will be run in this directory.
WORKDIR /usr/src

# Install PM2
# PM2 is a process manager for Node.js applications. It allows you to keep your application running forever, reload it without downtime, create a cluster, and more.
RUN npm install -g pm2

# Copy package.json and package-lock.json to the working directory
# These files specify the project dependencies.
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Expose port 3000 for the app to listen on
# This is the port that your application will use to communicate with the outside world.
EXPOSE 3000

# Expose port 5252 for the db to listen on
# This is the port that your database will use to communicate with the outside world.
EXPOSE 5252

# Start the server and frontend
# This command starts your application using PM2, then starts your frontend.
CMD pm2 start server.js --name server && cd frontend && npm start