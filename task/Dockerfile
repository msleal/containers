FROM ubuntu:18.04

MAINTAINER Marcelo Leal <msl@eall.com.br>
ENV DEBIAN_FRONTEND noninteractive

#install dbus and audio support
RUN apt-get update &&\
	apt-get -y install freerdp-x11 xvfb x11-xkb-utils xfonts-100dpi\
        xfonts-75dpi xfonts-scalable xfonts-cyrillic x11-apps &&\
        rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#make home directory for user user
RUN export uid=1000 gid=1000 &&\
    mkdir -p /home/architect &&\
    echo "architect:x:${uid}:${gid}:architect User,,,:/home/architect:/bin/bash" >> /etc/passwd &&\
    echo "architect:x:${uid}:" >> /etc/group &&\
    chown ${uid}:${gid} -R /home/architect

COPY task.sh /home/architect/
RUN chmod +x /home/architect/task.sh

USER architect

CMD ["/home/architect/task.sh"]
