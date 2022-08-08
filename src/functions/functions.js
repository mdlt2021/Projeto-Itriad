import React, { Component, useContext, useState, useParams, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReactModal from 'react-modal';
import ReactDOM from 'react-dom';
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
                  <td><BasicModal/></td>
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



export const BasicModal = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSize, setModalSize] = useState('medium')
  return (
    <>
      <Button
        label="Launch modal"
        onClick={() => {
          setModalOpen(true)          
        }}
        
        priority="outline"
      >Mais Detalhes</Button>
      <div>
        {modalOpen && (
          <Modal
            actions={[
              {
                color: 'danger',
                label: 'Delete',
                onClick: () => setModalOpen(false),
              },
            ]}
            onClose={() => setModalOpen(false)}
            title="Warning"
          >
            <p>
              Do you really want to delete the user <code>admin</code>? This
              cannot be undone.
            </p>
          </Modal>
        )}
      </div>
    </>
  )
}

function alerta(){
  alert('a');
  
}

// const doSomething = (e) => {
//   console.log(e);
// }
// export function BasicModal(title, description) {
//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div>
//       <button className="btn green" onClick={handleOpen}>Mais Detalhes</button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             {title}
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             {description}
//           </Typography>
//         </Box>
//       </Modal>
//     </div>
//   );
// }


// export const  modalVai = (e) => {
  

//   let subtitle;

//   function openModal() {
//     setIsOpen(true);
//   }



//   function closeModal() {
//     setIsOpen(false);
//   }

//   return (
//     <div>
//       <button onClick={openModal}>Open Modal</button>
//       <Modal
//         isOpen={modalIsOpen}
//         onAfterOpen={afterOpenModal}
//         onRequestClose={closeModal}
//         contentLabel="Example Modal"
//       >
//         <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
//         <button onClick={closeModal}>close</button>
//         <div>I am a modal</div>
//         <form>
//           <input />
//           <button>tab navigation</button>
//           <button>stays</button>
//           <button>inside</button>
//           <button>the modal</button>
//         </form>
//       </Modal>
//     </div>
//   );
// }


// export function ModalUnstyledDemo() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div>
//       <button type="button" onClick={handleOpen}>
//         Open modal
//       </button>
//       <Modal
//         aria-labelledby="unstyled-modal-title"
//         aria-describedby="unstyled-modal-description"
//         open={open}
//         onClose={handleClose}
//         components={{ Backdrop }}
//       >
//         <Box sx={style}>
//           <h2 id="unstyled-modal-title">Text in a modal</h2>
//           <p id="unstyled-modal-description">Aliquid amet deserunt earum!</p>
//         </Box>
//       </Modal>
//     </div>
//   );
// }


