import React from 'react';
import axios, * as others from 'axios';
import {useLocation} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import { useNavigate } from "react-router-dom";

import './detailPage.scss'
function App() {
    const navigate = useNavigate();
    const goTO = (num) => {
      navigate("/detail#" + num);
    }
  
    const pageURL = useLocation();
    const pokeid = parseInt(pageURL.hash.replace('#', ''));
    let info;
    const fetchData = async (index) => {
      const result = await axios.get('https://pokeapi.co/api/v2/pokemon/' + index)
      let typeString = '';
      result.data.types.forEach(el => {
        if (typeString.length !== 0) {
          typeString += ", ";
        }
        typeString += el.type.name;
      });
      let HP = 0;
      let attack = 0;
      let defense = 0;
      let spec_attack = 0;
      let x = 0;
      result.data.stats.forEach(el => {
        if (x==0){
            HP = el.base_stat;
        } 
        if (x==1){
            attack = el.base_stat;
        } 
        if (x==2){
            defense = el.base_stat;
        }
        if (x==3){
            spec_attack = el.base_stat;
        }
        x+=1;
      })
      info = 
      <div id="info-container">
        <div id="pokedex">
        <div id="left">
            <div id="logo"></div>
            <div id="bg_curve1_left"></div>
            <div id="bg_curve2_left"></div>
            <div id="curve1_left">
            <div id="buttonGlass">
                <div id="reflect"> </div>
            </div>
            <div id="miniButtonGlass1"></div>
            <div id="miniButtonGlass2"></div>
            <div id="miniButtonGlass3"></div>
            </div>
            <div id="curve2_left">
            <div id="junction">
                <div id="junction1"></div>
                <div id="junction2"></div>
            </div>
            </div>
            <div id="screen">
            <div id="topPicture">
                <div id="buttontopPicture1"></div>
                <div id="buttontopPicture2"></div>
            </div>
            <div id="picture">
                <img src={result.data.sprites.front_default} height="300" />
            </div>
            </div>
        </div>
        <div id="right">
            <div id="stats">
            <strong>ID:</strong> {result.data.id}<br/>
            <strong>Species:</strong> {result.data.name.charAt(0).toUpperCase()+result.data.name.slice(1)}<br/>
            <strong>Type(s):</strong> {typeString}<br/>
            <strong>Height:</strong> {result.data.height}'<br/>
            <strong>Weight:</strong> {result.data.weight} lbs<br/>
            <strong>HP:</strong> {HP}<br/>
            <strong>Attack:</strong> {attack}<br/>
            <strong>Defense:</strong> {defense}<br/>
            <strong>Special Attack:</strong> {spec_attack}<br/>
            </div>
            <div id="bg_curve1_right"></div>
            <div id="bg_curve2_right"></div>
            <div id="curve1_right"></div>
            <div id="curve2_right"></div>
        </div>
        </div>    
      </div>;
    };
    React.useEffect(() => { 
        if (pageURL.hash !== '') {
          fetchData(pokeid);
          const dataHolder = createRoot(document.getElementById("poke-data"));
          setTimeout(() => {dataHolder.render(info);}, 250);
        }
      });
    const prevPoke = () => {
      goTO(pokeid - 1);
    }
    const nextPoke = () => {
      goTO(pokeid + 1);
    }
  
    return (
      <div id='detailPage-container'>
        <button class="button" onClick={prevPoke}>Previous</button>
        <button class="button" onClick={nextPoke}>Next</button>
        <div id="poke-data"></div>
      </div>
    );
  }
  
  export default App;