FROM node:12-alpine

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY src ./src

RUN yarn install
RUN yarn install --prod --modules-folder build/node_modules
RUN yarn run build