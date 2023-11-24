'use client';

import { Button, Modal, Select } from 'flowbite-react';
import { useState } from 'react';

const About = ({ final, initial }) => {
  return (
    <>
      <Modal show={initial} position='center' onClose={() => final(false)}>
        <Modal.Header>Small modal</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 p-6">
            <p>
              TV White Space refers to the unused portions of the television broadcast spectrum,
              which have become available with the transition from analog to digital television
              broadcasting. This spectrum can be repurposed for various wireless communication
              applications, contributing to more efficient use of radio frequency resources.
            </p>
            {/* You can add more information or details as needed */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => final(false)}>I accept</Button>
          <Button color="gray" onClick={() => final(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default About;
