# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/playwright:v1.16.2-focal AS build
ENV NODE_ENV=production
LABEL org.opencontainers.image.source=https://github.com/aldnav/retailprices
LABEL org.opencontainers.image.description="Get publicly available data at Department of Energy"

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
RUN npm install @playwright/test
RUN npx playwright install

FROM build AS stage2
RUN mkdir -p reports
COPY playwright.config.ts .
COPY tests tests
EXPOSE 9323
RUN ["npm", "test"]