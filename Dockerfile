FROM node:lts-alpine

COPY . /app

WORKDIR /app

RUN npm i --force

RUN npm run build

CMD ["npm", "run", "start"]
