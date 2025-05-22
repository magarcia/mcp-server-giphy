FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Install dependencies without running scripts
RUN npm install --ignore-scripts

# Bundle app source
COPY . .

# Build the project
RUN npm run build

# Expose port if needed (optional, not necessary for stdio MCP)

# Start the server
CMD [ "npm", "start" ]
