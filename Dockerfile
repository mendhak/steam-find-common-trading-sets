FROM node:14-alpine AS build

WORKDIR /app
COPY . /app

RUN set -ex \
  && npm install --production \
  && rm package* \
  && chown -R node:node /app

FROM node:14-alpine AS final
WORKDIR /app
COPY --from=build /app /app
USER 1000
ENTRYPOINT ["node", "./findcommon.js"]