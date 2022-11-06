FROM node:14
WORKDIR /usr

COPY *.json ./
COPY src ./src

RUN npm install
RUN npm run build:prod

EXPOSE 3200
CMD ["node","dist/index.js"]