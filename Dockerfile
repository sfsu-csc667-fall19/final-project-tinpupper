FROM node:alpine
RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app/backend
RUN npm install
WORKDIR /usr/src/app/help
RUN npm install
RUN npm run build
EXPOSE 3004