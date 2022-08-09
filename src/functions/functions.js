import React, { useState,  useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import { styled, Box, Theme } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';


export const FetchDefaultFromApi = () => {
  const [inputBusca, setInputBusca] = useState("");
  useEffect(() => {
    getApiData(inputBusca);
  }, []);

  const [productList, setProducts] = useState();
  const [quantPagina, setquantPagina] = useState(30);
  const [Pagina, setPagina] = useState(1);
  

  let auxPagina = Number(Pagina)
  let skip = quantPagina*( auxPagina - 1 );


  const getApiData = async (busca) => {
    let query = '&q='
    let queryParams = '';
    if (busca) {
      query = "&q="+busca;
    }
    queryParams = "/search?limit="+quantPagina+"&skip="+skip+query
    const response = await fetch(
      "https://dummyjson.com/products"+queryParams
    ).then((response) => response.json());
    setProducts(response);
  };
  
  
  function ResetDefaultTabelas(dados) {
    if (dados == '') {      
      getApiData();
    }
  }
    

  function atualizaTabela ()  {
    const dados = getApiData(inputBusca);
    if (dados && dados.total > 0) {
      setProducts(dados)      
    }
    else if(dados.total == 0){
      alert("Não foi encontrado produto com essa descrição")
    }
  }

  function loopPaginas  (paginaAtual)  {
    let optionsArray = [];
    let select;
    paginaAtual = Number(paginaAtual);
    for (let index = 1; index < paginaAtual +5; index++) {
      if (index == paginaAtual) {
        select = 'select'
      }else{
        select = '';
      }
      optionsArray.push(<option  value={index} {...select}>{index}</option>) 
    }
    
    return(
      <>
      {optionsArray}
      </>    
    )
  }

  React.useEffect(() => {
    atualizaTabela();
  }, [Pagina]);
  
  
  return (
    <>
      <div className="app">
        <span>Mostrar</span>
        <input
          id='quantPagina'
          value={quantPagina}
          placeholder='Quantidade por Página'
          onChange={(e) => {setquantPagina(e.target.value)}}
          className="margin-left-1em margin-right-1em width-40px text-center height-2em"
        
        />
        <span>Resultados por página</span>
        <br/>
        <br/>
        <input 
          placeholder='Buscar Produto'       
          onChange={ (e) => {setInputBusca(e.target.value);ResetDefaultTabelas(e.target.value)} }
          className="height-2em"
        />
        <Button 
          id='buscar'
          label="buscar"
          className='mais-detalhes margin-left-1em'
          priority="outline"
          size='medium'
          
          value={inputBusca} onClick={(e) => {atualizaTabela()}}
        >
          Buscar
        </Button>
        <p>{inputBusca}</p>
        

        <br/>
        <span>Página </span> 
        <select
          className='height-2em'
          textoBusca={inputBusca}
          onChange={(e) => {setPagina(e.target.value)} }
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
                
                  className="item-container" key={productList.products[i].id}>
                  <td className="table-align-center">{i + 1}</td>
                  <td className="padding-left-1em">{productList.products[i].title}</td>
                  <td className="padding-left-1em">{productList.products[i].description}</td>
                  <td className="padding-left-1em">{productList.products[i].price}</td>
                  <td className="padding-left-1em">{productList.products[i].stock}</td>
                  <td><BasicModal {...productList.products[i]}/></td>
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
            className="item-container" key={productList.products[i].id}>
            <td className="table-align-center">{i + 1}</td>
            <td className="padding-left-1em">{productList.products[i].title}</td>
            <td className="padding-left-1em">{productList.products[i].description}</td>
            <td className="padding-left-1em">{productList.products[i].price}</td>
            <td className="padding-left-1em">{productList.products[i].stock}</td>
            <td><BasicModal {...productList.products[i]}/></td>
          </tr>
        ))
      }
    </tbody>

  )
}
export const BasicModal = (produto) => {
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
          <h2 className='text-center' id="unstyled-modal-description">Nota {produto.rating} de 5!</h2>
          <h3 id="unstyled-modal-description">R$ {produto.price}.00 ({produto.discountPercentage}% de desconto!)</h3>
          <p id="unstyled-modal-description">Marca: {produto.brand}</p>
          <p id="unstyled-modal-description">Categoria: {produto.category}</p>
          <p id="unstyled-modal-description">{produto.description}</p>

        </Box>
      </Modal>  
      </div>
    </>
  )
}




