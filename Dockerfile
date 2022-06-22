# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/playwright:focal
ENV NODE_ENV=production

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production

COPY . .
RUN ["npm", "test"]