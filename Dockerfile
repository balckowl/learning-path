#バージョン20以上だとnpm run dev時に警告が出る
FROM node:22-alpine3.19
WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install
RUN npm i prisma@5.19.0 @prisma/client@5.19.0
COPY . /app
# RUN npx prisma migrate dev
# CMD [ "npm", "run", "dev" ]
ENTRYPOINT [ "sh", "-c" ]
CMD ["npx prisma generate && npm run dev"]

# FROM node:22-alpine3.19
# WORKDIR /app
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install

# # ビルド結果をコピー
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/next.config.js ./next.config.js
# COPY --from=builder /app/package.json ./package.json
# ENTRYPOINT [ "sh", "-c" ]
# CMD ["npx", "prisma", "generate", "&&", "npm" ,"run", "start"]
