import React from 'react';
import { useEffect, useState } from "react";
import {createRoot} from 'react-dom/client';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Container, CardGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import './listView.scss';

function App() {
    const navigate = useNavigate();
    const goTO = (num) => {
        navigate("/detail#" + num);
    }
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [searchType, setSearchType] = useState("all");
    useEffect(() => {
        const loadPosts = async() => {
            setLoading(true);
            let boxes = [];
            for (let i = 1; i < 906; i++){
                const result = await axios.get('https://pokeapi.co/api/v2/pokemon/' + i)
                let list_types = [];
                result.data.types.forEach(el => {
                    list_types.push(el.type.name);
                  });
                let set_types = new Set(list_types);
                let box = [result.data.id, result.data.name, result.data.sprites.front_default, result.data.height, result.data.weight, set_types]
                boxes.push(box);
            }
            setPosts(boxes);
            setLoading(false);
        }
        loadPosts();
    },[])
    const getColumnsForRow =()=>{ 
        let items = posts.filter((value) => {
            if (searchType === "all") {
              return value[1];
            } else if (
              value[5].has(searchType)
            ) {
              return value[1];
            }
          }).map((post, index) => {
          return ( 
            <Col>
            <Card key = {post[0]} onClick={() => {goTO(post[0])}}>
                <Card.Img src={post[2]} />
                <Card.Body>
                <Card.Title>#{post[0]}</Card.Title>
                <Card.Text>{post[1]}</Card.Text>
                </Card.Body>
                    
            </Card>
            </Col>
         );
   
        });
        return items;
    };
    return (
        <div id='list-container'>
          <h3>View Pokédex</h3>
          <div>
            <label for="sort" className="text">Types:</label>
            <select id="sort" onChange={(e) => setSearchType(e.target.value)}>
                <option value="all">All</option>
                <option value="normal">Normal</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="grass">Grass</option>
                <option value="electric">Electric</option>
                <option value="ice">Ice</option>
                <option value="fighting">Fighting</option>
                <option value="poison">Poison</option>
                <option value="ground">Ground</option>
                <option value="flying">Flying</option>
                <option value="psychic">Psychic</option>
                <option value="bug">Bug</option>
                <option value="rock">Rock</option>
                <option value="ghost">Ghost</option>
                <option value="dark">Dark</option>
                <option value="dragon">Dragon</option>
                <option value="steel">Steel</option>
                <option value="fairy">Fairy</option>
            </select>
          </div>
          <br></br>
          <Container>
            <Row xs={1} md={6}>
                {loading ? (
        <h5>Finding Pokémon ...</h5>
      ) : (getColumnsForRow())}
            </Row>
            </Container>

        </div>
      );
}
  export default App;