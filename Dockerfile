FROM node:21-alpine

WORKDIR /app
RUN apk update && apk upgrade && apk add bash git vim --no-cache
RUN npm install next@latest react@latest react-dom@latest

CMD NODE_OPTIONS=--max-old-space-size=4096 npm install; npm run dev;
