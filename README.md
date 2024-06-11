
# Management Systems API

This is a RESTful API built with NestJS framework to manage feedback entries. It allows users to retrieve all feedback entries, submit new feedback, update existing feedback, and delete feedback entries.





## Setup

1. #### Clone the Repository:

```bash
  git clone https://github.com/RicardoIsaac/management-systems-api.git
```

2. #### Install Dependencies::

```bash
  npm install
```


3. #### Start the Server:

```bash
  npm start
```





## Project Structure


The project follows a standard NestJS project structure:

```bash
  Management-Systems-API/
├── src/
│   ├── feedback/
│   │   ├── dto/                    # Data transfer objects
│   │   ├── feedback.controller.ts # Controller for managing feedback endpoints
│   │   ├── feedback.module.ts      # Module file for feedback feature
│   │   └── feedback.service.ts     # Service for handling feedback logic
│   ├── app.module.ts               # Root module of the application
│   └── main.ts                     # Entry file to bootstrap the NestJS application
├── README.md                       # Project README file
└── package.json                    # npm package configuration
```

- src/feedback/: Contains files related to the feedback feature.

  - dto/: Data transfer objects used for defining request and response structures.
  - feedback.controller.ts: Controller responsible for managing feedback endpoints.
  - feedback.module.ts: Module file that defines the feedback feature module.
  - feedback.service.ts: Service responsible for handling business logic related to feedback.
- src/app.module.ts: Root module of the application where other modules are imported.

- src/main.ts: Entry file to bootstrap the NestJS application.

## Additional Notes

- CORS: CORS (Cross-Origin Resource Sharing) is enabled to allow requests from 
```bash
http://localhost:3000. 
```
- You may need to adjust the CORS configuration in main.ts based on your frontend application's origin.

- Rate Limiting: Rate limiting is implemented using express-rate-limit middleware to restrict the number of requests to one per 10 seconds for each IP address. This helps prevent abuse and ensures fair usage of the API.

- Error Handling: Error handling is not covered extensively in this README but should be implemented in a production-ready application. NestJS provides robust mechanisms for error handling using interceptors, filters, and exception handling pipes.