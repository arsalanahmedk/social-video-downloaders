FROM node:22-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
      python3 python3-pip ffmpeg ca-certificates \
    && pip3 install --no-cache-dir --break-system-packages -U yt-dlp \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

ENV NODE_ENV=production
EXPOSE 10000
CMD ["sh", "-c", "npm start -- -H 0.0.0.0 -p ${PORT:-10000}"]
