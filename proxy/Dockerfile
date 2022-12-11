ARG TRAEFIK_IMAGE_TAG=v3.0

FROM traefik:$TRAEFIK_IMAGE_TAG

WORKDIR /app

COPY ./ ./
RUN chmod +x ./start.sh

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["./start.sh"]
CMD []
