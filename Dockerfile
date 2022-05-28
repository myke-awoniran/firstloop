FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

USER node

CMD ['npm','start']

EXPOSE 8000