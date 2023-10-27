FROM traefik:v2.10.5

# hadolint ignore=DL3018
RUN apk add --no-cache \
    gettext-envsubst \
    moreutils

WORKDIR /app/

COPY ./src/ ./src/
RUN chmod +x ./src/start.sh

COPY ./cfg/ ./cfg/

ENV TRAEFIK_WEB_HOST=localhost \
    TRAEFIK_WEB_PORT=20003 \
    TRAEFIK_WORDPRESS_HOST=localhost \
    TRAEFIK_WORDPRESS_PORT=80

EXPOSE 20000

ENTRYPOINT ["./src/start.sh"]
CMD []
