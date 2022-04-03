
# MovieInsp
A movie-based web application that's been created in purpose of learning and implementing Node JS and React practices.

## Technologies & Libraries
- Node.js (Express)
- React
- Redux
- React Query
- MongoDB
- SocketIO

## Demo
[Click here](https://gleeful-ganache-1780c6.netlify.app/).

## Deployment
I decided to deploy the Node.js backend on Heroku and the React client on Netlify.
The refresh token was originally stored in a browser cookie via the backend, but due to [security & domain differences](https://devcenter.heroku.com/articles/cookies-and-herokuapp-com) the cookie failed to save on mobile devices.
I decided to keep the original implementaion for show purposes, and additionally store the refresh tokens in the browser's local storage.

## Docker
In order to run with Docker, make sure that you have [Docker](https://docs.docker.com/installation/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

Clone the repository to your host and navigate to the directory in which you cloned the project.
Make sure to edit & update the ```example.env``` file accordingly before you continue.

#### Run the following command from the root directory:


```bash
docker-compose up -d
```

The docker-compose command will pull the images and link them together based on the information inside the ```docker-compose.yml``` file.

### example.env
This file is run by the ```docker-compose.yml``` file and should contain all of the necessary environment variables shown below.

```env
MONGO_DB_CONNECTION_STRING=YOUR CONNECTION STRING
```


For this project I used [MongoDB Atlas](https://www.mongodb.com/docs/atlas/getting-started/) as my database service.
Replace the value with your own connection string.

```env
COOKIE_SECRET=YOUR COOKIE SECRET
JWT_SECRET=YOUR JWT SECRET
REFRESH_TOKEN_SECRET=YOUR REFRESHTOKEN SECRET
REFRESH_TOKEN_EXPIRY=60*60*24*30
WHITELISTED_DOMAINS=http://localhost:3000
CLIENT=http://localhost:3000
```
Replace all secrets with your own generated strings.

Unless you change your client's port, keep ```WHITELISTED_DOMAINS``` and ```CLIENT``` as they are.

```
MOVIES_API_KEY=TMDB API KEY
```
Get your API Key at [TMDb](https://developers.themoviedb.org/3/getting-started/introduction).

```
NAME_OF_API=AddieAPI
CREATOR=Addie The Mighty
```
You can change these as you please.

```
NODE_ENV=development
```

```NODE_ENV``` should either be set to ```development``` or ```production```.