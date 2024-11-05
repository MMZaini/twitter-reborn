import React from 'react';
import '../page.css';

interface ModalProps {
    isOpen: boolean;
    imageSrc: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, imageSrc, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content">
                <img
                    src={imageSrc}
                    alt="Post"
                    className="modal-image"
                    style={{ height: '80vh', width: 'auto' }}
                />
            </div>
        </div>
    );
};

export default Modal;