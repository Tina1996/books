import React,{useContext, useEffect, useState} from 'react'
import '../App.css'
import {Link,useHistory} from 'react-router-dom'
import { IoIosHelpCircle } from 'react-icons/io';
import {FaShoppingCart} from "react-icons/fa";
import {UserContext} from '../App'


const Navbar = () => {
    const history = useHistory()
    // const checkmark = '&#10006'
    const {state,dispatch} = useContext(UserContext)
    const [query,setQuery] = useState("")
    // console.log("state in nav",state)
    // console.log("userlocal",localStorage.getItem("user"))

    useEffect(()=>{
        // console.log("query",query)
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            dispatch({type:"USER",payload:user})
        }
    },[])

    const clickQuery = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault()
            console.log("query",query) 
            if(query.length>0){
                console.log("hello",query) 
                history.push({
                    pathname:'/search',
                    state: { query: query }
                })
                // setQuery("")
            }
            
        }
    }

    const blurInput = (e) =>{
        setQuery("")
    }

    const renderList = () => {
        if(state){
            return(
                <>
                    
                    <li><input 
                            className="search" 
                            type="text" 
                            value={query} 
                            onChange={(e)=>{
                                setQuery(e.target.value)
                            }}
                            onKeyDown={(e)=>{clickQuery(e)}}
                            onBlur={(e)=>{blurInput(e)}}
                            name="query" 
                            placeholder="Search..." />
                    </li>
                    <li><Link to="/profile" >Profile</Link></li>            
                    <li><Link to="/cart"><FaShoppingCart style={{paddingTop:"10px"}} size={24}/><span style={{fontSize:"25px"}}>{state.cart.length>0 ? state.cart.length : null}</span></Link></li>
                    <li><Link to="/sellbook">Sell Book</Link></li>
                    <li onClick={()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/')
                    }} style={{cursor:"pointer"}}><Link to="/">Logout</Link></li>
                    <li className="icon" style={{paddingRight:"10px",marginRight:"20px",cursor:"pointer"}} onClick={()=>myFunction()}> &#9776;</li>
            </>
            )
        }else{
            return(
                <>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/">Help <IoIosHelpCircle size="1.1em" /></Link></li>
                    <li className="icon" style={{paddingRight:"10px",marginRight:"20px",cursor:"pointer"}} onClick={()=>myFunction()}> &#9776;</li>  
                </>
            )
        }
    }

    return(
        <>
        <nav className="nav-extended navbar-fixed">
            <div  className="nav-wrapper #d32f2f red darken-2" id="navbar">
                <Link to="/" className="brand-logo" >BookSeize</Link>
                <ul id="myTopnav" className="topnav nav-items">
               
                    {renderList()}
                    
                </ul>
            </div>
            <div id="second-navbar" className="nav-content #d32f2f red darken-4" style={{maxWidth:"100%"}}>
                <ul className="tabs tabs-transparent categories" style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",maxWidth:"100%"}}>
                    <li className="tab"><Link to='/category/Fiction'>FICTION</Link></li>
                    <li className="tab"><Link to={`/category/Horror`}>HORROR</Link></li>
                    <li className="tab"><Link to={`/category/Romance`}>ROMANCE</Link></li>
                    <li className="tab"><Link to={`/category/Thrill`}>Thrill</Link></li>
                    <li className="tab"><Link to={`/category/Historical`}>Historical</Link></li>
                </ul>
            </div>
        </nav>
        
        </>
    )
}

//for navbar hiding
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
          document.getElementById("navbar").style.top = "0";
          document.getElementById("second-navbar").style.top = "60px";
        } else {
          document.getElementById("navbar").style.top = "-60px";
          document.getElementById("second-navbar").style.top = "0";
        }
        prevScrollpos = currentScrollPos;
    };

//for navbar dropdown
    function myFunction() {
        // var x = document.getElementById("myTopnav");
        if (document.getElementById("myTopnav").className === "topnav") {
            document.getElementById("myTopnav").className += " responsive";
        } else {
            document.getElementById("myTopnav").className = "topnav";
        }
      }
    
export default Navbar