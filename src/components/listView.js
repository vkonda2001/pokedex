import React from 'react';
import { useEffect, useState } from "react";
import {createRoot} from 'react-dom/client';
import axios, * as others from 'axios';
import { useNavigate } from "react-router-dom";

import './listView.scss';

function App() {
    const navigate = useNavigate();
    const goTO = (num) => {
        navigate("/detail#" + num);
    }
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [sortName, setSortName] = useState("");

   
    useEffect(() => {
        const loadPosts = async() => {
            setLoading(true);
            let lv = [];
            for (let i = 1; i < 906; i++){
                const result = await axios.get('https://pokeapi.co/api/v2/pokemon/' + i)
                let row = [result.data.id, result.data.name, result.data.height, result.data.weight]
                lv.push(row)
            }
            
            switch (sortName) {
                case "heightA":
                  lv.sort(
                    function(a, b){return a[2] - b[2]}
                  );
                  break;
                case "heightD":
                  lv.sort(
                    function(a, b){return b[2] - a[2]}
                  );
                  break;
                case "weightA":
                    lv.sort(
                        function(a, b){return a[3] - b[3]}
                    );
                break;
                case "weightD":
                    lv.sort(
                        function(a, b){return b[3] - a[3]}
                    );
                break;
                case "speciesA":
                    lv.sort(
                        function(a, b){return a[1].toUpperCase().localeCompare(b[1].toUpperCase())}
                    );
                  break;
                case "speciesD":
                  lv.sort(
                    function(a, b){return a[1].toUpperCase().localeCompare(b[1].toUpperCase())}
                  );
                  lv.reverse();
                  break;
                case "----":
                  lv.sort(
                    function(a, b){return a[0] - b[0]}
                  );
              }
            setPosts(lv);
            setLoading(false);
        }
        
        loadPosts();
    }, [sortName]);

    function handleChange(e){
        console.log(e.target.value)
        setSortName(e.target.value);
    }
    return (
        <div className="App">
            <div class="container">
                <div class="text">
                    <h3>Search Pokédex</h3>
                </div>
                <div class="image">
                    <img src={require("./images/Poké_Ball_icon.png")}></img>
                </div>
            </div>
            <input
                style={{ width: "30%", height: "25px" }}
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchName(e.target.value)}
            />
            <select id="sort" onChange={handleChange}>
                <option value="----">--Sort By--</option>
                <option value="heightA">Height Ascending</option>
                <option value="heightD">Height Descending</option>
                <option value="weightA">Weight Ascending</option>
                <option value="weightD">Weight Descending</option>
                <option value="speciesA">Species Ascending</option>
                <option value="speciesD">Species Descending</option>
            </select>    
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        <table class="styled-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Species</th>
                    <th>Height</th>
                    <th>Weight</th>
                    <th>Detail</th>
                </tr>
            </thead>
            <tbody>
          {loading ? (
            <h4>Finding Pokémon ...</h4>
          ) : (
            posts
              .filter((value) => {
                if (searchName === "") {
                  return value[1];
                } else if (
                  value[1].toLowerCase().includes(searchName.toLowerCase())
                ) {
                  return value[1];
                }
              })
              .map((item) => <tr onClick={() => {goTO(item[0])}}>
                <td>{item[0]}</td>
                <td>{item[1].charAt(0).toUpperCase() + item[1].slice(1)}</td>
                <td>{item[2]}</td>
                <td>{item[3]}</td>
                <td>click</td>
              </tr>
              )
          )}
          </tbody>
        </table>
        </div>
      );
  }
  
  export default App;