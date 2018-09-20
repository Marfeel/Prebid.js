FROM node:8.10.0

CMD exec /bin/bash -c "trap : TERM INT; sleep infinity & wait"

RUN echo "    StrictHostKeyChecking no" >> /etc/ssh/ssh_config

# Chrome.
ARG CHROME_VERSION="google-chrome-stable"
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  && apt-get update -qqy \
  && apt-get -y install ${CHROME_VERSION:-google-chrome-stable} \
  && rm /etc/apt/sources.list.d/google-chrome.list \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

RUN groupadd -g 1004 jenkins && \
    useradd -d /home/jenkins -m -r -u 1004 -g jenkins jenkins && \
    mkdir -p /home/jenkins/.ssh/ && chown -R jenkins:jenkins /home/jenkins/.ssh/
USER jenkins
