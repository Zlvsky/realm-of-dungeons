FROM node:20.10.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

EXPOSE 8080
EXPOSE 80
EXPOSE 443

RUN apt-get update && \
    apt-get install -y certbot && \
    apt-get install -y cron

COPY docker-entrypoint.sh ./

RUN chmod +x docker-entrypoint.sh

CMD [ "./docker-entrypoint.sh" ]