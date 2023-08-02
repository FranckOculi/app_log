FROM node:18.12.1
WORKDIR /usr/src/app
COPY public ./public
COPY src ./src
COPY .db.sqlite .
COPY knexfile.js .
RUN yarn install
EXPOSE 8080
CMD ["node", "/usr/src/app/src/server.js"]