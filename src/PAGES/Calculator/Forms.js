//DADOS GERAIS
import React, { useEffect, useState } from 'react';
import MaskedInput from 'react-text-mask';
import './Forms.css';

function App() {
  //DECLARAÇÃO DAS  VARIÁVEIS
  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [documentoValido, setDocumentoValido] = useState(true);
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [medicamentos, setMedicamentos] = useState([]);
  const [novoMedicamento, setNovoMedicamento] = useState('');
  const [cid, setCID] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [doseAnticolinergica, setDoseAnticolinergica] = useState(0);
  const [doseSedativa, setDoseSedativa] = useState(0); 
  const [categoriaIMC, setCategoriaIMC] = useState(null);
  const [sobrecargaCondicao, setSobrecargacondicao] = useState(null);
  const [imc, setIMC] = useState(null);
  const [resultadoDBI, setResultadoDBI] = useState(null);
  //FUNÇÂO TOGGLER
  const PATH = {
    closeToggler: ".toggler-close",
    expandableNav: ".main-nav__expandable",
    navItem: ".main-nav__item",
    openToggler: ".toggler-open"
  };

  const editDataAttr = (elem, dataAttr, newVal) => {
    elem.dataset[dataAttr] = newVal;
  };

 // VALIDAÇÃO DO CPF
  function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || cpf.match(/(\d)\1{10}/)) {
      return false;
    }

    let add = 0;
    for (let i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
      rev = 0;
    }

    if (rev !== parseInt(cpf.charAt(9))) {
      return false;
    }

    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i)) * (11 - i);
    }

    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
      rev = 0;
    }

    if (rev !== parseInt(cpf.charAt(10))) {
      return false;
    }

    return true;
  }
  const handleDocumentoChange = (e) => {
    const valorDocumento = e.target.value;
    setDocumento(valorDocumento);
    setDocumentoValido(validarCPF(valorDocumento));
  };

//FUNÇÕES DO NAVBAR
  const setDataAttrsToNavElems = () => {
    const navElems = document.querySelectorAll(PATH.navItem);

    navElems.forEach((elem, index) => {
      editDataAttr(elem, "addText", `0${index + 1}`);
    });
  };

  useEffect(() => {
    setDataAttrsToNavElems();

    
    const handleBodyClick = (e) => {
      const target = e.target;

      if (target.closest(PATH.openToggler)) {
        const nav = document.querySelector(PATH.expandableNav);
        nav.classList.add("js-open");
      }

      if (target.closest(PATH.closeToggler)) {
        const nav = document.querySelector(PATH.expandableNav);
        nav.classList.remove("js-open");
      }
    };

    document.body.addEventListener("click", handleBodyClick);

    
    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);
// FUNÇÕES DE ADICIONAR OS MEDICAMENTOS
  const adicionarMedicamento = () => {
    if (novoMedicamento.trim() === '') {
      alert('Por favor, insira o nome do medicamento.');
      return;
    }
    // Adicione o medicamento formatado.
    setMedicamentos([...medicamentos, novoMedicamento]);

    // Limpe o campo de entrada
    setNovoMedicamento('');
  };
//CÁLCULO DO DRUG BURDEN INDEX
    const calcularDBI = () => {
      if (medicamentos.length === 0) {
        alert('Por favor insira  um medicamento para calcular o DBI.');
        return;
      }
      // Calcula o DBI somando as doses anticolinérgicas e sedativas, Formula Sarah Hilmer
      const dbi = (doseAnticolinergica / 1000) + (doseSedativa / 1000);
      setResultadoDBI(dbi);
      // Informa a condição da sobrecarga de acordo com o resultado do DBI
      let sobrecargaCondicao = '';
      if (dbi === 0) {
        sobrecargaCondicao = 'Sem sobrecarga';
      } else if (dbi > 0 && dbi < 1) {
        sobrecargaCondicao = 'Baixa sobrecarga';
      } else if (dbi >= 1 && dbi < 2) {
        sobrecargaCondicao = 'Alta sobrecarga';
      }
      setSobrecargacondicao(sobrecargaCondicao);
      
    };
    //FORMATAÇÃO DOS DADOS DE IMC
    const formatarNumero = (valor) => {
        // Remove caracteres não numéricos, exceto a vírgula
        const numeroLimpo = valor.replace(/[^\d,]/g, '');
      
        // Divide o número em partes inteiras e decimais
        const partes = numeroLimpo.split(',');
      
        // Formata as partes inteiras adicionando uma vírgula a cada três dígitos
        partes[0] = partes[0].replace(/\B(?=(\d{2})+(?!\d))/g, ',');
      
        // Recria o número com as partes formatadas
        const numeroFormatado = partes.join(',');
      
        return numeroFormatado;
      };
    
  
  //CÁLCULO DO ÍNDICE DE MASSA CORPORAL
    const calcularIMC = () => {
      const pesoFloat = parseFloat(peso.replace(',', '.'));
      const alturaFloat = parseFloat(altura.replace(',', '.'));
    
      if (isNaN(pesoFloat) || isNaN(alturaFloat) || alturaFloat === 0) {
        alert('Peso e altura devem ser números válidos maiores que zero.');
        return;
      }
    
      const imcCalculado = pesoFloat / (alturaFloat * alturaFloat);
      setIMC(imcCalculado.toFixed(2));
    
      let categoriaIMC = '';
    
      if (imcCalculado < 17) {
        categoriaIMC = 'Muito abaixo do peso';
      } else if (imcCalculado >= 17 && imcCalculado < 18.5) {
        categoriaIMC = 'Abaixo do peso';
      } else if (imcCalculado >= 18.5 && imcCalculado < 25) {
        categoriaIMC = 'Peso normal';
      } else if (imcCalculado >= 25 && imcCalculado < 30) {
        categoriaIMC = 'Acima do peso';
      } else if (imcCalculado >= 30 && imcCalculado < 35) {
        categoriaIMC = 'Obesidade I';
      } else if (imcCalculado >= 35 && imcCalculado < 40) {
        categoriaIMC = 'Obesidade II (severa)';
      } else {
        categoriaIMC = 'Obesidade III (mórbida)';
      }
    
      setCategoriaIMC(categoriaIMC);
    };
    

  //LIMPA O INPUT DOS MEDICAMENTOS 
  const LimparMed = () => {
    setMedicamentos([]);
    setNovoMedicamento('');
  };
//LIMPA TODOS OS DADOS DO FORMULÁRIO
    const limparDados = () => {
      setNome('');
      setIdade('');
      setSexo('');
      setDocumento('');
      setDocumentoValido('');
      setMedicamentos([]);
      setNovoMedicamento('');
      setCID('');
      setPeso('');
      setAltura('');
      setCategoriaIMC('');
      setDoseAnticolinergica(0);
      setDoseSedativa(0);
      setIMC(null);
      setResultadoDBI(null);
    };
//FORMATAÇÃO DOS MEDICAMENTOS
    const handleMedicamentoChange = (e) => {
      // Substitua espaços por hífens no novo medicamento
      const novoValor = e.target.value.replace(/\s+/g, '-');
      setNovoMedicamento(novoValor);
    };
  return (
    //PARTE PRINCIPAL - IMPLEMENTAÇÃO DOS DADOS GERAIS
    <div className="App">
          <header className="header">
        <h1 className="header__title">DADOS GERAIS</h1>
      </header>
      <form>
      <p>
      </p>
      <p>

      </p>
        <div className="form-group">
          <label htmlFor="nome">Nome do Paciente:</label>
  <input
    type="text"
    id="nome"
    className="form-control"
    value={nome}
    onChange={(e) => {
      const inputValue = e.target.value;
      if (!/^\D+$/.test(inputValue)) {
        return;
      }
      setNome(inputValue);
    }}
    required
  />
        </div>
        <div className="form-group">
          <label htmlFor="idade">Idade do Paciente:</label>
          <input
            type="number"
            id="idade"
            className="form-control"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="documento">Documento de Identificação (CPF):</label>
                <MaskedInput
          id="documento"
            className={`form-control ${documentoValido ? '' : 'is-invalid'}`}
            value={documento}
            onChange={handleDocumentoChange}
            required
            mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
          placeholder="Ex: 132.465.798-01"
        />
          {!documentoValido && <div className="invalid-feedback">Documento inválido.</div>}
        </div>
        <div className="form-group">
          <label htmlFor="sexo">Sexo do Paciente:</label>
          <select
            id="sexo"
            className="form-control"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            required
          >
            <option value="">Selecione o sexo</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
        </div>
        <div className="form-group">
        <label htmlFor="medicamentos">Medicamentos que o Paciente toma:</label>
        <ul className="medicamentos-list">
          {medicamentos.map((medicamento, index) => (
            <li key={index}>{medicamento}</li>
          ))}
        </ul>
        <input
          type="text"
          id="medicamentos"
          className="form-control"
          value={novoMedicamento}
          onChange={handleMedicamentoChange}
        />
          <button type="button" onClick={adicionarMedicamento} className="btn btn-primary">
            Adicionar Medicamento
          </button>
          <button type="button" onClick={LimparMed} className="btn btn-primary">
           Limpar
          </button>
          </div>
          <div className="form-group">
          <label htmlFor="doseAnticolinergica">Dose Anticolinérgica(mg):</label>
          <input
            type="number"
            id="doseAnticolinergica"
            className="form-control"
            value={doseAnticolinergica}
            onChange={(e) => setDoseAnticolinergica(parseFloat(e.target.value))}
            required
          />
          </div>
        <div className="form-group">
          <label htmlFor="doseSedativa">Dose Sedativa:</label>
          <input
            type="number"
            id="doseSedativa"
            className="form-control"
            value={doseSedativa}
            onChange={(e) => setDoseSedativa(parseFloat(e.target.value))}
            required
          />
            <button type="button" onClick={calcularDBI} className="btn btn-success">
          Calcular DBI
        </button>
        {resultadoDBI !== null && (
          <div className="result-container">
            <p>{resultadoDBI.toFixed(2)}</p>
          </div>
        )}

    <div className="result-c">
    <p>{sobrecargaCondicao}</p>
  </div>
  </div>
       <div className="form-group">
        <div className="select-cid"> 
  <label htmlFor="cid">CID (Classificação Internacional de Doenças):</label>
  <select
    id="cid"
    className="form-control"
    value={cid}
    onChange={(e) => setCID(e.target.value)}
    required
  >
    <option value="">Selecione a categoria</option>
    <option value="Nenhuma">Nenhuma</option>
    <optgroup label="I - Algumas doenças infecciosas e parasitárias">
      <option value="A00 a B99">A00 a B99 - Algumas doenças infecciosas e parasitárias</option>
    </optgroup>
    <optgroup label="II - Neoplasmas (tumores)">
      <option value="C00 a D48">C00 a D48 - Neoplasmas (tumores)</option>
    </optgroup>
    <optgroup label="III - Doenças do sangue e dos órgãos hematopoéticos e alguns transtornos imunitários">
      <option value="D50 a D89">D50 a D89 - Doenças do sangue e dos órgãos hematopoéticos e alguns transtornos imunitários</option>
    </optgroup>
    <optgroup label="IV - Doenças endócrinas, nutricionais e metabólicas">
      <option value="E00 a E90">E00 a E90 - Doenças endócrinas, nutricionais e metabólicas</option>
    </optgroup>
    <optgroup label="V - Transtornos mentais e comportamentais">
      <option value="F00 a F99">F00 a F99 - Transtornos mentais e comportamentais</option>
    </optgroup>
    <optgroup label="VI - Doenças do sistema nervoso">
      <option value="G00 a G99">G00 a G99 - Doenças do sistema nervoso</option>
    </optgroup>
    <optgroup label="VII - Doenças do olho e anexos">
      <option value="H00 a H59">H00 a H59 - Doenças do olho e anexos</option>
    </optgroup>
    <optgroup label="VIII - Doenças do ouvido e da apófise mastóide">
      <option value="H60 a H95">H60 a H95 - Doenças do ouvido e da apófise mastóide</option>
    </optgroup>
    <optgroup label="XIX - Doenças do aparelho circulatório">
      <option value="I00 a I99">I00 a I99 - Doenças do aparelho circulatório</option>
    </optgroup>
    <optgroup label="X - Doenças do aparelho respiratório">
      <option value="J00 a J99">J00 a J99 - Doenças do aparelho respiratório</option>
    </optgroup>
    <optgroup label="XI - Doenças do aparelho digestivo">
      <option value="K00 a K93">K00 a K93 - Doenças do aparelho digestivo</option>
    </optgroup>
    <optgroup label="XII - Doenças da pele e do tecido subcutâneo">
      <option value="L00 a L99">L00 a L99 - Doenças da pele e do tecido subcutâneo</option>
    </optgroup>
    <optgroup label="XIII - Doenças do sistema osteomuscular e do tecido conjuntivo">
      <option value="M00 a M99">M00 a M99 - Doenças do sistema osteomuscular e do tecido conjuntivo</option>
    </optgroup>
    <optgroup label="XIV - Doenças do aparelho geniturinário">
      <option value="N00 a N99">N00 a N99 - Doenças do aparelho geniturinário</option>
    </optgroup>
    <optgroup label="XV - Gravidez, parto e puerpério">
      <option value="O00 a O99">O00 a O99 - Gravidez, parto e puerpério</option>
    </optgroup>
    <optgroup label="XVI - Algumas afecções originadas no período perinatal">
      <option value="P00 a P96">P00 a P96 - Algumas afecções originadas no período perinatal</option>
    </optgroup>
    <optgroup label="XVII - Malformações congênitas, deformidades e anomalias cromossômicas">
      <option value="Q00 a Q99">Q00 a Q99 - Malformações congênitas, deformidades e anomalias cromossômicas</option>
    </optgroup>
    <optgroup label="XVIII - Sintomas, sinais e achados anormais de exames clínicos e de laboratório, não classificados em outra parte">
      <option value="R00 a R99">R00 a R99 - Sintomas, sinais e achados anormais de exames clínicos e de laboratório, não classificados em outra parte</option>
    </optgroup>
    <optgroup label="XIX - Lesões, envenenamentos e algumas outras consequências de causas externas">
      <option value="S00 a T98">S00 a T98 - Lesões, envenenamentos e algumas outras consequências de causas externas</option>
    </optgroup>
    <optgroup label="XX - Causas externas de morbidade e mortalidade">
      <option value="V01 a Y98">V01 a Y98 - Causas externas de morbidade e mortalidade</option>
    </optgroup>
    <optgroup label="XXI - Fatores que influenciam o estado de saúde e o contato com os serviços de saúde">
      <option value="Z00 a Z99">Z00 a Z99 - Fatores que influenciam o estado de saúde e o contato com os serviços de saúde</option>
    </optgroup>
    <optgroup label="XXII - Códigos para propósitos especiais">
      <option value="U00 a U99">U00 a U99 - Códigos para propósitos especiais</option>
    </optgroup>
  </select>
  </div>
</div>
        <div className="form-group">
        <label htmlFor="peso">Peso (kg):</label>
  <MaskedInput
    mask={[/\d/, /\d/, ',', /\d/, /\d/]} // Permitir números com vírgula
    guide={false} // Não exibe a máscara como um guia
    id="peso"
    className="form-control"
    value={peso}
    onChange={(e) => setPeso(e.target.value)}
    required
  />
        </div>
        <div className="form-group">
        <label htmlFor="altura">Altura (m):</label>
  <input
    type="text"
    id="altura"
    className="form-control"
    value={altura}
    onChange={(e) => setAltura(formatarNumero(e.target.value))}
    required
  />
              <button type="button" onClick={calcularIMC} className="btn btn-secondary">
          Calcular IMC
        </button>
        {imc !== null && (
  <div className="result-container">
    <p>{imc}</p>
  </div>
)}
<div className="result-c">
    <p>{categoriaIMC}</p>
    </div>
        </div>

        <button type="button" onClick={limparDados} className="btn btn-danger">
          Limpar Dados
        </button>
      </form>
      {/* IMPLEMENTANDO NAVBAR */}
      <nav className="main-nav">
        <div className="container">
          <div className="main-nav__inner">
            {/* logo block */}
            <a className="logo" href="#" title="HP CALCULATOR©"> 
            <img className='Image'src={require('./HP CALCULATOR LOGO.png')}/>
            </a>
            {/* nav open button */}
            <button className="main-nav__toggler toggler-open" type="button" title="Open Menu">
              <div className="toggler-open__bar"></div>
              <div className="toggler-open__bar"></div>
              <div className="toggler-open__bar"></div>
            </button>
            {/* nav expandable area */}
            <div className="main-nav__expandable">
              <div className="main-nav__expandable-inner">
                <div className="container">
                  <div className="main-nav__expandable-content">
                    {/* nav close btn */}
                    <button className="main-nav__toggler toggler-close" type="button" title="Close Menu"></button>
                    {/* nav links list */}
                    <ul className="main-nav__list">
                      <li className="main-nav__item" data-add-text="data-add-text">
                        <a className="main-nav__link" href="#" title="Home">
                          <span className="main-nav__link-title">Inicio</span>
                          <span className="main-nav__link-descr">Retornar para a página inicial</span>
                        </a>
                      </li>
                      <li className="main-nav__item" data-add-text="data-add-text">
                        <a className="main-nav__link" href="#" title="Calculator">
                          <span className="main-nav__link-title">Calculadora DBI</span>
                          <span className="main-nav__link-descr">Calculadora da sobrecarga</span>
                        </a>
                      </li>
                       <li className="main-nav__item" data-add-text="data-add-text">
                        <a className="main-nav__link" href="#" title="Calculator">
                          <span className="main-nav__link-title">Calculadora IMC</span>
                          <span className="main-nav__link-descr">Calculadora do Índice de massa corporal</span>
                        </a>
                      </li>
                      <li className="main-nav__item" data-add-text="data-add-text">
                        <a className="main-nav__link" href="#" title="Diagnostic">
                          <span className="main-nav__link-title">Dados Gerais</span>
                          <span className="main-nav__link-descr">Dados gerais do paciente</span>
                        </a>
                      </li>
                      <li className="main-nav__item" data-add-text="data-add-text">
                        <a className="main-nav__link" href="#" title="Suport">
                          <span className="main-nav__link-title">Suporte</span>
                          <span className="main-nav__link-descr">Mande suas dúvidas e perguntas!</span>
                        </a>
                      </li>
                      {/* REVER O USO DAS FUNÇÕES DO NAVBAR ABAIXO */}
                      {/* <li className="main-nav__item" data-add-text="data-add-text">
                        <a className="main-nav__link" href="#" title="About">
                          <span className="main-nav__link-title">Sobre</span>
                          <span className="main-nav__link-descr">Meus Dados</span>
                        </a>
                      </li>
                       */}
                      {/* <li className="main-nav__item" data-add-text="data-add-text">
                        <a className="main-nav__link" href="#" title="Contacts">
                          <span className="main-nav__link-title">Contato</span>
                          <span className="main-nav__link-descr">Fale conosco</span>
                        </a>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;