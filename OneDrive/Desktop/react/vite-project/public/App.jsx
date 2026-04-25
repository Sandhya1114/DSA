import { useState } from "react";
import MyButton from './MyButton'
import Profile from './Profile'
import LoginForm from './LoginForm'
import AdminPanel from './AdminPanel'
import ShoppingList from './ShoppingList'
import NewButton from './NewButton'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  
  function handleClick(){
      setCount(count+1);
  }

  const isLoggedIn = false;
  const hasProfileAccess = true;
  return (
    <>
      <div>
        First div
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        Second div
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <MyButton/>
      <MyButton/>
      <MyButton/>
      <MyButton/>
      <div>
        <NewButton count={count} onClick={handleClick}/>
        <NewButton count={count} onClick={handleClick}/>
      </div>
      {
        hasProfileAccess && <Profile/>
      }
      <div>
        {
          isLoggedIn? <AdminPanel/> : <LoginForm/>
        }
      </div>
      <div>
        <ShoppingList/>
      </div>
    </>
  )
}

export default App