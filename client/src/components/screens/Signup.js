import React,{ useState } from 'react';
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'


const Signup = () => {

    const history = useHistory()
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [contactNo,setContactNo] = useState("")
    const [address,setAddress] = useState("")
    const [city,setCity] = useState("")
    const [state,setState] = useState("")
    const [country,setCountry] = useState("")
    const [pincode,setPincode] = useState("")


    const registerUser = (e) => {
        e.preventDefault()
        console.log(firstName,lastName,email,password,contactNo,address,state,city,country,pincode)
        if(!firstName || !lastName || !email || !password || !contactNo || !city || !state || !country || !pincode){
            M.toast({html:"Please provide all fields",classes:"#263238 blue-grey darken-4"})
            return
        }
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid Email",classes:"#263238 blue-grey darken-4"})
            return
        }
        fetch('/signup',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                firstName:firstName,
                lastName,
                email,
                password,
                contactNo,
                address,
                city,
                state,
                country,
                pincode
            })
        })
        .then(res=>res.json())
        .then(data => {
            if(data.error){
                M.toast({html:data.error,classes:"#263238 blue-grey darken-4"})
            }
            else{
                M.toast({html:"Successfully registered",classes:"#263238 blue-grey darken-4"})
                history.push('/login')
            }
        })
        .catch(err=>{
            console.log(err)
        })  
    }


    return(
        <div className="mycard">
            <div className="card authcard input-field " style={{maxWidth:"55%"}}>
                <form>
                    <h2>BookSeize</h2>
                    <div className="row" >
                        <div className="input-field col s6">
                            <input 
                                type="text" 
                                placeholder="First Name" 
                                value={firstName}
                                onChange = {(e)=>{setFirstName(e.target.value)}}
                                />
                        </div>
                        <div className="input-field col s6">
                            <input 
                                type="text" 
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e)=>{setLastName(e.target.value)}}
                                />
                        </div>
                    </div>
                    <div className="row" style={{marginTop:"-20px"}}>
                        <div className="input-field col s12">
                            <input 
                                type="text" 
                                placeholder="Email"
                                value = {email}
                                onChange = {(e) => {setEmail(e.target.value)}}
                                />
                        </div>
                    </div>
                    <div className="row" style={{marginTop:"-20px"}}>
                        <div className="input-field col s12">
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value = {password}
                                onChange = {(e) => {setPassword(e.target.value)}}
                                />
                        </div>
                    </div>
                    <div className="row" style={{marginTop:"-20px"}}>
                        <div className="input-field col s12">
                            <input 
                                type="text" 
                                placeholder="Contact No." 
                                value = {contactNo}
                                onChange = {(e) => {setContactNo(e.target.value)}}
                                />
                        </div>
                    </div>
                    <div className="row" style={{marginTop:"-20px"}}>
                        <div className="input-field col s12">
                            <input 
                                type="text" 
                                placeholder="Address"
                                value = {address}
                                onChange = {(e) => {setAddress(e.target.value)}}
                                />
                        </div>
                    </div>
                    <div className="row" style={{marginTop:"-20px"}}>
                        <div className="input-field col s6">
                            <input 
                                type="text" 
                                placeholder="City" 
                                value = {city}
                                onChange = {(e) => {setCity(e.target.value)}}
                                />
                        </div>
                        <div className="input-field col s6">
                            <input 
                                type="text" 
                                placeholder="State" 
                                value = {state}
                                onChange = {(e) => {setState(e.target.value)}}
                                />
                        </div>
                    </div>
                    <div className="row" style={{marginTop:"-20px"}}>
                        <div className="input-field col s6">
                            <input 
                                type="text" 
                                placeholder="Country" 
                                value = {country}
                                onChange = {(e) => {setCountry(e.target.value)}}
                                />
                        </div>
                        <div className="input-field col s6">
                            <input type="text" 
                                placeholder="PinCode" 
                                value = {pincode}
                                onChange = {(e) => {setPincode(e.target.value)}}
                                />
                        </div>
                    </div>
                    <center>
                        <button className="btn waves-effect waves-light #b71c1c red darken-4" onClick={(e)=>{registerUser(e)}}>Signup</button>
                        <h6>
                            <Link to="/login">Don't have an Account ?</Link>
                        </h6>
                    </center>
                </form>
                
            </div>
        </div>
    )
}

export default Signup