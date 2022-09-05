import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users , setUsers] = useState([]);

  useEffect( () =>{
     fetch('http://localhost:5000/users')
     .then(res => res.json())
     .then(data => setUsers(data))
  },[])

  const handleOnSubmit = event =>{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name: name, email: email};

    fetch('http://localhost:5000/user',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data => {
      let newUsers = [];
      newUsers = [...users, data]
      setUsers(newUsers);
    })
  }

  return (
    <div className="App">
      <h1>My own making practice api: {users.length}</h1>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="name" id="" required/>
        <input type="email" name="email" id="" required/>
        <input type="submit" value="Add user" />
      </form>

      {
        users.map(user => <li key = {user.id}>Id:{user.id} Name:{user.name}  email:{user.email}</li>)
      }
    </div>
  );
}

export default App;
