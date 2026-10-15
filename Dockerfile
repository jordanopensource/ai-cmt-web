ARG NODE_VERSION=24 PNPM_VERSION=12.6.0 USER=node WORKSPACE_PATH=/workspace APP_PATH=/app

FROM node:${NODE_VERSION} AS builder

ARG WORKSPACE_PATH
ARG PNPM_VERSION

RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR $WORKSPACE_PATH
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

# nuxt prepare needs the sources (app/, content/, i18n/, server/, public/)
COPY . .
RUN pnpm run postinstall

RUN NODE_ENV=production pnpm run build

FROM node:${NODE_VERSION}-slim

ARG APP_PATH
ARG WORKSPACE_PATH
ARG USER=node

WORKDIR ${APP_PATH}
COPY --from=builder --chown=${USER}:${USER} ${WORKSPACE_PATH}/package.json ${APP_PATH}/package.json
COPY --from=builder --chown=${USER}:${USER} ${WORKSPACE_PATH}/.output ${APP_PATH}/.output

USER ${USER}

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD [ "node", "/app/.output/server/index.mjs" ]
