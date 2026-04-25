import Button from "./Button"



function App() {
  // <></> because react only return single element suppose we want to return multiple element like 
  // react Component+ html 
  /**
   *  <>
     <Button/>
     <h3>this is <button type="submit">click on me</button></h3>
     <p>hello</p>
    </>
    called Fragment 
   */

  return (
    <>
     <Button/>
     <Button/>
     <Button/>
     <Button/>
    </>
  )
}

export default App
