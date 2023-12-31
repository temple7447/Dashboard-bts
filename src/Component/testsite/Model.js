
'use client';

import { Button, Modal, Select } from 'flowbite-react';
import { useState } from 'react';
import WeightUtility from './WeightUtility';
import Throughput from './Throughput';
import Utilityfunction from './Utilityfunction';
import { useInformation } from '../../Provider';

function Models({item}) {


  const {mute, setMute } = useInformation()

  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState('center')

  return (
    <>
      <div className="flex flex-wrap gap-4">

      <Button disabled={mute}  onClick={() => setOpenModal(true)}>Pick site</Button>
      </div>
      <Modal
        show={openModal}
        position={modalPlacement}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Picking a better site</Modal.Header>
        <Modal.Body>
          <div style={{display:'flex',flexDirection:'column' ,alignSelf:'center'}}>
          <Throughput  />
        <Utilityfunction  />
<WeightUtility item={item} />
</div>
        </Modal.Body>
      </Modal>
    </>
  );
}


export default Models
