'use client';

import { Button, Modal, Select } from 'flowbite-react';
import { useState } from 'react';

const About = ({ final, initial }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>About the Software</Button>
      <Modal
        show={openModal}
        position="center"
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>About The Software</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 p-6">
            <p>
              TV White Space refers to the unused portions of the television
              broadcast spectrum, which have become available with the
              transition from analog to digital television broadcasting. This
              spectrum can be repurposed for various wireless communication
              applications, contributing to more efficient use of radio
              frequency resources.
            </p>
            {/* You can add more information or details as needed */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default About;
