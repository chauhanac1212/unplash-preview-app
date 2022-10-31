import React, { useState, useEffect } from "react";
import './Commen.css'
import Images from "./Images";
// import Pagination from '@material-ui/lab/Pagination';
const  REACT_APP_KEY=`fNZxU3j0BwP87u2Fco6aFSZOkn-4S9kmkx9bGH5nq3s`
const clientID = `?client_id=${REACT_APP_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;
const  Commen=()=> {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  // const [pagination, setpagination]=useState()
 
  // const handelchange=(event,pags)=>{
  //   setpagination(pages)
  // }
  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
        
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        (!loading && window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });

    return () => window.removeEventListener("scroll", event);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}
  className="example"
  style={{ margin: "auto", maxWidth: "300px", marginTop: "30px" }}>
  <input
    className="input"
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}  
      required
  />
  <button type="sumbit">
    <i className="fa fa-search"></i>
  </button>
</form>

        {
          loading ? (
          <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
          </div>)
          :(
      <div className="row">
         {photos.map((image, index) => {
         return(
          <Images key={index} img={image.urls.regular}/>
         )
         }
          
        )}
      </div>
      
       ) }
        {/* <div style={{ display: 'flex', padding: 30,alignItems:"center",justifyContent:"center" }}> */}
      {/* <h4>How to use Pagination Component in ReactJS?</h4> */}
      {/* <Pagination count={counts}  /> */}
{/*      
  <Pagination count={5} onChange={handelchange}/>
    </div> */}
    </div>
  );
}

export default Commen;