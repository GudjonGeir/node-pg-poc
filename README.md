
To run tests
------------

```
docker run --rm -d -p 127.0.0.1:5432:5432 --name test-db -e "POSTGRES_HOST_AUTH_METHOD=trust" postgres:13
USER=postgres  ./node_modules/.bin/node-pg-migrate up

yarn test
```

### Init containers

Migration packaged with the deployment artifact. Init container runs before the main service container. With rolling update in kubernetes both the old and new version of service can be running after migration has been applied so backwards compatibility is important.


### Migration with separate deployment pipline

Run a separate deployment pipeline when a migration applied. Asynchronous and separate from service deployment pipeline. Could be run as a kubernetes job.

The need for backwards compatibility more obvious since migration is treated as a separate build artifact.

Does not block the deployment of the service if migration failed (Good or bad?)
