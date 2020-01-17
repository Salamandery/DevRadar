import React, { useState, useEffect } from "react";
import api from "./services/api";

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

import "./global.css";
import "./App.css";
import "./SideBar.css";
import "./main.css";

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const res = await api.get("/devs");

      if (res.data) setDevs(res.data);
    }

    loadDevs();
  }, []);

  async function handleSubmit(data) {
    const res = await api.post("/devs", data);

    setDevs([...devs, res.data]);
  }
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmit} />
      </aside>
      <main>
        <ul>
          {devs
            ? devs.map(dev => (
                <DevItem key={dev._id} dev={dev} />
              ))
            : null}
        </ul>
      </main>
    </div>
  );
}

export default App;
