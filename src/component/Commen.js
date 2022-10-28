import React, { useEffect, useState } from "react";
import axios from "axios";
import Images from "./Images";
import "./Commen.css";
const Commen = () => {
  const [loading, setLoading] = useState(false);
  const [dataa, setdataa] = useState([]);
  const [input, setinput] = useState("");
  const [search, setsearch] = useState("dog");
  const Apical = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.unsplash.com/search/photos?page=1&query=${search}&client_id=fNZxU3j0BwP87u2Fco6aFSZOkn-4S9kmkx9bGH5nq3s`
      );
      setdataa(res.data.results);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    Apical();
  }, [search]);
  const sumbit = (e) => {
    e.preventDefault();
    setsearch(input);
  };
  return (
    <div className="container">
      <form
      onSubmit={sumbit}
        className="example"
        style={{ margin: "auto", maxWidth: "300px", marginTop: "30px" }}
      >
        <input
          className="input"
          type="text"
          value={input}
          onChange={(e) => setinput(e.target.value)}
          required
        />
        <button type="submit">
          <i class="fa fa-search"></i>
        </button>
      </form>
      <h1>Results for {search || "dog"}</h1>
      <div>
        {loading ? (
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="row">
            {dataa.map((cur, index) => {
              return   <Images img={cur.urls.small_s3} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Commen;
