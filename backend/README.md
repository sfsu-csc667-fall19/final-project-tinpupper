## Table of Contents (API)
- [Login](#Login)
  * [Post](#Post)


---

## Login

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
/auth/login
```

**Response:**
```
{
  username: 'bob'
  isBusiness: true || false
}
```

