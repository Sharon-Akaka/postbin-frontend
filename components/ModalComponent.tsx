import React from 'react';
import './ModalComponent.css';

interface ModalProps {
    submission: string;
    title: string;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, submission }) => {
    const outsideRef = React.useRef(null);

    const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (e.target === outsideRef.current) {
            onClose();
        }
    }
    return isOpen ? (
        <div className='modal'>
            <div
                ref={outsideRef}
                className={'modal_overlay'}
                onClick={handleCloseOnOverlay}
            />
            <div className='modal_box'>

                <div className='modal_title'>
                    {title}
                </div>
                <div className='modal_submission'>
                    {submission}
                </div>
            </div>

        </div>
    ) : null;
};

export default Modal