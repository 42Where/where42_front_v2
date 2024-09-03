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
# html 폴더를 생성해서 /app/out 디렉토리에 있는 모든 .html 파일을 html 폴더에 이동
RUN mkdir /app/out/html
RUN mv /app/out/*.html /app/out/html
RUN mkdir /app/out/assets
# /app/out 디렉토리에서 html 폴더를 제외한 모든 파일을 /app/out/assets 디렉토리로 이동
RUN mv /app/out/* /app/out/assets
RUN mv /app/out/assets/html /app/out
# /app/out/html 디렉토리에서 index.html이랑 404.html을 제외한 모든 .html 파일의 확장자를 제거
RUN find /app/out/html -type f -name "*.html" -not -name "index.html" -not -name "404.html" -exec sh -c 'mv "$1" "${1%.html}"' _ {} \;
RUN ls -alh /app/out
