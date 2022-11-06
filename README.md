docker build . -t playlist-maker-back:v1

docker tag playlist-maker-back:v1 gcr.io/portfolio-367220/playlist-maker-back:v1

docker push gcr.io/portfolio-367220/playlist-maker-back:v1