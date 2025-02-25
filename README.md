# Polyspear Arbiter

A tournament management system designed for tracking [Polyspear](https://github.com/Wiolarz/Polyspear) tournament results


## Features

- Light/dark mode
- Responsive interface
- Built-in Redis caching
- Account system


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file (see also .env.example)

`MONGO_URL`

`JWT_SECRET`

`REDIS_URL`


## Running

You can run this project using docker-compose

```bash
  git clone https://github.com/bartoszstepien01/polyspear-arbiter.git
  cd polyspear-arbiter
  docker-compose up
```

or using npm
```bash
  git clone https://github.com/bartoszstepien01/polyspear-arbiter.git
  cd polyspear-arbiter
  npm install
  npm run dev
```
    
## License

[MIT](https://choosealicense.com/licenses/mit/)
