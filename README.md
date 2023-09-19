## Register Admin

To register a new admin, send a POST request to the following endpoint:


- Content Type: application/json
- method: POST
- endpoint: /api/v1/auth/register

**Request:**

```json
{
  "username": "string",
  "password": "string"
}
```

## Login Admin

To be authorized and get token, send a POST request to the following endpoint:


- Content Type: application/json
- method: POST
- endpoint: /api/v1/auth/login

**Request:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "statusCode": number,
  "message": "string"
  "data" : {admin, token}
}
```

# User Management API

### Note: Authentication token is required for all routes.
Authentication Token
Include the following header in your request for routes that require authentication:

```json
Headers: {
'Authorization' : 'Bearer <token>'
}
```

## Create User
To register a new user, send a POST request to the following endpoint:

- Method: POST
- Endpoint: /api/v1/users
- Content Type: application/json
  
Request Body:

``` json
{
  "userName": "string",
  "accountNumber": "string",
  "emailAddress": "string",
  "identityNumber": "string"
}
```
## Get All Users
Retrieve a list of all users.


- Method: GET
- Endpoint: /api/v1/users

## Get User by Account Number
Retrieve user data by account number.

- Method: GET
- Endpoint: /api/v1/users/account/:accountNumber

## Get User by Identity Number
Retrieve user data by identity number.


- Method: GET
- Endpoint: /api/v1/users/identity/:identityNumber

## Update User
To update user data, send a PUT request to the following endpoint:


- Method: PUT
- Endpoint: /api/v1/users
- Content Type: application/json

Request Body:
``` json
{
  "id": "string",
  "userName": "string",
  "accountNumber": "string",
  "emailAddress": "string",
  "identityNumber": "string"
}
```
## Delete User
To delete a user, send a DELETE request to the following endpoint:


- Method: DELETE
- Endpoint: /api/v1/users/:id
