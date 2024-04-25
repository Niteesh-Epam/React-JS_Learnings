import React, { useState , useEffect} from 'react'

export const Child = () => {
    const[todos , settodos] = useState([]);
    const [ onMouseOver, setMouseOver] = useState(false)

    useEffect(()=> {
     async function fetchData(){
        try{
      let call = await fetch('https://jsonplaceholder.typicode.com/posts');
      let reply = await call.json();
      settodos(reply)
        }catch(error){
            //
        }
     } 

     fetchData()
    }, [])
  return (
    <div>
       <p>{onMouseOver ? 'Hovered-Component' : 'Child Component' } </p>
        <ul>
        {todos.map((item , index)=> {
          return  <li key={index}>{item.title}</li>
        })}
        </ul>
        <button onMouseOver={()=> {
           setMouseOver(prev => !prev) 
        }}>Mouse Over me</button>
    </div>
  )
}
