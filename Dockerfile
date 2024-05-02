FROM node:20-alpine as base

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

COPY tsconfig.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]