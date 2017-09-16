# tap Api, Layer 1

## Methods

* [sendSms](#sendsms): send verification code to user
* [signIn](#signin): validate sms code
* [signUp](#signup): validate sms code
* [getUser](#getuser): get user desc
* [updateUser](#updateuser): update user info
* [generateAddress](#generateaddress): generate a temporary address
* [createTransaction](#createtransaction): create a new transaction
* [deleteTransaction](#deletetransaction): delete a transaction
* [getSections](#getsections): delete a transaction
* [getPersonalSections](#getpersonalsections): get sections of a specific user
* [paySection](#paysection): pay a section
* [findUser](#finduser): find user by address

# sendSms

send verification code to user

### Request

* `phone` string: user phone, 11 digits, starts with 09

### Response


### Errors

* `PHONE`: phone number is not a valid phone number
* `LIMITED`: user is limited

# signIn

validate sms code

### Request

* `phone` string: user phone, 11 digits, starts with 09
* `code` string: 4 digit verifiacation code

### Response

* `token` string: token to use for other methods

### Errors

* `PHONE`: phone number is not a valid phone number
* `EXPIRED`: code is expired
* `UNAUTHORIZED`: code is wrong
* `UNOCCUPIED`: code is true but user is new

# signUp

validate sms code

### Request

* `phone` string: user phone, 11 digits, starts with 09
* `code` string: 4 digit verifiacation code
* `name` string: user fullname

### Response

* `token` string: authorized token to use

### Errors

* `PHONE`: phone number is not a valid phone number
* `EXPIRED`: code is expired
* `UNAUTHORIZED`: code is wrong
* `NAME`: name is not valid

# getUser

get user desc

### Request


### Response

* `fullname` string: user fullname
* `phone` string: user phone number
* `credit` number: user credit in app
* `debt` number: user dept
* `demand` number: user demand
* `cards` array: user bank cards. Each element has the following form:
    * `card` string: each element is a card number

### Errors

* `AUTH`: token is not authorized

# updateUser

update user info

### Request

* `fullname` optional string (default = `null`): user name more than 3 char and less than 20
* `phone` optional string (default = `null`): user phone starts with 09 and 11 digit
* `card` optional mixed (default = `null`): user card add. One of the following form:
    * `add` string: card add field
    * `delete` string: card delete field

### Response

* `fullname` string: user fullname
* `phone` string: user phone number
* `credit` string: user credit in app
* `cards` array: user bank cards. Each element has the following form:
    * `card` string: each element is a card number

### Errors

* `AUTH`: token is not authorized
* `NAME`: name is not valid

# generateAddress

generate a temporary address

### Request


### Response

* `address` string: user temp address

### Errors

* `AUTH`: token is not authorized

# createTransaction

create a new transaction

### Request

* `desc` string: trasnaction desc
* `to` string: trasnaction destination id
* `value` number: trasnaction value

### Response

* `id` string: trasnaction id
* `desc` string: trasnaction desc
* `section` optional string (default = `null`): trasnaction section
* `to` string: trasnaction destination id
* `value` number: trasnaction value
* `date` number: trasnaction date
* `accepted` boolean: trasnaction is accepted
* `payed` boolean: trasnaction is payed

### Errors

* `AUTH`: token is not authorized

# deleteTransaction

delete a transaction

### Request


### Response


### Errors

* `AUTH`: token is not authorized

# getSections

delete a transaction

### Request

* `beforeId` optional string (default = `null`): before id

### Response

* `sections` array: sections of this user (not all). Each element has the following form:
    * `section` object: each element is a section
        * `user` object: other user in a section
            * `id` string: user id
            * `fullname` string: user fullname
        * `value` number: value of the section + is for you and - is for the other user

### Errors

* `AUTH`: token is not authorized

# getPersonalSections

get sections of a specific user

### Request

* `userId` string: user id
* `beforeId` optional string (default = `null`): before id

### Response

* `beforeId` string: before id
* `sections` array: sections of this user (not all). Each element has the following form:
    * `section` object: each element is a section
        * `transactions` array: transactions of this section. Each element has the following form:
            * `transaction` object: transaction
                * `desc` string: desc of the transaction
                * `value` number: value  of the transaction + for you and - for the other user
                * `date` number: date of the transaction
        * `date` optional number (default = `null`): payment date of this section
        * `value` number: this section value

### Errors

* `AUTH`: token is not authorized
* `INVALID_ID`: id is not valid

# paySection

pay a section

### Request

* `sectionId` string: section id

### Response


### Errors

* `AUTH`: token is not authorized
* `PAYMENT`: payment failed

# findUser

find user by address

### Request

* `address` string: user address

### Response

* `id` string: user id

### Errors

* `AUTH`: token is not authorized
* `INVALID_ADDRESS`: token is not authorized

# Generic Errors
* `UNKNOWN`: server internal error
* `BAD_REQUEST`: bad request
* `INVALID_METHOD`: no such method exist in this layer
* `INVALID_LAYER`: no such layer exist
* `NETWORK`: network problem
