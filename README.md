
To run tests
------------

```
docker run --rm -d -p 127.0.0.1:5432:5432 --name test-db -e "POSTGRES_HOST_AUTH_METHOD=trust" postgres:13

yarn test
```
