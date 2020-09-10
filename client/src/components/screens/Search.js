import React, { useEffect,useState } from 'react'
import { useLocation,Link } from 'react-router-dom'

const Search = () => {
    // const location = useLocation()
    const location = useLocation()
    const [query,setQuery] = useState()
    const [searchResult,setSearchResult] = useState([])

    useEffect(()=>{
        
        setQuery(location.state.query)
        if(query){
            console.log("query in useEffect",query)
            fetch('/search',{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    query:query
                })
            })
            .then(res=>res.json())
            .then(result=>{
                console.log(result)
                if(result.userBook){
                    setSearchResult(result.userBook)
                    setQuery("")
                }
                if(result.book){
                    setSearchResult(result.book)
                    setQuery("")
                }
                if(!result.book && !result.userBook){
                    setSearchResult([])
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },[location,query])
    
    return (
        
        <div>
            {searchResult.length !== 0 ? 
                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around", margin:"110px 3%"}}>
                {
                    searchResult.map(item => {
                        return (
                            <div className="card bookCard" style={{height:"350px",padding:"0.7%",overflow:"hidden",margin:"20px 1% 20px 1%",backgroundColor:"#FCF0EE"}} key={item._id}>
                                <Link to={`/book/${item._id}`} >
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
                
            :
            <div style={{width:"60%",margin:"140px auto"}}>
               <div className="card" style={{width:"100%",backgroundColor:"#eee"}}>
                    <p style={{margin:"2%",fontSize:"7vh",fontWeight:"bold",textAlign:"center"}}>NO RESULT TO SHOW</p>
                </div>
            </div>
            }
        </div>   
    )
}

export default Search