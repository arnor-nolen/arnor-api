FROM node:14.10.1-alpine3.11 as base

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent --only=prod

COPY . ./

ENTRYPOINT [ "npm", "run", "prod"]