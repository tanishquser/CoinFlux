FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose port (optional, for future HTTP endpoints)
EXPOSE 3002

CMD ["npm", "start"]