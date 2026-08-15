# Use Node.js 16
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Install serve to run the built app
RUN npm install -g serve

# Expose port (default React port)
EXPOSE 3000

# Run the app
CMD ["serve", "-s", "build", "-l", "3000"]