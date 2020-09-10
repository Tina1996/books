import React,{useState,useContext} from 'react';
import '../../App.css'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

const Login = () => {

    const history = useHistory()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const {state,dispatch} = useContext(UserContext)

    const postData = () => {
        
        // console.log(email,password)
        if( !email || !password ){
            M.toast({html:"Please provide all fields",classes:"#263238 blue-grey darken-4"})
            return
        }
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid Email",classes:"#263238 blue-grey darken-4"})
            return
        }
        fetch('/login',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html:data.error,classes:"#263238 blue-grey darken-4"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Successfully Signed In",classes:"#263238 blue-grey darken-4"})
                history.push('/')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="mycard">
            <div className="card authcard input-field ">
                <h2>BookSeize</h2>
                <input 
                    type="text"
                    placeholder="Email" 
                    name="email" 
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    />
                <center>
                    <button className="btn waves-effect waves-light #b71c1c red darken-4" onClick={()=>postData()}>Login</button>
                </center>
            </div>
        </div>
    )
}

export default Login