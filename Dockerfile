FROM docker.io/node:8-stretch

# Install and build the application.
COPY . /app
WORKDIR /app

# Enable support for Chromium.
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get install -y chromium
ENV CHROME_BIN=chromium

# Run linters and unit tests.
RUN npm install \
    && npm run lint \
    && npm run coverage -- --browser ChromeHeadlessCI

# Install dependencies and run end-to-end tests.
# We're stuck with protractor@5.0.0 until webdriver-manager --detach works again
# https://github.com/angular/webdriver-manager/issues/212.
RUN apt-get install -y openjdk-8-jdk libgconf-2-4 \
    && apt-cache search jdk \
    && export JAVA_HOME=/usr/lib/jvm/java-8-openjdk \
    && export PATH=$PATH:/usr/lib/jvm/java-8-openjdk/bin \
    && npm install -g protractor@5.0.0 \
    && webdriver-manager update \
    && webdriver-manager start --seleniumPort 4444 --detach \
    && npm run e2e

# Build the production app.
RUN npm run build
