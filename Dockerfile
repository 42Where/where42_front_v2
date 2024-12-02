FROM node:alpine AS deps
# 의존성 넣어서 실행하면 137.6s
# RUN apk add libc6-compat python3 build-base
# 의존성 없이 실행하면 109.8s. 제거해도 이상 없는 것 같으니 제거
WORKDIR /app
# package.json과 package-lock.json을 먼저 복사해서 캐시 활용
COPY package.json package-lock.json ./
RUN npm install

FROM node:alpine AS builder
WORKDIR /app
# 의존성 설치 후 나머지 파일 복사
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# html 폴더 생성, 파일 이동 및 확장자 제거를 하나의 스크립트로 통합
RUN mkdir -p /app/out/html /app/assets \
    && mv /app/out/*.html /app/out/html \
    && mv /app/out/* /app/assets \
    && mv /app/assets/html /app/out \
    && mv /app/assets /app/out \
    && find /app/out/html -type f -name "*.html" -not -name "index.html" -not -name "404.html" -exec sh -c 'mv "$1" "${1%.html}"' _ {} \;

RUN ls -alh /app/out
