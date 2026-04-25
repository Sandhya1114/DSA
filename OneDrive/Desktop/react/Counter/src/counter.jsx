import { useState } from "react";




export default function Counter(){
   let [counter,setCounter]=useState(0)  
   const addValue=()=>{
    counter=='20'?'':setCounter(counter+1);
   }
    const removeValue=()=>{
    counter=='0'?'':setCounter(counter-1);
   }

    return(
        <>
        <h1>counter</h1>
        <p>total value {counter}</p>
        <button type="submit" onClick={addValue}>Add</button>
        <button type="submit " onClick={removeValue}>Remove</button>
        
        </>
    )
}