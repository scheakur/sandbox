# https://docs.docker.com/compose/rails/ を実行したときのログ

```console
# docker-compose run web rails new . --force --database=postgresql --skip-bundle
Creating network "dockercompose_default" with the default driver
Pulling db (postgres:latest)...
latest: Pulling from library/postgres
386a066cd84a: Already exists
e6dd80b38d38: Pull complete
9cd706823821: Pull complete
40c17ac202a9: Pull complete
7380b383ba3d: Pull complete
538e418b46ce: Pull complete
c3b9d41b7758: Pull complete
dd4f9522dd30: Pull complete
920e548f9635: Pull complete
628af7ef2ee5: Pull complete
211678575a06: Pull complete
Digest: sha256:3da198a1846d1fa6cf55978c8326d5c7e801155843c469ce9213cdbb25b5ae33
Status: Downloaded newer image for postgres:latest
Creating dockercompose_db_1
Building web
Step 1 : FROM ruby:2.2.0
2.2.0: Pulling from library/ruby
a3ed95caeb02: Pull complete
453d13af6c96: Pull complete
65bb55baec9b: Pull complete
dcb8d2043cc2: Pull complete
52f3d8b24a47: Pull complete
23a7d0052e00: Pull complete
75a6756e6a02: Pull complete
56162a215fa6: Pull complete
Digest: sha256:ac0c5befb1adfd9a8a2caed1193a7fd3f858b4e89c7a5460b37d3174069852e8
Status: Downloaded newer image for ruby:2.2.0
 ---> bc5beaf30723
Step 2 : RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
 ---> Running in 5d47d8a8d6f1
Reading package lists...
Building dependency tree...
Reading state information...
build-essential is already the newest version.
The following package was automatically installed and is no longer required:
  libbison-dev
Use 'apt-get autoremove' to remove it.
The following extra packages will be installed:
  libc-ares2 libpq5 libv8-3.14.5
Suggested packages:
  postgresql-doc-9.4
The following NEW packages will be installed:
  libc-ares2 libv8-3.14.5 nodejs
The following packages will be upgraded:
  libpq-dev libpq5
2 upgraded, 3 newly installed, 0 to remove and 206 not upgraded.
Need to get 2278 kB of archives.
After this operation, 7134 kB of additional disk space will be used.
Get:1 http://security.debian.org/ jessie/updates/main libc-ares2 amd64 1.10.0-2+deb8u1 [72.5 kB]
Get:2 http://http.debian.net/debian/ jessie/main libpq-dev amd64 9.4.9-0+deb8u1 [164 kB]
Get:3 http://http.debian.net/debian/ jessie/main libpq5 amd64 9.4.9-0+deb8u1 [124 kB]
Get:4 http://http.debian.net/debian/ jessie/main libv8-3.14.5 amd64 3.14.5.8-8.1 [1269 kB]
Get:5 http://http.debian.net/debian/ jessie/main nodejs amd64 0.10.29~dfsg-2 [648 kB]
debconf: delaying package configuration, since apt-utils is not installed
Fetched 2278 kB in 11s (202 kB/s)
(Reading database ... 27879 files and directories currently installed.)
Preparing to unpack .../libpq-dev_9.4.9-0+deb8u1_amd64.deb ...
Unpacking libpq-dev (9.4.9-0+deb8u1) over (9.4.0-1) ...
Preparing to unpack .../libpq5_9.4.9-0+deb8u1_amd64.deb ...
Unpacking libpq5:amd64 (9.4.9-0+deb8u1) over (9.4.0-1) ...
Selecting previously unselected package libc-ares2:amd64.
Preparing to unpack .../libc-ares2_1.10.0-2+deb8u1_amd64.deb ...
Unpacking libc-ares2:amd64 (1.10.0-2+deb8u1) ...
Selecting previously unselected package libv8-3.14.5.
Preparing to unpack .../libv8-3.14.5_3.14.5.8-8.1_amd64.deb ...
Unpacking libv8-3.14.5 (3.14.5.8-8.1) ...
Selecting previously unselected package nodejs.
Preparing to unpack .../nodejs_0.10.29~dfsg-2_amd64.deb ...
Unpacking nodejs (0.10.29~dfsg-2) ...
Setting up libpq5:amd64 (9.4.9-0+deb8u1) ...
Setting up libpq-dev (9.4.9-0+deb8u1) ...
Setting up libc-ares2:amd64 (1.10.0-2+deb8u1) ...
Setting up libv8-3.14.5 (3.14.5.8-8.1) ...
Setting up nodejs (0.10.29~dfsg-2) ...
update-alternatives: using /usr/bin/nodejs to provide /usr/bin/js (js) in auto mode
Processing triggers for libc-bin (2.19-13) ...
 ---> a7965e565ffc
Removing intermediate container 5d47d8a8d6f1
Step 3 : RUN mkdir /myapp
 ---> Running in e1fe0cc6bc41
 ---> 3e7ab0ad64cf
Removing intermediate container e1fe0cc6bc41
Step 4 : WORKDIR /myapp
 ---> Running in 40720950ec28
 ---> 731a3f9886fc
Removing intermediate container 40720950ec28
Step 5 : ADD Gemfile /myapp/Gemfile
 ---> 7c1d5eef9c89
Removing intermediate container 9057a0b35ff9
Step 6 : ADD Gemfile.lock /myapp/Gemfile.lock
 ---> 37238b3123b1
Removing intermediate container 0465cb157012
Step 7 : RUN bundle install
 ---> Running in ab673d73b04b
Don't run Bundler as root. Bundler can ask for sudo if it is needed, and
installing your bundle as root will break this application for all non-root
users on this machine.
Fetching gem metadata from https://rubygems.org/...........
Fetching additional metadata from https://rubygems.org/..
Resolving dependencies...
Installing rake 11.3.0
Installing i18n 0.7.0
Installing json 1.8.3
Installing minitest 5.9.1
Installing thread_safe 0.3.5
Installing tzinfo 1.2.2
Installing activesupport 4.2.0
Installing builder 3.2.2
Installing erubis 2.7.0
Installing mini_portile2 2.1.0
Installing nokogiri 1.6.8.1
Installing rails-deprecated_sanitizer 1.0.3
Installing rails-dom-testing 1.0.7
Installing loofah 2.0.3
Installing rails-html-sanitizer 1.0.3
Installing actionview 4.2.0
Installing rack 1.6.5
Installing rack-test 0.6.3
Installing actionpack 4.2.0
Installing globalid 0.3.7
Installing activejob 4.2.0
Installing mime-types-data 3.2016.0521
Installing mime-types 3.1
Installing mail 2.6.4
Installing actionmailer 4.2.0
Installing activemodel 4.2.0
Installing arel 6.0.3
Installing activerecord 4.2.0
Using bundler 1.7.12
Installing concurrent-ruby 1.0.2
Installing thor 0.19.1
Installing railties 4.2.0
Installing sprockets 3.7.0
Installing sprockets-rails 3.2.0
Installing rails 4.2.0
Your bundle is complete!
It was installed into /usr/local/bundle
 ---> 91a0d624ae1e
Removing intermediate container ab673d73b04b
Step 8 : ADD . /myapp
 ---> 46cb44c47dd3
Removing intermediate container f6a1cc233419
Successfully built 46cb44c47dd3
WARNING: Image for service web was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
       exist
      create  README.rdoc
      create  Rakefile
      create  config.ru
      create  .gitignore
       force  Gemfile
      create  app
      create  app/assets/javascripts/application.js
      create  app/assets/stylesheets/application.css
      create  app/controllers/application_controller.rb
      create  app/helpers/application_helper.rb
      create  app/views/layouts/application.html.erb
      create  app/assets/images/.keep
      create  app/mailers/.keep
      create  app/models/.keep
      create  app/controllers/concerns/.keep
      create  app/models/concerns/.keep
      create  bin
      create  bin/bundle
      create  bin/rails
      create  bin/rake
      create  bin/setup
      create  config
      create  config/routes.rb
      create  config/application.rb
      create  config/environment.rb
      create  config/secrets.yml
      create  config/environments
      create  config/environments/development.rb
      create  config/environments/production.rb
      create  config/environments/test.rb
      create  config/initializers
      create  config/initializers/assets.rb
      create  config/initializers/backtrace_silencers.rb
      create  config/initializers/cookies_serializer.rb
      create  config/initializers/filter_parameter_logging.rb
      create  config/initializers/inflections.rb
      create  config/initializers/mime_types.rb
      create  config/initializers/session_store.rb
      create  config/initializers/wrap_parameters.rb
      create  config/locales
      create  config/locales/en.yml
      create  config/boot.rb
      create  config/database.yml
      create  db
      create  db/seeds.rb
      create  lib
      create  lib/tasks
      create  lib/tasks/.keep
      create  lib/assets
      create  lib/assets/.keep
      create  log
      create  log/.keep
      create  public
      create  public/404.html
      create  public/422.html
      create  public/500.html
      create  public/favicon.ico
      create  public/robots.txt
      create  test/fixtures
      create  test/fixtures/.keep
      create  test/controllers
      create  test/controllers/.keep
      create  test/mailers
      create  test/mailers/.keep
      create  test/models
      create  test/models/.keep
      create  test/helpers
      create  test/helpers/.keep
      create  test/integration
      create  test/integration/.keep
      create  test/test_helper.rb
      create  tmp/cache
      create  tmp/cache/assets
      create  vendor/assets/javascripts
      create  vendor/assets/javascripts/.keep
      create  vendor/assets/stylesheets
      create  vendor/assets/stylesheets/.keep
```

```console
# ls
Dockerfile          README.rdoc         bin/                db/                 log/                tmp/
Gemfile             Rakefile            config/             docker-compose.yml  public/             vendor/
Gemfile.lock        app/                config.ru           lib/                test/
```

```console
# vim Gemfile
```

```console
# docker-compose build
db uses an image, skipping
Building web
Step 1 : FROM ruby:2.2.0
 ---> bc5beaf30723
Step 2 : RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
 ---> Using cache
 ---> a7965e565ffc
Step 3 : RUN mkdir /myapp
 ---> Using cache
 ---> 3e7ab0ad64cf
Step 4 : WORKDIR /myapp
 ---> Using cache
 ---> 731a3f9886fc
Step 5 : ADD Gemfile /myapp/Gemfile
 ---> 6b79f9e569b5
Removing intermediate container 30b5f134cb59
Step 6 : ADD Gemfile.lock /myapp/Gemfile.lock
 ---> 1f2e11a13be7
Removing intermediate container 4833a71183b9
Step 7 : RUN bundle install
 ---> Running in 7933557bf65c
Don't run Bundler as root. Bundler can ask for sudo if it is needed, and
installing your bundle as root will break this application for all non-root
users on this machine.
Fetching gem metadata from https://rubygems.org/...........
Fetching additional metadata from https://rubygems.org/..
Resolving dependencies...
Installing rake 11.3.0
Installing i18n 0.7.0
Installing json 1.8.3
Installing minitest 5.9.1
Installing thread_safe 0.3.5
Installing tzinfo 1.2.2
Installing activesupport 4.2.0
Installing builder 3.2.2
Installing erubis 2.7.0
Installing mini_portile2 2.1.0
Installing nokogiri 1.6.8.1
Installing rails-deprecated_sanitizer 1.0.3
Installing rails-dom-testing 1.0.7
Installing loofah 2.0.3
Installing rails-html-sanitizer 1.0.3
Installing actionview 4.2.0
Installing rack 1.6.5
Installing rack-test 0.6.3
Installing actionpack 4.2.0
Installing globalid 0.3.7
Installing activejob 4.2.0
Installing mime-types-data 3.2016.0521
Installing mime-types 3.1
Installing mail 2.6.4
Installing actionmailer 4.2.0
Installing activemodel 4.2.0
Installing arel 6.0.3
Installing activerecord 4.2.0
Installing debug_inspector 0.0.2
Installing binding_of_caller 0.7.2
Using bundler 1.7.12
Installing byebug 9.0.6
Installing coffee-script-source 1.10.0
Installing execjs 2.7.0
Installing coffee-script 2.4.1
Installing thor 0.19.1
Installing railties 4.2.0
Installing coffee-rails 4.1.1
Installing concurrent-ruby 1.0.2
Installing multi_json 1.12.1
Installing jbuilder 2.6.0
Installing jquery-rails 4.2.1
Installing libv8 3.16.14.17
Installing pg 0.19.0
Installing sprockets 3.7.0
Installing sprockets-rails 3.2.0
Installing rails 4.2.0
Installing rdoc 4.3.0
Installing ref 2.0.0
Installing sass 3.4.22
Installing tilt 2.0.5
Installing sass-rails 5.0.6
Installing sdoc 0.4.2
Installing spring 2.0.0
Installing therubyracer 0.12.2
Installing turbolinks-source 5.0.0
Installing turbolinks 5.0.1
Installing uglifier 3.0.3
Installing web-console 2.3.0
Your bundle is complete!
It was installed into /usr/local/bundle
 ---> 43b8c0dc847f
Removing intermediate container 7933557bf65c
Step 8 : ADD . /myapp
 ---> 4666d9ed345b
Removing intermediate container 9f162f3bb088
Successfully built 4666d9ed345b
```

```console
# vim config/database.yml
```

```console
# docker-compose up
dockercompose_db_1 is up-to-date
Creating dockercompose_web_1
Attaching to dockercompose_db_1, dockercompose_web_1
db_1   | The files belonging to this database system will be owned by user "postgres".
db_1   | This user must also own the server process.
db_1   |
db_1   | The database cluster will be initialized with locale "en_US.utf8".
db_1   | The default database encoding has accordingly been set to "UTF8".
db_1   | The default text search configuration will be set to "english".
db_1   |
db_1   | Data page checksums are disabled.
db_1   |
db_1   | fixing permissions on existing directory /var/lib/postgresql/data ... ok
db_1   | creating subdirectories ... ok
db_1   | selecting default max_connections ... 100
db_1   | selecting default shared_buffers ... 128MB
db_1   | selecting dynamic shared memory implementation ... posix
db_1   | creating configuration files ... ok
db_1   | running bootstrap script ... ok
db_1   | performing post-bootstrap initialization ... ok
db_1   | syncing data to disk ... ok
db_1   |
db_1   | WARNING: enabling "trust" authentication for local connections
db_1   | You can change this by editing pg_hba.conf or using the option -A, or
db_1   | --auth-local and --auth-host, the next time you run initdb.
db_1   |
db_1   | Success. You can now start the database server using:
db_1   |
db_1   |     pg_ctl -D /var/lib/postgresql/data -l logfile start
db_1   |
db_1   | ****************************************************
db_1   | WARNING: No password has been set for the database.
db_1   |          This will allow anyone with access to the
db_1   |          Postgres port to access your database. In
db_1   |          Docker's default configuration, this is
db_1   |          effectively any other container on the same
db_1   |          system.
db_1   |
db_1   |          Use "-e POSTGRES_PASSWORD=password" to set
db_1   |          it in "docker run".
db_1   | ****************************************************
db_1   | waiting for server to start....LOG:  database system was shut down at 2016-11-21 05:39:52 UTC
db_1   | LOG:  MultiXact member wraparound protections are now enabled
db_1   | LOG:  database system is ready to accept connections
db_1   | LOG:  autovacuum launcher started
db_1   |  done
db_1   | server started
db_1   | ALTER ROLE
db_1   |
db_1   |
db_1   | /docker-entrypoint.sh: ignoring /docker-entrypoint-initdb.d/*
db_1   |
db_1   | LOG:  received fast shutdown request
db_1   | LOG:  aborting any active transactions
db_1   | LOG:  autovacuum launcher shutting down
db_1   | LOG:  shutting down
db_1   | waiting for server to shut down....LOG:  database system is shut down
db_1   |  done
db_1   | server stopped
db_1   |
db_1   | PostgreSQL init process complete; ready for start up.
db_1   |
db_1   | LOG:  database system was shut down at 2016-11-21 05:39:53 UTC
db_1   | LOG:  MultiXact member wraparound protections are now enabled
db_1   | LOG:  database system is ready to accept connections
db_1   | LOG:  autovacuum launcher started
web_1  | [2016-11-21 05:49:24] INFO  WEBrick 1.3.1
web_1  | [2016-11-21 05:49:24] INFO  ruby 2.2.0 (2014-12-25) [x86_64-linux]
web_1  | [2016-11-21 05:49:24] INFO  WEBrick::HTTPServer#start: pid=1 port=3000
```