FROM node:alpine AS deps
RUN apk add --no-cache libc6-compat python3 build-base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build
# /app/out 디렉토리에서 index.html이랑 404.html을 제외한 모든 .html 파일의 확장자를 제거
RUN find /app/out -type f -name "*.html" -not -name "index.html" -not -name "404.html" -exec sh -c 'mv "$1" "${1%.html}"' _ {} \;
RUN ls -alh /app/out
