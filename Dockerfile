# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/playwright:v1.16.2-focal
ENV NODE_ENV=production

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
RUN npm install @playwright/test
RUN npx playwright install

RUN mkdir -p reports
# COPY . .  # Disable for local development?
EXPOSE 9323
RUN ["npm", "test"]