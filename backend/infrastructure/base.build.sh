VERSION=1.0.0-dev
IMAGE_TAG=ABCD
IMAGE_REPOSITORY=ABCDE

for COMMAND in "$@"
do
  case "${COMMAND}"
  in
    "base")
      VERSION=1.0.0
      IMAGE_TAG=vjtc0n/nest-base
      IMAGE_REPOSITORY=$IMAGE_TAG:$VERSION
    ;;
    
    "build")
      echo BUILD IMAGE: $IMAGE_REPOSITORY
      docker build --no-cache \
        -f ./Dockerfile.base -t $IMAGE_REPOSITORY ../
    ;;
    "push")
      docker push $IMAGE_REPOSITORY
    ;;
  esac
done
echo DONE AND DONE