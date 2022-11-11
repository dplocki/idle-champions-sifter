FROM node:19-alpine

WORKDIR /app

RUN npm install -g typescript

COPY . /app/

CMD tsc *.ts --watch
