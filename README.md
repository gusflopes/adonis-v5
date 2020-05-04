# Adonis V5 - Template
This is a Adonis V5 API Only template with examples using relations 1:n and 1:1.

## Disclaimer
I mixed a few stuff between portuguese/english because I forgot that this was going to be a template, but I'll fix that later.

## First Steps
If you just installed this template or cloned this repository, you'll need to setup the project in your local machine. If you need instructions, you can just use the following commands after cloning the project:

```bash
$ cp .env.example .env

$ yarn install

$ yarn start
```

## Content
This template use the most recent @AdonisJs packages and will be constantly updated to reflect the current Alpha Release Version.

It was built with the following specs:

1- User Entity (name, email, password)
2- Register/Login using **Email** and **Password** as credentials
3- JWT Authentication (Token generation and middleware)
4- Client Entity: just basic setup but handling **birth_date** and formatting dates.
5- Address Entity: with relationship to User (belongsTo - 1:1)
6- Telephone Entity: with relationship to User (belongsTo - n:1)
7- All the relationships are bidirectional (belongsTo / hasOne or belongsTo / hasMany)

## Other stuff
This template comes bundled with an [Insomnia file](https://github.com/gusflopes/adonis-v5/blob/master/insomnia.json) to help you get started using [Insomnia](https://insomnia.rest/download/)

## Credits
Credits first of all to the creators of [AdonisJs](https://github.com/adonisjs), but this template was developed by [@gusflopes](https://github.com/gusflopes)

