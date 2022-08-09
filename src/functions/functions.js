import React, { useState,  useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import { styled, Box, Theme } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import {DebounceInput} from 'react-debounce-input';


export const FetchDefaultFromApi = () => {
  const [inputBusca, setInputBusca] = useState("");
  useEffect(() => {
    getApiData(inputBusca);
  }, []);

  const [quantPagina, setquantPagina] = useState(30);
  useEffect(() => {
    getApiData();
  }, [quantPagina]);

  const [productList, setProducts] = useState();

  const [Pagina, setPagina] = useState(1);
  

  let auxPagina = Number(Pagina)
  let skip = Number(quantPagina)*( auxPagina - 1 );



  const getApiData = async () => {
    let busca = inputBusca;
    let query = '&q='
    let queryParams = '';
    if (busca) {
      query = "&q="+busca;
    }
    queryParams = "/search?limit="+quantPagina+"&skip="+skip+query
    
    let responseData;
    const response = await fetch(
      "https://dummyjson.com/products"+queryParams
    ).then((response) => responseData = response).then((response) => response.json());

    console.log(responseData);
    let statusresponseData = responseData.status;
    console.log(statusresponseData == 200);
    if (statusresponseData == 200) {
      setProducts(response);
      // response.json();
    }else{
      alert(response)
    }
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

  function loopPaginas  ()  {
    let paginaAtual = Pagina
    let optionsArray = [];
    let select;

    let limite = 30;
    let total = 100;
    let totalPaginas = 4;
    if (typeof productList !== 'undefined') {
      limite = Number(quantPagina) || 1;
      total = Number(productList.total) || 1;
      // Caso ultima página tenha menos registros que o limite, adiciona mais uma página
      let last = 0;
      if (total%limite >0) {
        last = 1
      }
      totalPaginas = Math.floor((total/limite)+last);    
    }

    paginaAtual = Number(paginaAtual);
    for (let index = 1; index < totalPaginas+1; index++) {
      if (index == paginaAtual) {
        select = 'select'
      }else{
        select = '';
      }
      optionsArray.push(
        <Button
          onClick={(e) => {setPagina(e.target.value)} } 
          value={index}
          className="margin-left-1em"
          >
            {index}  
        </Button>
      ) 
    }
    
    return(
      <span className='pagination'>
      {optionsArray}
      </span>    
    )
  }

  React.useEffect(() => {
    atualizaTabela();
  }, [Pagina]);
  
  // Number(productList.total) / Number(productList.limit);
  let limite = 30;
  let total = 100;
  let totalPaginas = 4;
  if (typeof productList !== 'undefined') {
    limite = Number(quantPagina) || 1;
    total = Number(productList.total) || 1;
    totalPaginas = Math.floor((total/limite)+1);    
  }
  
  return (
    <>
      <div className="app">
        
        <br/>
        <br/>
        <h4 className='header-busca'>Buscar Produto</h4>
        <DebounceInput 
          debounceTimeout={300}
          placeholder='Buscar Produto'       
          onChange={ (e) => {setInputBusca(e.target.value);ResetDefaultTabelas(e.target.value);getApiData(e.target.value)} }          
          className="height-2em input-busca"
        />
        {/* <Button 
          id='buscar'
          label="buscar"
          className='mais-detalhes margin-left-1em'
          priority="outline"
          size='medium'
          
          value={inputBusca} onClick={(e) => {atualizaTabela()}}
        >
          Buscar
        </Button> */}
        <p>{inputBusca}</p>
        

        <span>Página {Pagina}</span> 
        {/* <select
          className='height-2em'
          onChange={(e) => {setPagina(e.target.value)} }
        >
          
        </select> */}
        <span> de {totalPaginas}</span>
        <br/>
        <p className='text-center'>{loopPaginas()}</p>


        <p className='mostrar-resultados-paginas margin-left-1em'>
          <span>Mostrar</span>
          <DebounceInput
            id='quantPagina'
            value={quantPagina}
            debounceTimeout={300}
            placeholder='Quantidade por Página'
            onChange={(e) => {setquantPagina(e.target.value)}}
            className="margin-left-1em margin-right-1em width-20px text-center height-1em"
          
          />
          <span>Resultados por página</span>
        </p>
        

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
            <TableBody {...productList}/>
          </tbody>
        </table>
      </div>
    </>
  )
}

export const TableBody = (productList) => {
  
  if (typeof productList === 'undefined' || typeof productList.products === 'undefined') {
    return (
      <>
      </>
    )
  }
  else{  
    console.log('TableBody:', productList);
    return (
      <>
        
        {Object.keys(productList.products).map((index, i) => (
                
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
      </>

    )
  }
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




