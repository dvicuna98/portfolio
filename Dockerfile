FROM node:23.0-alpine AS dependency-base

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

COPY package-lock.json .

FROM dependency-base AS production-base

RUN npm ci

COPY . .

# Mount the secrets only for this RUN
RUN --mount=type=secret,id=EMAILJS_SERVICE_ID \
    --mount=type=secret,id=EMAILJS_PUBLIC_KEY \
    --mount=type=secret,id=EMAILJS_TEMPLATE_ID \
    sh -c '
      export EMAILJS_SERVICE_ID="$(cat /run/secrets/EMAILJS_SERVICE_ID)" && \
      export EMAILJS_PUBLIC_KEY="$(cat /run/secrets/EMAILJS_PUBLIC_KEY)" && \
      export EMAILJS_TEMPLATE_ID="$(cat /run/secrets/EMAILJS_TEMPLATE_ID)" && \
      npm run build && \
      npm prune --production
    '

# ---- Production stage ----
FROM nginx:stable-alpine AS production

# Copy the built frontend from the previous stage
COPY --from=production-base /app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx

CMD ["nginx", "-g", "daemon off;"]


