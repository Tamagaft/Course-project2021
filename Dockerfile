FROM node:14

WORKDIR /app

COPY . .

RUN npm install 
RUN npm rebuild bcrypt --build-from-source


EXPOSE 3000

CMD ["node", "app.js"]