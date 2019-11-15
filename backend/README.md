# Table of Contents (API)

- [Login](#Login)
- [Register](#Register)
- [User](#User)
- [Restaurant](#Restaurant)

# Note

All errors are in the following format:

```
{
  error: STRING,
  message: STRING
}
```

# Login

### Method: Post

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

# Register

### Method: Post

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

# User

### Method: Get

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
  restaurantIDs: [userIDs]
}
```

---

# Restaurant

### Method: Get

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
  reviews: [userIDs]
}
```

### Method: Post

**Body:**

```
{
  name: 'Pho Noodle House',
}
```

**URL:**

```
/restaurant
```

**Response:**

```
{
  message: 'Restaurant created',
  name: 'Pho Noodle House'
}
```

### Method: Delete

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
