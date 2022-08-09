import React, { Component, useContext, useState, useParams, useEffect ,useRef } from 'react';
// import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";


import PropTypes from 'prop-types';
import clsx from 'clsx';

// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReactModal from 'react-modal';
import ReactDOM from 'react-dom';


import { Modal } from '@mui/material';
import { styled, Box, Theme } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';

// import Modal  from 'react-modal';

export const FetchDefaultFromApi = (produtos) => {
  const [inputBusca, setInputBusca] = useState("");
  const [productList, setProducts] = useState();
  const [quantPagina, setquantPagina] = useState(30);
  const [Pagina, setPagina] = useState(1);
  let busca = '';

  function simulateMouseClick(){
    var element = document.querySelector('#buscar');
    console.log(element);
    mouseClickEvents.forEach(mouseEventType =>
      element.dispatchEvent(
        new MouseEvent(mouseEventType, {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1
        })
      )
    );
  }
  
  
  

  
 
  if (inputBusca != '') {
    busca = "/search?q="+inputBusca
  }
  let auxPagina = Number(Pagina)
  let skip = quantPagina*( auxPagina - 1 );

  console.log(quantPagina,Pagina);

  const getApiData = async (busca) => {
    let query = ''
    if (busca) {
      query = "&search?q="+busca;
    }
    const response = await fetch(
      "https://dummyjson.com/products/?limit="+quantPagina+"&skip="+skip+query
    ).then((response) => response.json());

    console.log('FetchDefaultFromApi',response);
    if (response.total > 0) {      
      setProducts(response);
    }
  };
  
  useEffect(() => {
    getApiData(inputBusca);
  }, []);

  function ResetDefaultTabelas(dados) {
    if (dados == '') {
      
      getApiData();
    }
  }
    
  // function buscaProdutoApi(nomeProduto){
    
  //   const getApiData = async (nomeProduto) => {
  //   let query
  //     if (nomeProduto == '') {
  //       query = ''
  //    }else{
  //       query = "/search?q="+nomeProduto;
  //    }
  //     const url  = "https://dummyjson.com/products"+query;
  //     const response = await fetch(
  //       url
  //     ).then((response) => response.json());
  
  //     console.log('buscaProdutoApi',response);
  //     // setProducts(response);

  //     return response;
  //   };
    
  //   // getApiData(nomeProduto)
  //   useEffect(() => {
  //     getApiData(nomeProduto);
  //   }, []);
  // }
  function atualizaTabela ()  {
    let aaa = inputBusca;
    console.log(aaa);
    const dados = getApiData(aaa);
    console.log('dados',dados);
    if (dados && dados.total > 0) {
      setProducts(dados)      
    }
    else if(dados.total == 0){
      alert("Não foi encontrado produto com essa descrição")
    }
  }

  function loopPaginas  (paginaAtual)  {
    let optionss = [];
    let select;
    paginaAtual = Number(paginaAtual);
    console.log('paginaAtual:',paginaAtual)
    for (let index = 1; index < paginaAtual +5; index++) {
      if (index == paginaAtual) {
        select = 'select'
      }else{
        select = '';
      }
      optionss.push(<option  value={index} {...select}>{index}</option>) 
    }
    
    return(
      <>
      {optionss}
      </>    
    )
  }
  React.useEffect(() => {
    atualizaTabela();

    if (Pagina != 1) {
      console.log("Button Clicked!",Pagina);
      // atualizaTabela();
    } else {
      console.log("No Button Clicked!",Pagina);
    }
  }, [Pagina]);
  
  function trocaPagina (e) {
    setPagina(e.target.value);
    //  atualizaTabela();
     
  }
  return (
    <>
      <div className="app">
        <span>Mostrar</span>
        <input
          id='quantPagina'
          value={quantPagina}
          placeholder='Quantidade por Página'
          onChange={(e) => {setquantPagina(e.target.value)}}
        
        />
        <span>Resultados por página</span>
        <br/>
        <br/>
        <input 
          placeholder='Buscar Produto'       
          onChange={ (e) => {setInputBusca(e.target.value);ResetDefaultTabelas(e.target.value)} }
        />
         <Button 
          id='buscar'
          label="buscar"
          className='mais-detalhes margin-left-1em'
          priority="outline"
          size='medium'
          
          value={inputBusca} onClick={(e) => {atualizaTabela()}}
        > Buscar
        </Button>
        {/* <BuscaProduto/> */}
        <p>{inputBusca}</p>
        {/* {console.log(productList)} */}
        {/* {buscaProdutoApi(input)} */}

        <br/>
        <span>Página </span> 
        <select
        textoBusca={inputBusca}
        // onChange={(e) => {useEffect(() => {
        //     atualizaTabela();
        //   }, [e.target.value])}
        // }
        onChange={(e) => {trocaPagina(e)} }
        >
          {loopPaginas(Pagina)}
        </select>
        <br/>
        <br/>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          
            {productList &&
              Object.keys(productList.products).map((index, i) => (
                
                <tr
                  //  onClick={async () => {await this.asyncFunc("Example");} }
                  // onClick={(e) =>this.doSomething(e)}
                  className="item-container" key={productList.products[i].id}>
                  <td className="table-align-center">{i + 1}</td>
                  <td className="padding-left-1em">{productList.products[i].title}</td>
                  <td className="padding-left-1em">{productList.products[i].description}</td>
                  <td className="padding-left-1em">{productList.products[i].price}</td>
                  <td className="padding-left-1em">{productList.products[i].stock}</td>
                  {/* {console.log('teste',{...productList.products[i]})} */}
                  <td><BasicModal {...productList.products[i]}/></td>
                  {/* <td>{BasicModal(productList.products[i].title, productList.products[i].description)}</td> */}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export const TableBody = (productList) => {

  return (
    <tbody>
      
      {productList &&
        Object.keys(productList.products).map((index, i) => (
          
          <tr
            //  onClick={async () => {await this.asyncFunc("Example");} }
            // onClick={(e) =>this.doSomething(e)}
            className="item-container" key={productList.products[i].id}>
            <td className="table-align-center">{i + 1}</td>
            <td className="padding-left-1em">{productList.products[i].title}</td>
            <td className="padding-left-1em">{productList.products[i].description}</td>
            <td className="padding-left-1em">{productList.products[i].price}</td>
            <td className="padding-left-1em">{productList.products[i].stock}</td>
            {/* {console.log('teste',{...productList.products[i]})} */}
            <td><BasicModal {...productList.products[i]}/></td>
            {/* <td>{BasicModal(productList.products[i].title, productList.products[i].description)}</td> */}
          </tr>
        ))
      }
    </tbody>

  )
}
export const BasicModal = (produto) => {
  // console.log('BasicModal produto',produto)
  const BackdropUnstyled = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
      <div
        className={clsx({ 'MuiBackdrop-open': open }, className)}
        ref={ref}
        {...other}
      />
    );
  });
  
  BackdropUnstyled.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
  };
  
  const Modal = styled(ModalUnstyled)`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  const Backdrop = styled(BackdropUnstyled)`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
  `;
  
  const style = (theme) => ({
    width: 400,
    bgcolor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
    border: '2px solid currentColor',
    padding: '16px 32px 24px 32px',
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [modalOpen, setModalOpen] = useState(false)
  const [modalSize, setModalSize] = useState('medium')
  const customStyles = {
    content: {
      top: '35%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '60%',
      transform: 'translate(-40%, -10%)',
    },
  };
  return (
    <>
      <Button
        label="Launch modal"
        onClick={handleOpen}
        className='mais-detalhes'
        priority="outline"
        size='small'
      >+ Detalhes</Button>
      <div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        components={{ Backdrop }}
      >
        <Box sx={style}>
          <h2 className='text-center' id="unstyled-modal-title">{produto.title}</h2>
          <img alt='Foto do Produto' title='Foto do Produto' className='img-thumbnail' src={produto.thumbnail}/>
          <h3 className='text-center' id="unstyled-modal-description">Nota {produto.rating} de 5!</h3>
          <p id="unstyled-modal-description">Marca: {produto.brand}</p>
          <p id="unstyled-modal-description">Categoria: {produto.category}</p>
          <p id="unstyled-modal-description">{produto.description}</p>

        </Box>
      </Modal>  
      </div>
    </>
  )
}

export const BuscaProduto = () => {

  const nameForm = useRef(null)

  function buscaProdutoApi(nomeProduto){

    const getApiData = async (nomeProduto) => {
      const url  = "https://dummyjson.com/products/search?q="+nomeProduto;
      const response = await fetch(
        url
      ).then((response) => response.json());
      

      console.log('Buscaprodutos  ',response);
      // setProducts(response);
      // console.log(productList);

      return response;
    };
    console.log('getApiData',getApiData(nomeProduto))
    // getApiData(nomeProduto)
    // useEffect(() => {
    //   getApiData(nomeProduto);
    // }, []);
  }
  const handleClickEvent = () => {
    const form = nameForm.current
    let nomeProduto = form['NomeProduto'].value
    console.log(nomeProduto);

    buscaProdutoApi(nomeProduto);
  }

  return (
    <div>
      <form ref={nameForm}>
       <input label={'NomeProduto'} name={'NomeProduto'}/>
      </form>
      <Button
      label="buscar"
      onClick={handleClickEvent}
      className='mais-detalhes'
      priority="outline"
      size='medium'
      >Buscar</Button>
    </div>
  )


  // return (
  //   <>        
  //     <input/>
  //     <Button
  //     label="buscar"
  //     // onClick={handleOpen}
  //     className='mais-detalhes'
  //     priority="outline"
  //     size='medium'
  //     >Buscar</Button>
  //   </>
  // )
}




