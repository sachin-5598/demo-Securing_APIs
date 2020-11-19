#### How would you secure an api without any sort of user login? For example your frontend hits a third party api using an api key. Since you can't securely store the api key on the frontend, you move that api call to a node backend. But is there a way to prevent others from accessing your api?

API example :
```
https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0
```

#### API-Proxy : it is something that takes in the request, forwards that request to someone else and then forwards that response back to you. It can modify the the request and response in that process. (Man in the middle on purpose)

## Measures

* [] Use middleware like helmet, compression, cors
* [] Rate limit by IP Address
* [] Slow down the response time
* [] Validate the custom API key header
* [] Response with data
  * [] Respond with the cached data
  * [] Else make the 3rd party api call
* Order of the middlewares are important to prevent brute force 

### My api endpoint : so no one can see the nasa-api-key (API-Proxy hide it)
```
http://localhost:5050/api/v1/marsWeather
```
