## Installation

Required: Docker, Docker compose installation, nodejs, yarn

```bash
$ yarn
```

## Running the app

### Open a new terminal tab

```bash
# Do to dev infrastructure
$ cd infrastructure/dev

# Start database, wait few seconds for finishing all settings
$ docker-compose up

```

### Edit .env file

Remember to edit [.env.example] file, then change its name to [.env]

### Migrate the database schema

We run the migration at the first time, so we dont need to create tables, columns, etc manually.

Edit `AUTO_MIGRATION = false` to `AUTO_MIGRATION = true` inside `.env` file

```bash
# development
$ yarn start
```

We just need to run this step once.
Next time, we should set `AUTO_MIGRATION = false`, because we just need 1 time to migrate the schema

### Can run seeds to generate an account, or some phones (Optional)

Currently, api /auth can generate new account.

Should take a look at code to modify the datas

```bash
$ yarn seed:run -r $PWD/src -n ormconfig.ts
```

Account: agile/12345678

### Start app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn build
$ yarn start:prod
```

The swagger will be set at: `localhost:3000/api`
