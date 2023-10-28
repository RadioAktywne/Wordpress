# website

RadioAktywne website

## Usage

Run from top directory:

```sh
docker compose up
```

By default, website is at [`localhost:20000`](http://localhost:20000),
while the admin panel is at [`localhost:20000/wp-admin`](http://localhost:20000/wp-admin).

## Components

### Database

Database stores all the data that the website needs.
It's an instance of MySQL database,
since it's the only one compatible with WordPress.

It's totally managed by WordPress.
We don't need to run any SQL statements manually,
we just need to have it running.
However, you can configure the database behavior with configuration files.

You can find everything related to the database in `database` directory.

### WordPress

WordPress is the middle layer that manages all the content for the website.
The website communicates only with WordPress to get all the data needed.

At first launch, you need to configure it by going to the admin panel.

You can find everything related to WordPress in `wordpress` directory.
WordPress admin panel is available
on [`localhost:20000/wp-admin`](http://localhost:20000/wp-admin) by
default.

### Web

Website is built on top on Frontity.
It's a framework that connects to WordPress in background
and makes all the data ready to be used in React.
It means that you can use anything that is available in React
to make your website look however you like.

You can find everything related to the website in `web` directory.
It's available on [`localhost:20000`](http://localhost:20000) by default.
