# db_api_node
This is a sample node and express project. This app provides only one api and it only accepts POST method. Travis CI has been used to manage the CI/CD pipeline and the whole project is deployed to heroku cloud server.

## Run the project locally
1. Go inside the project's root directory where docker-compose file exists.
2. Run the app with the following command:
```
docker-compose up --build
```

After successful build, app will run on this url: http://localhost:8000/analyze.
Use postman to test the API with payload. Give the payload like this:
```
{"text": "hello 2 times  "}
```

The response for this payload will be:
```
{
    "textLength": {
        "withSpaces": 15,
        "withoutSpaces": 11
    },
    "wordCount": 3,
    "characterCount": [
        {
            "e": 2
        },
        {
            "h": 1
        },
        {
            "i": 1
        },
        {
            "l": 2
        },
        {
            "m": 1
        },
        {
            "o": 1
        },
        {
            "s": 1
        },
        {
            "t": 1
        }
    ]
}
```

## Test case
To run the eslint test, run this command:
```
docker exec -it analyze /bin/sh -c "npm run test:api"
```

To run the api test, run this command:
```
docker exec -it analyze /bin/sh -c "npm run lint"
```
N.B. Here 'analyze' is the name of container after successful build from docker-compose file.

## CI/CD
The following steps are applied to build the CI/CD pipeline.

1. Commit to the project repo.
2. Travis ci will run the test first (both lint and api test).
3. After successful test run, Travis CI build image and deploy the image to docker hub account and registry.heroku.com.
4. Finally the project is deployed into heroku cloud.

The build image can be found in docker hub account (https://hub.docker.com/repository/docker/rupak08012/analyze_string).
The API in heroku is available in this link: https://analyze-string.herokuapp.com/analyze