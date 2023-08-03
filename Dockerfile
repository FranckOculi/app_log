FROM node:18.12.1
WORKDIR /app
COPY public /app/public
COPY src /app/src
COPY .db.sqlite .
COPY knexfile.js .
RUN yarn install
EXPOSE 8080
CMD ["node", "/usr/src/app/src/server.js"]