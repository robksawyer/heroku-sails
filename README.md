# heroku-sails-pg-test

This is a simple example of getting the new [sails.js](http://sailsjs.com/)
code running on [heroku](http://www.heroku.com) using [PostgreSQL](http://www.postgresql.org) as its database. 

"Sails automatically builds a RESTful JSON API for your models. And here's the thing,
it supports HTTP and WebSockets. By default, for every controller you create, 
you get the basic CRUD operations created automatically."

* http://heroku-sails-pg-test.herokuapp.com/user
* https://heroku-sails-pg-test.herokuapp.com/APIKEY/user
* https://heroku-sails-pg-test.herokuapp.com/APIKEY/user/create?name=Chad
* https://heroku-sails-pg-test.herokuapp.com/APIKEY/user/update/51605c1d9491790200000001?name=Sam

More examples at [sails.js](http://sailsjs.com/).

## Setup

Could not be easier to setup your own API server using sails.js, node, postgres, and heroku.

Short version:  

1. Install sails globally `sudo npm install -g sails`
1. Create sails folder `sails new heroku-sails-pg-test`
1. Add to git: `cd heroku-sails-pg-test && git init && git add . && git commit`
1. Look at the git commit history for other changes made - there's only a few 

If you have not yet, create heroku account and install [heroku toolbelt](https://toolbelt.heroku.com/).

Then create a heroku app. See the following example:

	$ heroku apps:create YOUR-APP-NAME-HERE
	Creating YOUR-APP-NAME-HERE... done, region is us
	http://YOUR-APP-NAME-HERE.herokuapp.com/ | git@heroku.com:YOUR-APP-NAME-HERE.git
	Git remote heroku added


Add postgres db. There's a good introduction to PostgreSQL via the article [Getting Started with NodeJS](https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database)

	$ heroku addons:add heroku-postgresql:dev
	Adding heroku-postgresql:dev... done, v3 (free)


Optionally set the api key. If you don't, key check will be skipped and anyone can created/edit.
Note that we what you set here is what is sent in URL.  For more on this authentication,
[Read lib/authenKey.js](lib/authenKey.js)

	$ heroku config:set APPROVED_API_KEY=APIKEY
	Setting config vars and restarting heroku-sails... done
	APPROVED_API_KEY: APIKEY


Optionally add papertrail, lets you view logs from a browser:

	$ heroku addons:add papertrail
	Adding papertrail on heroku-sails-pg-test... done, v4 (free)
	Welcome to Papertrail. Questions and ideas are welcome. Happy logging!
	Use `heroku addons:docs papertrail` to view documentation.

Open Papertrail and watch the logs:

	$ heroku addons:open papertrail
	Opening papertrail:choklad for heroku-sails-pg-test... done


Deploy!

	$ git push heroku master

Now view your new app in your browser.


## Local Setup 

Short version:  

1. Install dependencies via `npm install`
1. You'll need to install PostgreSQL. There are various ways – google it. I used homebrew.
1. Navigate to the config folder and rename `local.sample.js` to `local.js`
1. Update the database information.
1. Run the command `sails lift` and have fun building your app.

## Database

As mentioned above, the database being used is PostgreSQL. And well, if you've been testing locally, you're likely wondering how to get the local database info schema up to Heroku. Well I'm glad you asked. Heroku explains the process at [Importing and Exporting Heroku Postgres Databases with PG Backups](https://devcenter.heroku.com/articles/heroku-postgres-import-export). 

You'll also need to make sure that you install pg_backups.

	!    Please add the pgbackups addon first via:
 	!    heroku addons:add pgbackups


You can use something like the following to generate a dump.

`PGPASSWORD=my-user-pass pg_dump -Fc --no-acl --no-owner -h localhost -U myuser my-db-name > dumps/mydb_v1.dump`

You'll then need to get the dump to https accesible location. I ended up trying to use Dropbox to store my .dump file. IF you decide to do the same, you may run into the following error. I even tried copying the download link via the Download button and it still didn't work. It looks like AWS is the way to go. I tried only online sharing services as well. 

`Invalid dump format: /tmp/KBzKLiVhfW/sails_db.dump: HTML document text`


You can then use something like the following to migrate/restore the database.

`heroku pgbackups:restore DATABASE 'https://dl-web.dropbox.com/get/Uploads/my_db.dump?_subject_uid=UNIQUECODE&dl=1' --confirm your-app-name-here`



