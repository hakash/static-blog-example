FROM kitematic/hello-world-nginx:latest

#RUN cd /website_files
RUN mkdir /var/log/nginx/
RUN touch /var/log/nginx/error.log
RUN ["chmod", "+x", "/start.sh"]
COPY ./ /website_files
#RUN git clone https://github.com/hakash/static-blog-example.git .

EXPOSE 80
CMD ["/start.sh"]