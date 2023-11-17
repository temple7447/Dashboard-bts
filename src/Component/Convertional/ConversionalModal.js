
'use client';

import { Button, Modal, Select } from 'flowbite-react';
import { useState } from 'react';
import HataModel from './HataModel';
import FreeSpaceModel from './FreeSpaceModel';
import EgliModel from './EgliModel';

function ConversionalModal() {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState('center')

  return (
    <>
      <div className="flex flex-wrap gap-4">
       
        <Button onClick={() => setOpenModal(true)}>Theoretical model</Button>
      </div>
      <Modal
        show={openModal}
        position={modalPlacement}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Small modal</Modal.Header>
        <Modal.Body>
        <HataModel />
   <FreeSpaceModel />
   <EgliModel />
        </Modal.Body>
      </Modal>
    </>
  );
}


export default ConversionalModal
