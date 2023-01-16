import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';
import './style.css';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){

    if(input == ''){
      alert("Preencha algum cep!");
      return
    }

    try{
      const respose = await api.get(`${input}/json`)
      setCep(respose.data);
      setInput("");

    }catch{
      alert("Ops, erro ao buscar")
      setInput("")
    }
  }

  return (
    <div className="container my-5 text-center">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput my-5">
        <input type="text" value={input} onChange={ (e) => setInput(e.target.value) } className="form-control w-25 d-inline inputCEP" placeholder="Digite seu cep..."/>

        <button className="buttonSearch btn" onClick={handleSearch}> 
          <FiSearch size={25} color="black"/> 
        </button>

      </div>


      {Object.keys(cep).length > 0 &&(
        <main className="main">
        <h2>CEP: {cep.cep}</h2>

        <p>{cep.logradouro}</p>
        <p>{cep.complemento}</p>
        <p>{cep.bairro}</p>
        <p>{cep.localidade} - {cep.uf}</p>
      </main>
      )}
      

    </div>
  );
}

// viacep.com.br/ws/25046160/json/

export default App;
