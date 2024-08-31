#バージョン20以上だとnpm run dev時に警告が出る
FROM node:22-alpine3.19
WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install
RUN npm i prisma@5.18.0
COPY . /app
# RUN npx prisma migrate dev
# CMD [ "npm", "run", "dev" ]
ENTRYPOINT [ "sh", "-c" ]
CMD ["npx prisma migrate dev && npx prisma generate && npm run dev"]