## Table of Content (API)

- [Cookie](#Cookie)
- [Login](#Login)
- [Register](#Register)
- [Restaurant](#Restaurant)
- [Review](#Review)
- [User](#User)

## Warning

**docker-compose build** needs to be ran before **docker stack deploy -c**

## Note

All errors are in the following format:

```
{
  error: STRING,
  message: STRING
}
```

## WebSocket

- Triggered during restaurant POST

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
  ownerId: "5dcdf1686f1fdecd6256f232",
  message: 'Restaurant found',
  name: 'Pho Noodle House'
  description: 'A great place to eat stuff and do things'
  reviewIds: [reviewId: int]
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
  ownerId: "5dcdf1686f1fdecd6256f232",
  message: 'Creating restaurant...',
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

---

## Review

**Method:** Get

**Body:**

```
N/A
```

**URL:**

```
/review/:id
```

**Response:**

```
{
  message: "Found review",
  userId: "alwkchkh879172897",
  restaurantId: "hkchichz8hch89ey9hui"
  text: "Wow this restaurant is a restaurant",
}
```

**Method:** Get

**Body:**

```
N/A
```

**URL:**

```
/review
```

**Response:**

```
{
  message: "Found reviews",
  reviews: [
    {
      userId: "alwkchkh879172897",
      restaurantId: "hkchichz8hch89ey9hui"
      text: "Wow this restaurant is a restaurant"
    }
  ]
}
```

**Method:** Post

**Body:**

```
{
  text: "Wow this is a review",
  restaurantId: "klankjjcbiwb9392b839ib"
}
```

**URL:**

```
/review
```

**Response:**

```
{
  message: "Successfully posted review",
  userId: "kanwoihxc89oh43",
  text: "Wow this is a review",
  restaurantId: "klankjjcbiwb9392b839ib"
}
```

**Method:** Put

**Body:**

```
{
  userId: "kanwoihxc89oh43",
  text: "Wow this is an updated review",
  restaurantId: "klankjjcbiwb9392b839ib"
}
```

**URL:**

```
/review/:id
```

**Response:**

```
{
  message: "Updated review",
  userId: "kanwoihxc89oh43",
  text: "Wow this is an updated review",
  restaurantId: "klankjjcbiwb9392b839ib"
}
```

**Method:** Delete

**Body:**

```
N/A
```

**URL:**

```
/review/:id
```

**Response:**

```
{
  message: "Deleted review",
  userId: "kanwoihxc89oh43",
  text: "Wow this is an updated review",
  restaurantId: "klankjjcbiwb9392b839ib"
}
```
