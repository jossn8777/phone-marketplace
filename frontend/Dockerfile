FROM node:16-alpine3.11

WORKDIR /usr/src/app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 8000/tcp

CMD ["yarn", "start"]