From node:20-alpine

RUN apk add --no-cache redis

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

CMD redis-server --daemonize yes && node ./dist/server.js