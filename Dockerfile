# Usa a imagem oficial do Node.js como base
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /main

# Copia apenas os arquivos de dependência primeiro
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta usada pela aplicação
EXPOSE 3000

# Comando padrão para iniciar o servidor
CMD ["npm", "start"]
