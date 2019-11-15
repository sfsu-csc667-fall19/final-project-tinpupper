## Table of Contents (API)
- [Login](#Login)
- [Register](#Register)

## Note
All errors are in the following format:
```
{
  error: STRING,
  message: STRING
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

