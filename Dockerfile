FROM node:20-alpine AS angular

WORKDIR /frontendapp

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html
COPY --from=angular /frontendapp/dist/byte-bazaar .

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
