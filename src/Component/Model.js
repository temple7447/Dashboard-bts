import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';

import EgliModelEBS from './EgliModelEBS';
import ModifiedHataModelITV from './ModifiedHataModelITV';
import ModifiedFreeSpace from './ModifiedFreeSpace';
import EgliModelITV from './EgliModelITV';
import './style.css'

const FormElements = ({ modelcovalue, locationName, props }) => {
    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

    return (
        <>
            <Modal
                show={props.openModal === 'initial-focus'}
                size="4xl"
                popup
                onClose={() => props.setOpenModal(undefined)}
                initialFocus={props.emailInputRef}
            >
                <Modal.Header style={{ textAlign: 'center' }}>
                    <div style={{ textAlign: 'center', alignSelf: 'center' }}>BTS Modals Evaluator</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                    <div className="info-container">
                        <div> Elevation:  <span className="highlight">{modelcovalue?.elevation}</span></div>
                        <div>latitude -coordinate  <span className="highlight">{modelcovalue?.coordinate?.lat}</span></div>
                        <div> longitude-coordinate <span className="highlight">{modelcovalue?.coordinate?.lng}</span></div>
                        <div> place: <span className="highlight">  {locationName}</span></div>
                        </div>
<div style={{display:'flex', gap:10}}>
                        <div className='space-y-6'>
                            {/* Buttons */}
                            <div onClick={() => handleButtonClick('Modified Free Space')} className="w-full">
                                <Button>Modified Free Space EBS</Button>
                            </div>
                            <div onClick={() => handleButtonClick('Egli Model EBS')} className="w-full">
                                <Button>Egli Model EBS</Button>
                            </div>
                            <div onClick={() => handleButtonClick('Modified Hata Model ITV')} className="w-full">
                                <Button>Modified Hata Model ITV</Button>
                            </div>
                           
                            <div onClick={() => handleButtonClick('Egli Model ITV')} className="w-full">
                                <Button>Egli Model ITV</Button>
                            </div>
                        </div>

                        <div style={{  borderLeftWidth:10, borderLeftColor:'black', padding:"10px"}}>
                            {/* Render content based on selectedButton */}
                            {selectedButton === 'Modified Free Space' && < ModifiedFreeSpace  />  }
                            {selectedButton === 'Modified Hata Model ITV' && <ModifiedHataModelITV />}
                            {selectedButton === 'Egli Model EBS' && <EgliModelEBS /> }
                            {selectedButton === 'Egli Model ITV' && <EgliModelITV />}
                        </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default FormElements;
