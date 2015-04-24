## Codeship

```
# Set php version through phpenv. 5.3, 5.4 and 5.5 available
phpenv local 5.4
# Install extensions through Pecl
# yes yes | pecl install memcache
# Install dependencies through Composer
composer install --prefer-source --no-interaction
# By default we use the Node.js version set in your package.json or 0.10.25
# You can use nvm to install any Node.js version.
# i.e.: nvm install 0.10.25
nvm install 0.10.25
nvm use 0.10.25
npm config set cache "${HOME}/cache/npm/"
npm install
# Install grunt-cli for running your tests or other tasks
# npm install grunt-cli
npm install -g protractor
protractor --version
npm install bluebird
npm install -g jasmine-spec-reporter@"<2.0.0" --save-dev
npm install -g lodash
npm install --save lodash
webdriver-manager update
# Set app config
./scripts/ci/generate_env.sh
# Create database
./scripts/ci/build_db.sh
# Start Test server
# webdriver-manager start
nohup bash -c "php -S 127.0.0.1:8000 -t public 2>&1 &" && sleep 1; cat nohup.out
```

```
# npm test
# grunt test
protractor protractor.conf.js
```
