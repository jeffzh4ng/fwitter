# fwitter 🐦
![](https://i.imgur.com/wtdugOg.png)

## Stack
- View layer: [React Native](https://reactnative.dev/)
  - State management: [Apollo Client](https://www.apollographql.com/docs/react/)
  - Routing: [React Navigation](https://reactnavigation.org/)
- Backend layer: [NestJS](https://nestjs.com/)
  - Authentication: [Passport](http://www.passportjs.org/)
  - Data layer: [TypeORM](https://typeorm.io/#/)
- DB layer: [Postgres](https://www.postgresql.org/)
- Image hosting: [Cloudinairy](https://cloudinary.com/)

## Features
- [x] tweets, replies, retweets, and likes
- [x] hashtags
- [x] search (profiles, tweets, hashtags)
- [ ] messages
- [ ] signup flow: send code to email

## Blocked
- [] notifications: blocked by apollo server layer not resolving union types correctly
  - [ ] mentions: blocked by weird db layer bug re nullable columns on mentions table
- [ ] images: blocked by react native fetch bug - can't access cloudinairy

## Setup
Prerequisites: Expo, Node, and Docker.

### Client Setup
- `cd client`
- `yarn start`

### Server Setup
- `cd server`
- `docker-compose up`
