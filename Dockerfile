FROM oven/bun:alpine
WORKDIR /app
COPY . .
# RUN npm run build
RUN bun install
CMD ["bun", "run", "dev"]
EXPOSE 3000
