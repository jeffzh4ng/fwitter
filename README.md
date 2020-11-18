# fwitter 🐦
![](https://i.imgur.com/wtdugOg.png)

## Stack
- View layer: [React Native](https://reactnative.dev/)
- State management: [Apollo Client](https://www.apollographql.com/docs/react/)
- Routing: [React Navigation](https://reactnavigation.org/)
- Backend layer [NestJS](https://nestjs.com/)
- Data layer: [TypeORM](https://typeorm.io/#/)
- Db layer: [Postgres](https://www.postgresql.org/)
- Image hosting: [Cloudinairy](https://cloudinary.com/)

## Features
- [x] tweets, replies, retweets, and likes
- [x] hashtags
- [x] search (profiles, tweets, hashtags)
- [x] notifications: blocked by apollo server layer not resolving union types correctly
- [ ] mentions: blocked by weird db layer bug re nullable columns on mentions table
- [ ] images: blocked by react native fetch bug - can't access cloudinairy
- [ ] messages
- [ ] signup flow: send code to email
