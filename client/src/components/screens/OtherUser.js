import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

const OtherUser = () => {

    const [user,setUser] = useState(null)
    const {userId} = useParams()
    // console.log("user",user)
    

    useEffect(()=>{
        fetch(`/user/${userId}`)
            .then(res => res.json())
            .then(user => {
                setUser(user)
            })
            .catch(err=>{
                console.log(err)
            })
    },[userId])

    return(
        <React.Fragment>
            {
                user ? 
                <div style={{maxWidth:"750px",margin:"0 auto",padding:"4%"}}>
            <div style={{display:"flex",justifyContent:"space-around",padding:"2%",margin:"-4% 0px 0px 0px",borderBottom:"1px solid grey"}}>
                <div>
                    <div>
                        <img style={{"height":"160px","width":"160px","borderRadius":"80px"}} alt="profile"
                                src="https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                    </div>
                </div>
                <div style={{padding:"3%"}}>
                    <h4>{user.user.firstName +" "+ user.user.lastName}</h4>
                    <h6>{user.user.email}</h6>
                    <h6>{ user.user.contactNo}</h6>
                </div>
            </div>
            <div>
                <div style={{borderBottom:"1px solid grey"}}>
                    <h5>My Address</h5>
                    <h6 style={{marginBottom:"18px"}}>{user.user.address +", " + user.user.city +", " +  user.user.state +", " +  user.user.country +", " +  user.user.pincode }</h6>
                </div>
                    <div>
                        <h5>My Posted Books ({user.books.length})</h5>
                        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
                        {
                            user.books.map(item=>{
                                return (
                                    <div className="card" style={{width:"27%",height:"300px",padding:"0.7%",margin:"10px",backgroundColor:"#FCF0EE"}} key={item._id}>
                                        <div className="card-image">
                                            <img style={{height:"200px"}} src={item.bookImage} alt={item.bookName}/>
                                        </div>
                                        <div style={{margin:"20px auto",alignItems:"center"}}>
                                            <div className="book-name">{item.bookName}</div>
                                            <div style={{margin:"0px auto",fontStyle:"italic",fontSize:"13px",textAlign:"center"}}>By {item.authorName}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                       
                    
                </div>
                
            </div>
        </div>
        : <h2>Loading!...</h2>
            }
        
        </React.Fragment>
    )
}

export default OtherUser