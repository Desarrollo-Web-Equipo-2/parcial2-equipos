##
## Build
##
FROM node:18-bookworm AS build

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build


##
## Production
##
FROM node:18-bookworm AS production

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install --omit=dev

COPY --from=build /app/dist /app/

CMD ["node", "app.js"]