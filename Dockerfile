FROM node:18

USER node
WORKDIR /usr/src/app

COPY package*.json tsconfig*.json ./
RUN npm install --force
COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]