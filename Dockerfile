FROM node:latest
LABEL maintainer "Rafael Fonseca <rfonseca85@yahoo.ca>"
WORKDIR /app
ADD . .
RUN npm install
EXPOSE 3000
ENTRYPOINT [ "npm", "run","start" ]