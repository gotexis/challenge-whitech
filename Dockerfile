FROM node:14-alpine

ENV NODE_ENV production

EXPOSE 4000

WORKDIR /whitech

COPY . .

RUN yarn install --production=false

RUN yarn build:server

CMD ["yarn", "start:server"]
