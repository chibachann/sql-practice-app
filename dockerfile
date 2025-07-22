FROM node:20

# 作業ディレクトリを明示
WORKDIR /app

# 依存インストール（キャッシュ効かせるため package*.json だけ先にコピー）
COPY package*.json ./
RUN npm install

# ソースコードをコピー（必要ファイルだけに制限してもOK）
COPY . .

# デフォルトコマンド（docker-composeと整合）
CMD ["npm", "start"]
