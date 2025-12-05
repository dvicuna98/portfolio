FROM node:23.0-alpine AS dependency-base

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

COPY package-lock.json .

FROM dependency-base AS production-base

RUN npm ci

COPY . .

ARG EMAILJS_SERVICE_ID
ARG EMAILJS_PUBLIC_KEY
ARG EMAILJS_TEMPLATE_ID

ENV EMAILJS_SERVICE_ID=$EMAILJS_SERVICE_ID \
    EMAILJS_PUBLIC_KEY=$EMAILJS_PUBLIC_KEY \
    EMAILJS_TEMPLATE_ID=$EMAILJS_TEMPLATE_ID

RUN npm run build \
&& npm prune --production

# ---- Production stage ----
FROM nginx:stable-alpine AS production

# Copy the built frontend from the previous stage
COPY --from=production-base /app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx

CMD ["nginx", "-g", "daemon off;"]

