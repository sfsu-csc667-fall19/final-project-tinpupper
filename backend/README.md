## Table of Contents (API)

- [Cookie](#Cookie)
- [Login](#Login)
- [Register](#Register)
- [User](#User)
- [Restaurant](#Restaurant)

TODO:
Update user response to have restaurants ID
Fix login response since more data is added
Add /auth/cookie documentation
Fix auth cookie response more data added

## Note

All errors are in the following format:

```
{
  error: STRING,
  message: STRING
}
```

---

## Cookie

**Method:** Post

**Body:**

```
{} leave as empty object
```

**URL:**

```
/auth/cookies
```

**Response:**

```
{
  username: 'bob'
  isBusiness: true || false
  restaurants: [restaurantID: int]
}
```

---

## Login

**Method:** Post

**Body:**

```
{
  username: 'bob',
  password: '123'
}
```

**URL:**

```
/auth/login
```

**Response:**

```
{
  username: 'bob'
  isBusiness: true || false
}
```

---

## Register

**Method:** Post

**Body:**

```
{
  username: 'bob',
  password: '123',
  isBusiness: true || false
}
```

**URL:**

```
/register
```

**Response:**

```
{
  message: 'Successfully registered user',
  user: 'bob',
  isBusiness: true || false,
}
```

---

## User

**Method:** Get

**Body:**

```
N/A
```

**URL:**

```
/user
```

**Response:**

```
{
  message: 'Users found',
  [
    username: 'bob',
    isBusiness: true || false,
    restaurantIDs: [restaurantID: int]
  ]
}
```

**Method:** Get

**Body:**

```
N/A
```

**URL:**

```
/user/:id
```

**Response:**

```
{
  message: 'User found',
  username: 'bob',
  isBusiness: true || false,
  restaurantIDs: [restaurantID: int]
}
```

**Method:** Put

**Body:**

```
  {
    username: 'newBob',
  }
```

**URL:**

```
/user/:id
```

**Response:**

```
{
  message: 'User updated',
  username: 'newBob',
}
```

**Method:** Delete

**Body:**

```
N/A
```

**URL:**

```
/user/:id
```

**Response:**

```
{
  message: 'User deleted',
  username: 'bob'
}
```

---

## Restaurant

**Method:** Get

**Body:**

```
N/A
```

**URL:**

```
/restaurant
```

**Response:**

```
{
  message: 'Restaurants found',
  restaurants: [restaurant: object]
}
```

**Method:** Get

**Body:**

```
N/A
```

**URL:**

```
/restaurant/:id
```

**Response:**

```
{
  message: 'Restaurant found',
  name: 'Pho Noodle House'
  description: 'A great place to eat stuff and do things'
  reviews: [userID: int]
}
```

**Method:** Post

**Body:**

```
{
  name: 'Pho Noodle House',
  description: 'This is a restaurant that sells food oh yes it does.'
}
```

**URL:**

```
/restaurant
```

**Response:**

```
{
  message: 'Creating restaurant... (kafka)',
  name: 'Pho Noodle House',
  description: 'This is a restaurant that sells food oh yes it does.'
}
```

**Method:** Delete

**Body:**

```
N/A
```

**URL:**

```
/restaurant/:id
```

**Response:**

```
{
  message: 'Deleted restaurant',
  id: '219308s90f0nd98xdfioue'
}
```
