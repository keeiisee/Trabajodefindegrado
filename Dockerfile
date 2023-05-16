FROM node:18.16.0

EXPOSE 5173

WORKDIR /home/node

COPY --chown=node:node fronted .

RUN yarn install

USER node

CMD ["tail", "-f", "/dev/null"]
