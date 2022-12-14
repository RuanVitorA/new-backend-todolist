FROM node:17.7.1 AS installer
WORKDIR /app
COPY . . 
RUN rm -rf node_modules
RUN npm install

FROM node:17-alpine
WORKDIR /app
COPY --from=installer /app ./
CMD ["npm", "run", "dev"]
