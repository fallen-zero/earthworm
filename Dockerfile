# 使用Node.js官方Docker镜像作为基础镜像
FROM node:20.15.0-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json文件和package-lock.json文件
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 构建Next.js应用
RUN npm run build

# 暴露端口
EXPOSE 3000

# 启动Nginx并指定为前台进程
CMD ["npm", "run", "start"]