import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
const Home = () => {
  const [search, setsearch] = useState("");
  const [flipkart, setflipkart] = useState([]);
  const [amazon, setamazon] = useState([]);
  const navigate = useNavigate();
  var { isFetching, remove } = useQuery(["off"], async () => {
    return axios
      .get("http://localhost:5000/home")
      .then((res) => {
        setflipkart(res.data.flipkart);
        setamazon(res.data.amazon);
        console.log(res);
      })
      .then(() => {
        return 1;
      });
  });
  useEffect(() => {
    return () => remove();
  }, []);
  function Result(e) {
    e.preventDefault();
    navigate("/result", { state: { search } });
  }
  return (
    <div className="home">
      <form onSubmit={Result}>
        <input
          type="text"
          name="search"
          id="search"
          required={true}
          placeholder="Enter the product"
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        ></input>
        <button type="submit" className="btn">
          <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
        </button>
      </form>

      {isFetching ? (
        <div className="loader"></div>
      ) : (
        <div className="offer-container">
          <h2 className="offer-title">Top Offers</h2>
          <div className="scroll-container">
            <h3 className="scroll-title">Flipkart</h3>
            <div className="scrollmenu">
              {flipkart.map((flip, i) => (
                <div className="scrl_item" key={i}>
                  <a
                    className="visit-off"
                    href={flip.f_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={i + 4}
                  >
                    <h4 className="title-off" key={i + 1}>
                      {flip.title}
                    </h4>
                    <img
                      src={flip.img}
                      alt="Product"
                      className="img-off"
                      key={i + 2}
                    />
                    <p className="price-off" key={i + 3}>
                      {flip.price}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="scroll-container">
            <h3 className="scroll-title">Amazon</h3>
            <div className="scrollmenu">
              {amazon.map((amaz, i) => (
                <div className="scrl_item" key={i}>
                  <a
                    className="visit-off"
                    href={amaz.a_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={i + 3}
                  >
                    <img
                      src={amaz.img}
                      alt="Product"
                      className="img-off"
                      key={i + 1}
                    />
                    <p className="price-off" key={i + 2}>
                      {amaz.price}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
