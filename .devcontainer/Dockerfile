#バージョン20以上だとnpm run dev時に警告が出る
FROM oven/bun:latest
WORKDIR /app
COPY ./package.json /app/package.json
RUN bun install
RUN bun install prisma@5.19.0 @prisma/client@5.19.0
COPY . /app
# RUN npx prisma migrate dev
CMD [ "bun", "run", "dev" ]
