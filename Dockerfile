FROM node:18
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apt-get update && apt-get install python3.10 -y

######################### Start VM #########################
COPY VM/config /VM/config
COPY VM/src /VM/src
COPY VM/.babelrc /VM/.babelrc
COPY VM/package.json /VM/package.json
COPY VM/webpack.config.js /VM/webpack.config.js
COPY VM/yarn.lock /VM/yarn.lock
COPY VM/LICENSE /VM/LICENSE

WORKDIR /VM
RUN yarn && yarn install && yarn run build

######################### End VM #########################

######################### Start near-discovery #########################
COPY near-discovery/public /near-discovery/public
COPY near-discovery/src /near-discovery/src
COPY near-discovery/types /near-discovery/types
COPY near-discovery/.eslintrc.json /near-discovery/.eslintrc.json
COPY near-discovery/.nvmrc /near-discovery/.nvmrc
COPY near-discovery/.prettierrc /near-discovery/.prettierrc
COPY near-discovery/LICENSE /near-discovery/LICENSE
COPY near-discovery/next.config.js /near-discovery/next.config.js
COPY near-discovery/package.json /near-discovery/package.json
COPY near-discovery/pnpm-lock.yaml /near-discovery/pnpm-lock.yaml
COPY near-discovery/sentry.client.config.ts /near-discovery/sentry.client.config.ts
COPY near-discovery/sentry.edge.config.ts /near-discovery/sentry.edge.config.ts
COPY near-discovery/sentry.server.config.ts /near-discovery/sentry.server.config.ts
COPY near-discovery/tsconfig.json /near-discovery/tsconfig.json

WORKDIR /near-discovery
RUN pnpm remove near-social-vm && pnpm add file:../VM && pnpm i && pnpm build

COPY VM/.env.production /near-discovery/.env.production
COPY VM/entrypoint.sh /near-discovery/entrypoint.sh

EXPOSE 3000
ENV PORT 3000

ENTRYPOINT ["./entrypoint.sh"]
CMD ["node_modules/.bin/next", "start"]
######################### End near-discovery #########################
