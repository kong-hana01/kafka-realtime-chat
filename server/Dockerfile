FROM node:14-alpine as base

WORKDIR /src
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
COPY package.json /src/
RUN npm ci
COPY . /src/
CMD ["node", "bin/www"]

FROM base as dev

ENV NODE_ENV=development
RUN npm install -g nodemon
COPY package.json /src/
RUN npm install
CMD ["nodemon", "bin/www"]