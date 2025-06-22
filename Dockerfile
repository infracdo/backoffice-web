# get the base node image
FROM node:14.18.1

#Create app directory
WORKDIR /app

RUN npm install serve

#Bundle app source
COPY . .

# expose the port
EXPOSE  5552

CMD [ "./node_modules/serve/build/main.js", "-s", "build/", "-p", "5552"]
