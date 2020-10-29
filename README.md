# Instagram Messenger

This little test is made to send message to an instagram user using Scrapping (thanks to puppeteer)

## Requirements

node & yarn

## Install it

```bash
git clone git@github.com:anaelChardan/instagram-messenger.git
cd instagram-messenger
yarn install
```

## Configure it

For now the configuration isn't done through environment variables (should be done). So look into index.ts and change `username`, `password`, `accountToMessage`, `messageToSend` and `headless` if you want to see your test running into a real browser.

## Run it :rocket:

For now it is a development version some enhancements are needed

In one terminal, transpyle the typescript into another:

```bash
yarn run tsc -w
```

In another one:
```
yarn run start
```


