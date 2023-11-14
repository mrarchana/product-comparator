import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
const Result = () => {
  let location = useLocation();
  const [flipkart, setflipkart] = useState([]);
  const [amazon, setamazon] = useState([]);
  const [sel_flip, setsel_flip] = useState([]);
  const [sel_amaz, setsel_amaz] = useState([]);
  var { isFetching } = useQuery(["res"], () => {
    return axios
      .post("http://localhost:5000/result", { res: location.state.search })
      .then((res) => {
        setflipkart(res.data.flipkart);
        setamazon(res.data.amazon);
        setsel_flip(res.data.flipkart[0]);
        setsel_amaz(res.data.amazon[0]);
      })
      .then(() => {
        return 1;
      });
  });
  const handleChange_f = (event) => {
    setsel_flip(flipkart[event.target.value]);
  };
  const handleChange_a = (event) => {
    setsel_amaz(amazon[event.target.value]);
  };
  return (
    <div>
      {isFetching ? (
        <div className="loader"></div>
      ) : (
        <div>
          <div className="container">
            <table>
              <thead>
                <tr>
                  <th>Flipkart</th>
                  <th>Amazon</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="container-item">
                      {
                        <label>
                          <select
                            className="dropdown"
                            onChange={handleChange_f}
                          >
                            {flipkart.map((flip, i) => (
                              <option key={i} value={i}>
                                {flip.title}
                              </option>
                            ))}
                          </select>
                        </label>
                      }
                      <br />
                      <img src={sel_flip.img} alt="Product" className="img" />
                      <p className="price">Price: {sel_flip.price}</p>
                      <a
                        className="visit"
                        href={sel_flip.f_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit
                      </a>
                    </div>
                  </td>
                  <td>
                    <div className="container-item">
                      {
                        <label>
                          <select
                            className="dropdown"
                            onChange={handleChange_a}
                          >
                            {amazon.map((amaz, i) => (
                              <option key={i} value={i}>
                                {amaz.title}
                              </option>
                            ))}
                          </select>
                        </label>
                      }
                      <br />
                      <img src={sel_amaz.img} alt="Product" className="img" />
                      <p className="price">Price: {"₹" + sel_amaz.price}</p>
                      <a
                        className="visit"
                        href={sel_amaz.a_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <footer>
            <NavLink id="foot" to="/Feedback">
              Feedback
            </NavLink>
          </footer>
        </div>
      )}
    </div>
  );
};
export default Result;
