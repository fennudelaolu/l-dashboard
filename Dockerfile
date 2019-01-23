#导入nginx镜像
FROM nginx:1.13.7

#把当前打包工程的html复制到虚拟地址
#ADD app/index.html   /usr/share/nginx/html
#ADD app/static   /usr/share/nginx/static
ADD app/dist   /usr/share/nginx/
#使用自定义nginx.conf配置端口和监听
COPY nginx.config /etc/nginx/nginx.conf

RUN /bin/bash -c 'echo init ok!!!'
