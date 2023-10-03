## Comando obrigatório
## Baixa a imagem do node com versão alpine (versão mais simplificada e leve)
FROM node:alpine

## Define o local onde o app vai ficar no disco do container
## Pode ser o diretório que você quiser
WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH

## Copia os arquivos package e yarn .json para dentro da pasta /frontend
COPY package.json ./
COPY yarn.lock ./

## Executa yarn install para adicionar as dependências
RUN yarn install

## Copia tudo que está no diretório onde o arquivo Dockerfile está
## para dentro da pasta /frontend do container
COPY . ./

## Container ficará ouvindo os acessos na porta 3000
EXPOSE 3000

## Executa o comando yarn start para iniciar o app
CMD yarn start

