#########################
### build environment ###
### Ref: https://github.com/avatsaev/angular4-docker-example
### http://mherman.org/blog/2018/02/26/dockerizing-an-angular-app/#.WuLSdNNuaL4 
#########################

# base image
FROM node:9.11.2 as builder

# set working directory
RUN mkdir /app
WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install
RUN yarn global add @angular/cli@6.0.1 --unsafe

# add app
COPY . /app

# Build the angular app in production mode and store the artifacts in dist folder
RUN yarn run build

##################
### production ###
##################

# base image
FROM nginx:1.13.9-alpine

# copy artifact build from the 'build environment'
COPY --from=builder /app/dist/cloudman-ui /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]