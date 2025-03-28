FROM node:18-bullseye

# Install Chromium & Chromedriver
RUN apt-get update && apt-get install -y wget curl unzip chromium \
    && wget -q "https://chromedriver.storage.googleapis.com/$(curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE)/chromedriver_linux64.zip" \
    && unzip chromedriver_linux64.zip && mv chromedriver /usr/local/bin/ && chmod +x /usr/local/bin/chromedriver

WORKDIR /app

COPY package.json /app/

RUN node --version

RUN npm install

COPY . .

CMD ["npm", "run", "testAllure"]