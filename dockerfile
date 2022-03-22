FROM node
#Install git
# RUN apk --no-cache add git
# RUN apt update && apt install git

ARG REPO=https://github.com/pedrobzz/formulario-adesivos.git
RUN git clone ${REPO}

# RUN cd formulario-adesivos

WORKDIR /formulario-adesivos
# COPY ./ /usr/app
RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]