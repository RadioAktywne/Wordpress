FROM mysql:8.0.29-debian

WORKDIR /app/

COPY ./src/ ./src/
RUN chmod +x ./src/start.sh

COPY ./cfg/ ./cfg/

ENV DATABASE_ROOT_PASSWORD=password \
    DATABASE_USER=user \
    DATABASE_PASSWORD=password \
    DATABASE_NAME=database

EXPOSE 20001

ENTRYPOINT ["./src/start.sh"]
CMD []
