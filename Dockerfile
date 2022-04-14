FROM node:fermium-alpine as dev

RUN apk --update add postgresql-client

WORKDIR /inc/src/app
COPY package*.json ./

RUN npm install

# RUN npm install glob rimraf

COPY . .

RUN npm run build

FROM node:fermium-alpine as prod

LABEL "website.name"="geeksforgeeks website"
LABEL "website.tutorial-name"="docker"


RUN apk --update add postgresql-client

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /inc/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

COPY --from=dev /inc/dist ./dist

EXPOSE 3000:3000

CMD ["node", "dist/main"]