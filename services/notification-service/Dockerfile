# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Expose port (optional, for future HTTP endpoints)
EXPOSE 3004

# Start the app
CMD ["npm", "run", "dev"]