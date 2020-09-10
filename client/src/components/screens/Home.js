import React,{useState,useEffect,useContext} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../../App'

const Home = () => {

    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)

    useEffect(()=>{
        
        fetch('/allBooks',{
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.books)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    return(
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around", margin:"110px 3%"}}>
            {
                data.map(item => {
                    return (
                        <div className="card bookCard" style={{height:"350px",padding:"0.7%",overflow:"hidden",margin:"20px 1% 20px 1%",backgroundColor:"#FCF0EE"}} key={item._id}>
                            <Link to={state?`/book/${item._id}`:`/login`} >
                            <div className="card-image">
                                <img style={{height:"230px"}} src={item.bookImage} alt={item.bookName} />
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
    )
} 

export default Home