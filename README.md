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
- `/api/user/register`, Registers a new individual user
- `/api/user/login`, Logs in an existing user
- `/api/users/:_id`, Returns a specific user queried by ID
- `/api/users/`, Returns a complete array list of all users

Organizations
- `/api/organization/register`, Registers a new organization
- `/api/organization/login`, Logs in an existing organization
- `/api/organizations/:_id`, Returns a specific organization queried by ID
- `/api/organizations/`, Returns a complete array list of all organizations

Categories
- `/api/category/new`, Creates a new fundraiser category
- `/api/categories/:_id`, Returns a specific fundraiser category queried by ID
- `/api/categories/`, Returns a complete array list of all categories

Fundraisers
- `/api/fundraiser/new`, Creates a new fundraiser request
- `/api/fundraisers/:_id`, Returns a specific fundraiser request queried by ID
- `/api/fundraiser/:categories`, Returns a complete list of all fundraiser requests under a specific category
- `/api/fundraisers/`, Returns a complete array list of all fundraiser requests

Donations
- `/api/donation/new`, Makes a new donation
- `/api/donations/:_id`, Returns a specific donation request queried by ID
- `/api/donation/:fundraiser`, Returns a complete list of all donations made to a specific fundraiser request
- `/api/donations/`, Returns a complete array list of all donations