FROM node:alpine
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install http-server -g
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "http-server", "-P", "http://ermelan", "dist" ]
