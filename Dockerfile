# Use official Node.js image (using debian-based instead of alpine)
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies (including dev deps for build)
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the React app
RUN npm run build

# Expose the port Vite preview will use
EXPOSE 5700

# Start the app in preview mode on port 5700
CMD ["npm", "run", "preview", "--", "--port", "5700", "--host", "0.0.0.0"]
