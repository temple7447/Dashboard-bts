
'use client';

import { Button, Modal, Select } from 'flowbite-react';
import { useState } from 'react';
import WeightUtility from './WeightUtility';
import Throughput from './Throughput';
import Utilityfunction from './Utilityfunction';

function Models({mute}) {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState('center')

  return (
    <>
      <div className="flex flex-wrap gap-4">

      {
        mute 
      }  <Button disabled={mute}  onClick={() => setOpenModal(true)}>Pick site</Button>
      </div>
      <Modal
        show={openModal}
        position={modalPlacement}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Picking a better site</Modal.Header>
        <Modal.Body>
        <Utilityfunction />
<Throughput />
<WeightUtility />
        </Modal.Body>
      </Modal>
    </>
  );
}


export default Models
