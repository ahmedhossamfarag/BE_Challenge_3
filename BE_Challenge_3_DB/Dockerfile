FROM node:14

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "server.ts"]

# docker build --help .
# docker build -t myfirstda .
# docker images
# docker run -d -p 8080:8080 --name=hello myfirstda
# docker ps
# docker ps -a
# docker stop <container-id>
# dock start <container-id>
# dock rm <container-id>
# dock image rm myfirstda
# CNTR + c