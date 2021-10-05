FROM node:lts-alpine3.14 AS builder
WORKDIR /www/node
COPY ./package.json ./yarn.lock ./
RUN yarn install --production \
    #npm install --only=production \
    && npm install -g @nestjs/cli
COPY ./project /www/node/
#进行生产构建
RUN yarn run build

FROM node:lts-alpine3.14
ENV NODE_ENV=production
WORKDIR /www/server
COPY ./package.json ./yarn.lock ./
RUN yarn install --production
# COPY --from=builder /www/node/node_modules /www/server/node_modules
COPY --from=builder /www/node/dist /www/server
EXPOSE 3000
CMD ["node","main.js"]

#如果运行或者构建过程中产生依赖缺失错误，可能是部分运行时依赖包被归类到dev开发时依赖
