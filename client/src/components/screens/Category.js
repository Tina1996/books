import React, { useEffect,useState } from 'react'
import { useParams,Link } from 'react-router-dom'

const Category = () => {
    let category = useParams()
    
    category = category["category"]
    const [books,setBooks] = useState([])

    useEffect(()=>{
        if(category){
            // console.log("sfsfs",category)
        fetch(`/category/${category}`)  
        .then(res=>res.json())
        .then(result=>{
            // console.log("result",result)
            setBooks(result.books)
        })
        .catch(err=>{
            console.log(err)
        })
        }
    },[category])

    return(
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around", margin:"100px 3%"}}>
            {/* {console.log("cat books",books)} */}
            {
                books ?
                books.map(item => {
                    return (
                        <div className="card bookCard" style={{height:"350px",padding:"0.7%",margin:"20px 1% 20px 1%",backgroundColor:"#FCF0EE"}} key={item._id}>
                            <Link to={`/book/${item._id}`} >
                            <div className="card-image">
                                <img style={{height:"230px"}} src={item.bookImage} alt={item.bookName}/>
                            </div>
                            <div style={{margin:"20px auto",alignItems:"center"}}>
                                <div className="book-name">{item.bookName}</div>
                                <div style={{margin:"0px auto",fontStyle:"italic",fontSize:"13px",textAlign:"center"}}>By {item.authorName}</div>
                            </div>
                            </Link>
                        </div>
                    )
                }) :
                <h2>Loading!!!</h2>
            }            
        </div>
    )
}

export default Category