FROM node:18
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apt-get update && apt-get install python3.10 -y

COPY . /VM
WORKDIR /VM
RUN yarn && yarn install && yarn run build

COPY ../near-discovery /near-discovery
WORKDIR /near-discovery
RUN pnpm remove near-social-vm && pnpm add file:../VM && pnpm i && pnpm build

EXPOSE 3000
CMD [ "pnpm", "start" ]
