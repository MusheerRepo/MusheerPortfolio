FROM node:18-bullseye

WORKDIR /app

COPY package.json /app/

RUN node --version

RUN npm install

COPY . .

CMD ["npm", "run", "testAllure"]