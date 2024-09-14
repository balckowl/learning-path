#バージョン20以上だとnpm run dev時に警告が出る
FROM node:lts-alpine3.19 as builder
WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install
RUN npm i prisma@5.19.0 @prisma/client@5.19.0
COPY . /app
RUN npx prisma generate
RUN npm run build


# 1. ランタイム環境の準備
FROM node:lts-alpine3.19 AS runtime

# 2. ワーキングディレクトリの設定
WORKDIR /app
COPY ./.env.production /app/.env.production
# 3. 必要なファイルをビルドステージからコピー
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma 

RUN npm install
RUN npx prisma generate
# 5. ポートの公開
EXPOSE 3000

# 6. アプリケーションの起動
CMD ["npm", "run" ,"start"]