// PÁGINIA DE INICIO
import React, { useEffect } from 'react';
import './Home.css';

function App() {
  // FUNÇÃO TOGGLER
  const PATH = {
    closeToggler: '.toggler-close',
    expandableNav: '.main-nav__expandable',
    navItem: '.main-nav__item',
    openToggler: '.toggler-open'
  };

  const editDataAttr = (elem, dataAttr, newVal) => {
    elem.dataset[dataAttr] = newVal;
  };

  // FUNÇÕES DO NAVBAR
  const setDataAttrsToNavElems = () => {
    const navElems = document.querySelectorAll(PATH.navItem);

    navElems.forEach((elem, index) => {
      editDataAttr(elem, 'addText', `0${index + 1}`);
    });
  };

  useEffect(() => {
    setDataAttrsToNavElems();

    const handleBodyClick = (e) => {
      const target = e.target;

      if (target.closest(PATH.openToggler)) {
        const nav = document.querySelector(PATH.expandableNav);
        nav.classList.add('js-open');
      }

      if (target.closest(PATH.closeToggler)) {
        const nav = document.querySelector(PATH.expandableNav);
        nav.classList.remove('js-open');
      }
    };

    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">INICIO</h1>
      </header>
      {/* ARRUMAR A FORMATAÇÃO DO TEXTO E ADICIONAR AS LOGOS NO FOOTER */}
{/* 
      <div className="text-info">
      <p className="h2">
      A sobrecarga de determinados medicamentos tem gerado diversos problemas de saúde na população mundial, especificamente nos idosos. Este assunto tem se destacado principalmente na Austrália, Canadá e alguns países europeus, isso ocorreu devido ao impacto no aumento do envelhecimento populacional na saúde mundial, que resultou em um crescimento gradativo no consumo de medicamentos nesta faixa etária devido às doenças crônicas observadas nos idosos, ocasionando em maiores riscos de hospitalização, quedas e óbito. (Hilmer et al., 2007).
Segundo a OMS, em 2020 pela primeira vez na história o número de pessoas com mais de 60 anos é maior que o de crianças de até cinco anos. (Oms, 2014). 
De acordo com análises médicas realizadas por pesquisadores australianos em pacientes idosos, muitos deles apresentaram problemas na força muscular e estrutural, tudo isso relacionado a prática da polifarmácia em idosos que acarreta riscos, uma vez que muitos medicamentos apresentam efeito sedativo ou anticolinérgico com risco de quedas e fraturas.
Com a preocupação causada em nível mundial, foi criado uma fórmula que calculasse o índice desta sobrecarga dos medicamentos consumidos por idosos, chamado de "Drug Burden Index", que segundo Hilmer, “este cálculo surgiu com o objetivo de quantificar a utilização destes medicamentos com efeito sedativo ou anticolinérgicos, com a dose diária e o número total de medicamentos.” (Hilmer et al., 2007).
Com a falta de uma ferramenta eletrônica para auxiliar o serviço do profissional da saúde, a proposta deste estudo é o desenvolvimento de uma ferramenta eletrônica para avaliação do consumo de medicamentos, baseada no cálculo do “Drug Burden Index”, para um sistema de ambulatório médico, onde o cálculo está implementado no dia a dia dos profissionais da saúde para o atendimento ao público, servindo como um recurso a mais para a saúde pública no Brasil.  
        </p>
      </div>

      <h1 className="header__title">SOBRE O DRUG BURDEN INDEX</h1>
      <div className="text-info">
        <p className="h2">
        O Drug Burden Index (DBI) é uma medida farmacológica da exposição de um indivíduo a medicamentos com efeitos anticolinérgicos e sedativos. (Kouladjian, 2016). Tem sido analisado em diferentes populações que as ações farmacológicas desses medicamentos podem reduzir a função física e cognitiva, principalmente em idosos, podendo auxiliar o profissional a reconhecer a exposição cumulativa de um paciente aos medicamentos, comparando esses riscos com os benefícios potenciais dos medicamentos. 
        </p>
      </div>

      <h1 className="header__title">SOBRE O ÍNDICE DE MASSA CORPORAL (IMC)</h1>
      <div className="text-info">
      <p className="h2">
      O índice de massa corporal (IMC), apesar de não específico para a avaliação da composição corporal, tem sido usado para avaliar o excesso de peso populacional e tem ganhado relevância nos estudos epidemiológicos, tanto pela simplicidade e fácil obtenção das medidas que integram sua composição como por possibilitar a classificação do estado antropométrico e monitoramento do excesso de peso populacional.
Resultados de estudos realizados com grupos populacionais têm demonstrado alta correlação do IMC com o peso e com a quantidade de gordura corporal determinada por medidas diretas, como circunferência da cintura - CC - e relação cintura/quadril - RCQ - dobras cutâneas e bioimpedância - BIA.
Em países desenvolvidos, é frequente a utilização de informações autorreferidas de peso e estatura para o cálculo do IMC, tanto mediante questionários auto-preenchidos como em entrevista por telefone. No Brasil recente, o Ministério da Saúde vem utilizando informações autorreferidas de peso e estatura para monitorar o perfil nutricional e epidemiológico da população adulta integrada ao 'Sistema de Vigilância de Fatores de Risco e Proteção para Doenças Crônicas por Inquérito Telefônico - Vigitel.
São poucos os estudos nacionais realizados com adultos de ambos os sexos e que tenham analisado a validade do IMC obtido a partir de medidas de peso e estatura autorreferidas, para a classificação do estado antropométrico, embora os resultados de pesquisas conduzidas no Brasil não indiquem diferença entre medidas autorreferidas e aferidas, para peso e estatura. Tem-se observado, também, alta sensibilidade e especificidade do IMC obtido de medidas autorreferidas, quando comparado ao IMC obtido de medidas aferidas.Observou-se, ainda, que as informações de peso e estatura autorreferidas e aferidas apresentaram boa concordância e confiabilidade quando essas medidas foram validadas levando em consideração idade, escolaridade, renda e IMC da população investigada.
        </p>
      </div>

      <h1 className="header__title">SOBRE O PROJETO</h1>
      <div className="text-info">
      <p className="h2">
      Este projeto é um trabalho de conclusão de curso do Instituto Federal do Paraná(IFPR) em parceria com a Pontifícia Universidade Católica do Paraná(PUCPR) , campus Londrina. Desenvolvido pelo discente do IFPR, Pedro Almeida de Souza, sob orientação do, Professor Drº, Augusto Luengo Pereira Nunes do IFPR, campus Londrina e com a colaboração e coorientação da, Professora Drª, Karen Barros Parron Fernandes, docente da PUCPR, campus Londrina.
        </p>
      </div> */}

      <nav className="main-nav">
        <div className="container">
          <div className="main-nav__inner">
            <a className="logo" href="#" title="HP CALCULATOR©">
              <img className='Image' src={require('./HP CALCULATOR LOGO.png')} alt="HP Calculator Logo" />
            </a>

            <button className="main-nav__toggler toggler-open" type="button" title="Open Menu">
              <div className="toggler-open__bar"></div>
              <div className="toggler-open__bar"></div>
              <div className="toggler-open__bar"></div>
            </button>

            <div className="main-nav__expandable">
              <div className="main-nav__expandable-inner">
                <div className="container">
                  <div className="main-nav__expandable-content">
                    <button className="main-nav__toggler toggler-close" type="button" title="Close Menu"></button>
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
