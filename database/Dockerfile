ARG MYSQL_IMAGE_TAG=8.0.29-debian

FROM mysql:$MYSQL_IMAGE_TAG

WORKDIR /app

COPY ./start.sh ./start.sh
RUN chmod +x ./start.sh

COPY ./config.cnf ./config.cnf

ENV DATABASE_ROOT_PASSWORD=password \
    DATABASE_NAME=database \
    DATABASE_USER=user \
    DATABASE_PASSWORD=password

EXPOSE 3306

ENTRYPOINT ["./start.sh"]
CMD []
