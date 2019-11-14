### Table of Contents  
[Headers](#Login)  
[Emphasis](#emphasis) 

---

### Login

### **GET** all Notes
Axios example: 
```
axios.get('/notes, options)
     .then(res => {
          console.log(res.data.notes)
     })
```

Response example: 
```
{
  [
    notes: {
         _id: "5dbe3ad4e4a437246a6816fd1"
         text: "Im a note text"
    },
    notes: {
         _id: "5dbe3ad4e4a437246a6816fd2"
         text: "Im a note text 2"
    }
  ],
  message: "Success or error message here"
}
```
---

### **GET** single note by ID
Example: 
```
axios.get('/notes/5dbe3ad4e4a437246a6816fd, options)
     .then(res => {
          console.log(res.data.notes)
     })
```

Response example: 
```
{
   notes: {
       _id: "5dbe3ad4e4a437246a6816fd"
       text: "Im a note text"
   },
   message: "Success or error message here"
}
```

---

### **PUT** note by ID (updating note)
Body object should be in this format:
```
{
     text: 'I am the note"
}
```

Example: 
```
axios.put('/notes/5dbe3ad4e4a437246a6816fd, body, options)
     .then(res => {
          console.log(res.data.notes)
     })
```

Response example: 
```
{
   notes: {
       _id: "5dbe3ad4e4a437246a6816fd"
       text: "Im an updated note text"
   },
   message: "Success or error message here"
}
```

---

### **POST** note

Body object should be in this format:
```
{
     text: 'I am the note"
}
```

Example: 
```
axios.post('/notes, body, options)
     .then(res => {
          console.log(res.data.notes)
     })
```

Response example: 
```
{
   notes: {
       _id: "5dbe3ad4e4a437246a6816fd"
       text: "Im the newly added note"
   },
   message: "Success or error message here"
}
```

---

### **DELETE** note by ID
Example: 
```
axios.delete('/notes/bb89y28yadh8h9da2h9bzxnbk, options)
     .then(res => {
          console.log(res.data.notes)
     })
```

Response example: 
```
{
   notes: {
       _id: "bb89y28yadh8h9da2h9bzxnbk"
       text: "Im the note that was just removed"
   },
   message: "Success or error message here"
}
```

---

### **(POST)** Register user
Example: 
```
axios.post('/register, body, options)
     .then(res => {
          console.log(res.data.user)
     })
```

Response example: 
```
{
   user: {
       username: 'billy'
   },
   message: "Success or error message here"
}
```

---

### **(POST)** Login user
Example: 
```
axios.post('/auth/login, body, options)
     .then(res => {
          console.log(res.data.user)
     })
```

Response example: 
```
{
   user: {
       username: 'billy',
       valid: false or true
       
   },
   message: "Success or error message here"
}
```
