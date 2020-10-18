# Owambe-server
API for Donation App (Developed as part of the Google Africa Developers community projects)

## Prerequisites
- Have GIT, installed.

## Technologies Used
- MongoDB and Mongoose.
- NodeJS, Express


## Setup
1. Clone the repository
2. `cd` to the directory
3. run `npm install`.

## API EndPoints
- https://owambe-server.herokuapp.com/api/ - API Link


1. `user/register`, Registers a user<br/>  Method:- `POST`<br/>  postData:-`{
    "first_name": "foo",
    "other_names": "bar",
    "last_name": "uno",
    "email": "foobar@uno.com",
    "gender": "Female",
    "phone_number": <>,
    "birth_date": "<>",
    "address": "ABC Sreeet",
    "password": "foobaruno",
    "password_confirmation": "foobaruno"
}` <br/>Result:- `{
    "token": <>
}`

2. `users/`, Returns an Array of users <br> Method:- `POST`

