FROM ubuntu:18.04

MAINTAINER Marcelo Leal <msl@eall.com.br>
ENV DEBIAN_FRONTEND noninteractive

#First install wget...
RUN apt-get update && apt-get -y install wget sudo gnupg
RUN echo "deb http://pub.freerdp.com/repositories/deb/bionic/ freerdp-nightly main" >> /etc/apt/sources.list

#Now lets install the other packages...
RUN wget -O - http://pub.freerdp.com/repositories/ADD6BF6D97CE5D8D.asc | sudo apt-key add - 
RUN apt-get update &&\
	apt-get -y install freerdp-nightly xvfb x11-xkb-utils xfonts-100dpi\
        xfonts-75dpi xfonts-scalable xfonts-cyrillic x11-apps &&\
        rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#make home directory for user...
RUN export uid=1000 gid=1000 &&\
    mkdir -p /home/architect &&\
    echo "architect:x:${uid}:${gid}:architect User,,,:/home/architect:/bin/bash" >> /etc/passwd &&\
    echo "architect:x:${uid}:" >> /etc/group &&\
    chown ${uid}:${gid} -R /home/architect

COPY task.sh /home/architect/

RUN chown -R architect:architect /home/architect/
RUN chmod +x /home/architect/task.sh

USER architect

CMD ["/home/architect/task.sh"]
