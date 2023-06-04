FROM node:lts-alpine

COPY . /app

WORKDIR /app

RUN npm i

RUN npm build

CMD ["npm", "start"]
