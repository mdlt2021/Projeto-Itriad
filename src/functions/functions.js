import React, {Component, useContext, useState ,useParams, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export const FetchDefaultFromApi = () =>{
 const [productList, setProducts] = useState();

 

 const getApiData = async () => {
   const response = await fetch(
     "https://dummyjson.com/products"
   ).then((response) => response.json());

   // console.table(response.products)

   setProducts(response);
 };

 useEffect(() => {
   getApiData();
 }, []);

  


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
           </tr>
         </thead>
         <tbody>
           
           {productList &&
             Object.keys(productList.products).map((index,i) => (
               <tr className="item-container" key={productList.products[i].id}>
                 <td className="title">{i}</td>
                 <td className="title">{productList.products[i].title}</td>
                 <td className="title">{productList.products[i].description}</td>
                 <td className="title">{productList.products[i].price}</td>
                 <td className="title">{productList.products[i].stock}</td>
               </tr>
             ))
           }
         </tbody>
       </table>

     </div>
   </>
 )
}

export function BasicModal() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default FetchDefaultFromApi;

