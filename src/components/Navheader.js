import React, {useState} from 'react'

export default function LoginScreen(){
const [msg,setMsg] =  useState('')

const submit = ()=>{
    console.log(msg)
    setMsg('')
}


return(
<div> 


<input type="text" value ={msg} onChange={(e)=> setMsg(e.target.value)} ></input>
<button onSubmit={submit}>click</button>
</div>

)

}

