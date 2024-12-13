#envファイルを環境変数に追加
export $(grep -v '^#' .env | xargs)


docker build \
--build-arg NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
# --build-arg NEXT_PUBLIC_API_ANON_KEY=$NEXT_PUBLIC_API_ANON_KEY \
--build-arg DATABASE_URL=$DATABASE_URL \
-t learning-path:1.1.1 \
-f Dockerfile.standalone .


docker run \
-e NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
-e NEXT_PUBLIC_API_ANON_KEY=$NEXT_PUBLIC_API_ANON_KEY \
-e NEXTAUTH_SECRET=$NEXTAUTH_SECRET \
-e DATABASE_URL=$DATABASE_URL \
-e GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID \
-e NEXTAUTH_SECRET=$GITHUB_CLIENT_SECRET \
-e BASE_URL=http://localhost:3000 \
-e NEXTAUTH_URL=http://localhost:3000 -it --name learning-path -p 3000:3000 learning-path:1.1.1
