import {BrowserRouter, Route, Routes} from 'react-router-dom';

import DetailPage from "./components/detailPage";
import GalleryView from "./components/galleryView";
import ListView from "./components/listView";
import Navbar from "./components/navbar";
import './App.css';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Navbar navTitle="Pokédex"/>
        <Routes>
          <Route exact path="/" element={<ListView />}/>
          <Route path="/gallery" element={<GalleryView />}/>
          <Route path="/detail" element={<DetailPage />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
