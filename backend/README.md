## Table of Contents (API)
- [Login](#Login)
- [Register](#Register)


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
  username: 'bob'
  isBusiness: true || false
}
```

