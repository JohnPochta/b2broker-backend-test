FROM --platform=linux/amd64 node:18-alpine

WORKDIR /var/www/html

RUN apk add git \
  netcat-openbsd

COPY package*.json /var/www/html/
RUN npm ci --force

COPY . /var/www/html

RUN npm run build

CMD ["npm", "run", "start:prod"] 