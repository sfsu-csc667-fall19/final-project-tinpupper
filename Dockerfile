FROM node:alpine
RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app/backend
COPY package.json package.json
RUN npm install
WORKDIR /usr/src/app/help
COPY package.json package.json
RUN npm install
RUN npm run build
EXPOSE 3004