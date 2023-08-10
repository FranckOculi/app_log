FROM node:18.12.1

WORKDIR /app

COPY public /public

COPY src /src

COPY .db.sqlite .

COPY knexfile.js .

RUN yarn

CMD ["yarn", "start"]