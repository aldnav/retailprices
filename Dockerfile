# syntax=docker/dockerfile:1
FROM node:20-bookworm
ENV NODE_ENV=production
LABEL org.opencontainers.image.source=https://github.com/aldnav/retailprices
LABEL org.opencontainers.image.description="Get publicly available data at Department of Energy"

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci
RUN npx -y playwright install --with-deps

RUN mkdir -p reports
COPY playwright.config.ts .
COPY tests tests
EXPOSE 9323
RUN ["npm", "test"]