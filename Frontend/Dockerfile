FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine
COPY --from=0 /app/build /usr/share/ngnix/html

EXPOSE 80

CMD ["ngnix", "-g", "demon off;"]
