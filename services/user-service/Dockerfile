# 1. Base image
FROM node:18

# 2. Set working directory
WORKDIR /app

# 3. Copy code to the container
COPY . .

# 4. Install dependencies
RUN npm install

# 5. Command to start the app
CMD ["npm", "run", "dev"]