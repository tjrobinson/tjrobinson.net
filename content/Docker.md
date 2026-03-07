# Docker

## Running with networking disabled

To run a container with networking disabled:

```bash
docker run --rm -dit --network none --name [container-name] [image-name]
```

- `docker run` is the command to run a Docker container.
- `--rm` is an option that automatically removes the container when it exits. This is useful for temporary or disposable containers.
- `-d` is an option that runs the container in the background (detached mode).
- `-it` is a combination of two options: `-i` for interactive mode and `-t` for allocating a pseudo-TTY. This allows you to interact with the container's command prompt.

Overall, the command `docker run --rm -dit` creates and starts a Docker container in the background, with an interactive shell that you can access.
