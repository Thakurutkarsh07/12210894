## URL Shortener Backend with Logging

### Purpose of the Project

This is a simple URL Shortener microservice that lets users convert long URLs into short links. It also tracks clicks and shows stats. The service uses a custom logging system (Logging Middleware) that sends logs to a remote server for better monitoring and debugging.

---

### Technologies Used

* **Node.js & Express** – For building the backend server
* **MongoDB** – To store URL data and click stats
* **Mongoose** – Makes working with MongoDB easier
* **Axios** – Used in the logging middleware to send logs
* **Shortid** – To generate unique shortcodes (can also use custom logic)

---

### Project Structure

```
RootFolder/
│
├── Logging Middleware/
│   └── log.js          → Reusable function to send logs to server
│
└── Backend Test Submission/
    ├── app.js          → Main server file
    ├── routes/
    │   └── short.js     → API routes for URL creation and stats
    ├── controllers/
    │   └── short.js     → Logic for handling short URLs
    ├── models/
    │   └── short.js     → MongoDB schema for URLs
    └── utils/
        └── generate.js  → Function to generate random shortcodes
```

---
### Steps to setup in your system

In root folder
- npm init -y
- npm install express mongoose axios
- cd "Backend Test Submission"
- node app.js
  
#### Also update mongodb uri with your uri. ./Backend Test Submission/utils/db.js

---

### How It Works

1. **Create Short URL**

   * User sends a long URL, optional validity in minutes, and optional shortcode.
   * If shortcode isn’t given, we create a unique one.
   * If validity isn’t given, it defaults to 30 minutes.
   * We save it in MongoDB with an expiry time.
   * Log the event using the Logging Middleware.

2. **Redirect to Long URL**

   * When a user visits `/shortcode`, we find the original URL.
   * If found and not expired, redirect to the long URL.
   * We track the click, log it, and store basic info like timestamp and referrer.

3. **Get Stats**

   * User can call `/shorturls/:shortcode` to get stats about a short URL.
   * It shows original URL, expiry, total clicks, and click details.
   * Useful for analytics.

4. **Logging Middleware**

   * We use a custom `log()` function instead of console logs.
   * It sends logs to the given API endpoint.
   * It helps trace errors, warnings, info, and events in every part of the app.

---

### MongoDB Schema (Simplified)

```js
{
  originalUrl: String,
  shortcode: String,
  createdAt: Date,
  expiresAt: Date,
  clicks: Number,
  clickDetails: [
    {
      time: Date,
      referrer: String,
      location: String // Placeholder
    }
  ]
}
```

---

### Assumptions

* Validity is always in minutes and optional.
* Custom shortcodes must be alphanumeric and unique.
* If the shortcode already exists, we return an error.
* Geolocation is mocked or marked as “unknown” due to time constraints.

---

### API Summary

| Method | Endpoint                | Description                       |
| ------ | ----------------------- | --------------------------------- |
| POST   | `/shorturls`            | Create a new short URL            |
| GET    | `/shorturls/:shortcode` | Get stats about a short URL       |
| GET    | `/:shortcode`           | Redirect to the long/original URL |

---

### Example

#### Request to Create Short URL

```json
POST /shorturls
{
  "url": "https://example.com/some/very/long/link",
  "validity": 45,
  "shortcode": "exmpl1"
}
```

#### Example Response

```json
{
  "shortLink": "http://localhost:3000/exmpl1",
  "expiry": "2025-07-14T12:34:56Z"
}
```

---
