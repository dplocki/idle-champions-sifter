FROM node:19-alpine

WORKDIR /app

RUN npm install -g typescript
RUN npm install @types/node

COPY . /app/

CMD tsc *.ts --watch
