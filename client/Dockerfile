FROM node:18.19.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN ng build --configuration=production

FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/global-bilgi-example/browser /usr/share/nginx/html

EXPOSE 4200
