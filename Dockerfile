FROM node:lts-alpine

COPY . /app

WORKDIR /app

RUN npm i --force

RUN npm build

CMD ["npm", "start"]
