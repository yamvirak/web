FROM nginx:1.15.8-alpine

COPY ./dist/fuse/ /usr/share/nginx/html

