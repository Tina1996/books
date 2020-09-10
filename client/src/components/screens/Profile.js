import React,{useContext, useEffect, useState} from 'react'
import {UserContext} from '../../App'
import { Link } from 'react-router-dom'

const Profile = () => {

    const [mySubmittedBooks,setSubmitedBooks] = useState([])
    const {state} = useContext(UserContext)

    useEffect(()=>{
       fetch('/myBooks',{
            headers:{
                "Content-Type":"application/json",
                "authorization":"Beware "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result => {
            // console.log("result",result)
            setSubmitedBooks(result.books)
        })
        .catch(err=>{
            console.log(err)
        })  
    },[])
  
    
    return(
        
       <div style={{maxWidth:"750px",margin:"110px auto",padding:"4%"}}>
            <div style={{display:"flex",justifyContent:"space-around",padding:"2%",margin:"-4% 0px 0px 0px",borderBottom:"1px solid grey"}}>
                <div>
                    <div>
                        <img style={{"height":"160px","width":"160px","borderRadius":"80px"}} alt="profile"
                                src="https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                    </div>
                </div>
                <div style={{padding:"3%"}}>
                    <h4>{state? state.firstName +" "+ state.lastName:"Loading..."}</h4>
                    <h6>{state? state.email: "Loading..."}</h6>
                    <h6>{state? state.contactNo: "Loading..."}</h6>
                </div>
            </div>
            <div>
                <div style={{borderBottom:"1px solid grey"}}>
                    <h5>My Address</h5>
                    <h6 style={{marginBottom:"18px"}}>{state? state.address +", " + state.city +", " +  state.state +", " +  state.country +", " +  state.pincode : "Loading..."}</h6>
                </div>
                {
                    mySubmittedBooks.length>0 ? 
                    <div>
                        <h5>My Posted Books</h5>
                        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
                        {
                            mySubmittedBooks.map(item=>{
                                return (
                                    
                                    <div className="card bookCard" style={{width:"27%",height:"300px",padding:"0.7%",margin:"10px",backgroundColor:"#FCF0EE"}} key={item._id}>
                                        <Link to={`/book/${item._id}`}>
                                        <div className="card-image">
                                            <img style={{height:"200px"}} src={item.bookImage} alt={item.bookName} />
                                        </div>
                                        <div style={{margin:"20px auto",alignItems:"center"}}>
                                            <div className="book-name">{item.bookName}</div>
                                            <div style={{margin:"0px auto",fontStyle:"italic",fontSize:"13px",textAlign:"center"}}>By {item.authorName}</div>
                                        </div>
                                        </Link>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                
                    :
                    <div className="card" style={{width:"100%",backgroundColor:"#eee"}}>
                        <p style={{margin:"2%",fontSize:"4vh",fontWeight:"bold"}}>No Books Submitted Yet</p>
                    </div>
                }
            </div>
        </div>
    
    )
}

export default Profile