# Book Search Engine
This repository contains code for a book search engine.

# Overview
In this project, I refactored a fully functioning book search engine that uses the Google Books API. The existing codebase uses a RESTful API and the MERN stack (MongoDB, Express.js, React, and Node.js). Your task is to refactor the application to use GraphQL queries and mutations with Apollo Server.

# Usage
- Search for books using the Google Books API.
- User authentication: login and signup functionality.
- Ability to save and remove books from user's account.
- View saved books.
- Logout functionality.

# User Story 
As an avid reader, I want to search for new books to read so that I can keep a list of books to purchase.
```
Upon loading the search engine, users are presented with options to search for books and to login/signup.
Users can search for books using an input field and a submit button.
When not logged in, searching for books displays search results with titles, authors, descriptions, images, and links to Google Books.
Clicking on the login/signup option presents a modal with options to log in or sign up.
Signing up requires entering a username, email address, and password.
Logging in requires entering an email address and password.
Upon successful signup, users are logged in and their account is created.
Upon successful login, the modal closes and users are logged in.
When logged in, menu options change to include saved books and logout.
Searching for books when logged in displays search results with options to save books.
Saved books can be viewed with titles, authors, descriptions, images, links, and options to remove them.
Clicking the logout button logs the user out and presents the original menu options.
