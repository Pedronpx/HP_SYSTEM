//LOGIN E CADASTRO
import React, { useState } from 'react';
import './Login.css';

function App() {

  const [activeLabel, setActiveLabel] = useState({
    nome: false,
    sobrenome: false,
    email: false,
    senha: false,
  });
  const [contaCriada, setContaCriada] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e) => {
    const $this = e.target;
    const label = $this.previousSibling;
    const inputName = $this.getAttribute('name');
    const isFilled = $this.value !== '';
    setActiveLabel((prevLabels) => ({
      ...prevLabels,
      [inputName]: isFilled,
    }));
  };

  //OCULTAR A SENHA
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTabClick = (e) => {
    e.preventDefault();
    const tab = e.target.parentElement;
    const tabs = Array.from(tab.parentElement.children);

    tabs.forEach((tab) => tab.classList.remove('active'));
    tab.classList.add('active'); // Use classList.add here to add the 'active' class
    
    const target = e.target.getAttribute('href');
    const tabContents = Array.from(document.querySelectorAll('.tab-content > div'));

    tabContents.forEach((content) => (content.style.display = 'none'));
    
    document.querySelector(target).style.display = 'block';
  };

  return (
    <div className="container">
     {/* LOGO */}
      <div className="left-container">
        <div className="image-container">
          <img 
            src={require('./HP CALCULATOR - BLACK.png')}
            alt="Logo da minha página"
            className="centered-image"
          />
        </div>
      </div>
      {/* HEADER, CRIAÇÃO DE CONTA E LOGIN. */}
      <div className="form">
        <ul className="tab-group">
          <li className="tab active">
            <a href="#signup" onClick={handleTabClick}>
              Criar Conta
            </a>
          </li>
          <li className="tab">
            <a href="#login" onClick={handleTabClick}>
              Login
            </a>
          </li>
        </ul>
{/* ABA DE CRIAÇÃO DE CONTA */}
        <div className="tab-content">
          <div id="signup">
            <h1>Crie sua conta</h1>
            
        <form action="http://localhost:8000/Login" method="post">
              <div className="top-row">
              <div className="field-wrap">
          <label className={activeLabel.nome ? 'active highlight' : ''}>
            Nome<span className="req">*</span>
          </label>
          <input
            type="text"
            name="nome"
            required
            autoComplete="off"
            onKeyUp={handleInput}
            onBlur={handleInput}
            onFocus={handleInput}
          />
        </div>
            
                <div className="field-wrap">
                <label className={activeLabel.sobrenome ? 'active highlight' : ''}>
            Sobrenome<span className="req">*</span>
          </label>
          <input
            type="text"
            name="sobrenome"
            required
            autoComplete="off"
            onKeyUp={handleInput}
            onBlur={handleInput}
            onFocus={handleInput}
          />
                </div>
              </div>

              <div className="field-wrap">
              <label className={activeLabel.email? 'active highlight' : ''}>
            Email<span className="req">*</span>
          </label>
          <input
            type="text"
            name="email"
            required
            autoComplete="off"
            onKeyUp={handleInput}
            onBlur={handleInput}
            onFocus={handleInput}
          />
              </div>
              
              <div className="field-wrap">
              <div className="field-wrap">
          <label className={activeLabel.senha ? 'active highlight' : ''}>
            Senha<span className="req">*</span>
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="senha"
            required
            autoComplete="off"
            onKeyUp={handleInput}
            onBlur={handleInput}
            onFocus={handleInput}
          />
          <button type="button" className="custom-button" onClick={handleShowPassword}>
            {showPassword ? 'Ocultar Senha' : 'Mostrar Senha'}
          </button>
        </div>
              </div>
              
              {contaCriada ? (
  <div className="conta-criada">
    Conta Criada
  </div>
) : (
  <button
    type="submit"
    className="button button-block"
    onClick={(e) => {
      e.preventDefault();
      // VERIFICA SE TODOS OS CAMPOS FORAM PREENCHIDOS
      if (
        activeLabel.nome &&
        activeLabel.sobrenome &&
        activeLabel.email &&
        activeLabel.senha
      ) {
        setContaCriada(true);
      }
    }}
  >
    Criar Conta
  </button>
)}
     {/* LOGIN */}
        </form>
          </div>
          
          <div id="login">   
            <h1>Bem Vindo!</h1>
            
            <form action="http://localhost:8000/Login" method="post">
              <div className="field-wrap">
              <label className={activeLabel.email? 'active highlight' : ''}>
            Email<span className="req">*</span>
          </label>
          <input
            type="text"
            name="email"
            required
            autoComplete="off"
            onKeyUp={handleInput}
            onBlur={handleInput}
            onFocus={handleInput}
          />
              </div>
              
              <div className="field-wrap">
          <label className={activeLabel.senha ? 'active highlight' : ''}>
            Senha<span className="req">*</span>
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="senha"
            required
            autoComplete="off"
            onKeyUp={handleInput}
            onBlur={handleInput}
            onFocus={handleInput}
          />
          <button type="button" className="custom-button" onClick={handleShowPassword}>
            {showPassword ? 'Ocultar Senha' :'Mostrar Senha'}
          </button>
        </div>
              
              <p className="forgot"><a href="#">Esqueceu a senha?</a></p>
      
      <button className="button button-block">
      Entrar
      </button>
      
     
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
