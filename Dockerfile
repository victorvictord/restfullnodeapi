FROM node:19-alpine as build

WORKDIR /usr/src/app

COPY package*.json .

RUN npm i

COPY . .

RUN npm run build

RUN npm uninstall bcrypt

RUN npm install bcrypt

FROM node:19-alpine as development

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /usr/src/app/dist ./dist

CMD ["npm","run","dev"]