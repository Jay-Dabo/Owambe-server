# Owambe-server
Official API for the Owambe Donation App (Developed as part of the Google Africa Developers community projects)

## Prerequisites
- Have GIT, installed.

## Technologies Used
- MongoDB and Mongoose.
- NodeJS, Express

## Setup
1. Clone the repository.
2. `cd` to the directory.
3. run `npm install`.
4. run `nodemon server` to begin server.

## API Endpoints
Users
- `user/register`, Registers a new individual user
- `user/login`, Logs in an existing user
- `users/:_id`, Returns a specific user queried by ID
- `users/`, Returns a complete array list of all users

Organizations
- `organization/register`, Registers a new organization
- `organization/login`, Logs in an existing organization
- `organizations/:_id`, Returns a specific organization queried by ID
- `organizations/`, Returns a complete array list of all organizations

Categories
- `category/new`, Creates a new fundraiser category
- `categories/:_id`, Returns a specific fundraiser category queried by ID
- `categories/`, Returns a complete array list of all categories

Fundraisers
- `fundraiser/new`, Creates a new fundraiser request
- `fundraisers/:_id`, Returns a specific fundraiser request queried by ID
- `fundraiser/:categories`, Returns a complete list of all fundraiser requests under a specific category
- `fundraisers/`, Returns a complete array list of all fundraiser requests

Donations
- `donation/new`, Makes a new donation
- `donations/:_id`, Returns a specific donation request queried by ID
- `donation/:fundraiser`, Returns a complete list of all donations made to a specific fundraiser request
- `donations/`, Returns a complete array list of all donations