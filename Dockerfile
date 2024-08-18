# # Base image from Puppeteer's official image repository
# FROM ghcr.io/puppeteer/puppeteer:23.1.0

# # Environment variables to skip Chromium download and set executable path
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# # Install necessary dependencies for Xvfb and Fluxbox
# RUN apt-get update && apt-get install -y \
#     xvfb \
#     fluxbox \
#     x11vnc \
#     && rm -rf /var/lib/apt/lists/*

# # Set the working directory
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install Node.js dependencies
# RUN npm ci

# # Copy the rest of the application files
# COPY . .

# # Expose any necessary ports (if your application requires them)
# # EXPOSE 3000

# # Start the script with Xvfb
# CMD ["xvfb-run", "-a", "--server-args=-screen 0 1920x1080x24", "node", "index.js"]


# # Base image from Puppeteer's official image repository
# FROM ghcr.io/puppeteer/puppeteer:22.12.1

# # Switch to root user to install necessary packages
# USER root

# # Install necessary dependencies for Xvfb and Fluxbox
# RUN apt-get update && apt-get install -y \
#     xvfb \
#     fluxbox \
#     x11vnc \
#     && rm -rf /var/lib/apt/lists/*

# # Switch back to the original non-root user
# USER pptruser

# # Environment variables to skip Chromium download and set executable path
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# # Set the working directory
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install Node.js dependencies
# RUN npm ci

# # Copy the rest of the application files
# COPY . .

# # Start the script with Xvfb
# CMD ["xvfb-run", "-a", "--server-args=-screen 0 1920x1080x24", "node", "index.js"]

FROM ghcr.io/puppeteer/puppeteer:23.1.0

USER root

# Install necessary dependencies including Xvfb, Fluxbox, x11vnc, websockify, and git
RUN apt-get update && apt-get install -y \
    xvfb \
    fluxbox \
    x11vnc \
    websockify \
    git \
    && rm -rf /var/lib/apt/lists/*

# Clone noVNC to enable browser access through VNC over HTTP
RUN git clone https://github.com/novnc/noVNC.git /usr/share/novnc

# Switch back to the original non-root user
USER pptruser
# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

# Copy and install dependencies
COPY package*.json ./
RUN npm ci
COPY . .

# Start Fluxbox, Xvfb, x11vnc, and websockify for VNC access via noVNC
CMD fluxbox & \
    Xvfb :0 -screen 0 1920x1080x24 & \
    x11vnc -display :0 -nopw -forever & \
    websockify -D --web=/usr/share/novnc/ 8080 localhost:5900 & \
    node index.js
