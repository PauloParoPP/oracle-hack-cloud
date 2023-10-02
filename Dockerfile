FROM node:alpine

WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
COPY . ./

CMD ["yarn", "start"]
