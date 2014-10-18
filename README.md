angular-vision-interceptor
==========================

AngularJS interceptor and serializer for x-www-form-urlencoded

### Usage

1. Add ```vision.interceptor``` as a dependency
2. Add a Content-Type header to your request.

```
  $http({
    method: 'POST',
    url: 'destination',
    data: {
      "user": {
        "email": "test.serializer@example.com",
        "password": "foobar"
      }
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
```

```
  $http.post('destination', {name:'Felipe Leonhardt', {invoice:{id:1, value: 123.23}},
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       }); 
```

Credits and Inspiration:
https://github.com/linclark/angular-serializer