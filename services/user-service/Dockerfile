# 1. Base image
FROM node:18

# 2. Set working directory
WORKDIR /app

COPY services/user-service/package*.json ./

# 3. Install dependencies
RUN npm install

# 4. Copy code to the container
COPY . .


# Expose port (optional, for future HTTP endpoints)
EXPOSE 3001

# 5. Command to start the app
CMD ["npm", "run", "dev"]