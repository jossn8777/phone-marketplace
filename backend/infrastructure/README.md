# @Deployment

Make sure that you have your account along with Docker

## Build Base Image

```
./base.build.sh base build
```

Push to DockerHub

```
./base.build.sh base push
```

## Build App Image

[staging] can be changed to [prod]

```
./app.build.sh staging build
```

Push to DockerHub

```
./app.build.sh staging push
```