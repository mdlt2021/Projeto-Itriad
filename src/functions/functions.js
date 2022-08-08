import React, { Component, useContext, useState, useParams, useEffect } from 'react';
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

export const FetchDefaultFromApi = () => {

  const [productList, setProducts] = useState();


  const getApiData = async () => {
    const response = await fetch(
      "https://dummyjson.com/products"
    ).then((response) => response.json());


    setProducts(response);
  };

  useEffect(() => {
    getApiData();
  }, []);



   const fetchSongDetails =  (e) =>{
    const song = e.target.getAttribute('key');
    console.log('We need to get the details for ', song);
  }

  return (
    <>
      <div className="app">
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

export const BasicModal = (produto) => {
  console.log(produto)
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
        >Mais Detalhes</Button>
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
            <img className='img-thumbnail' src={produto.thumbnail}/>
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
  

