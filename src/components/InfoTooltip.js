import { useEffect } from 'react';
const escape = 27;

function InfoTooltip({ title , isOpen, onClose, onOvarlayClose }) {

    useEffect(
        () => {
            if(!isOpen) return;
            const handleEscClose =(event) => {
                if((event.keyCode === escape)) {
                    onClose() 
                }
            }
            document.addEventListener('keyup', handleEscClose);
            return () => {
                document.removeEventListener('keyup', handleEscClose);  
            }
        }
    )

    return (
        <div className={`popup ${isOpen && 'popup_opened'}`} onClick={onOvarlayClose}>
                <div className="popup__content">
                    <button className="popup__close" type="button" onClick={onClose}></button>
                    <h3 className="popup__title">{title}</h3>
                </div>
        </div>
    );
}
export default InfoTooltip;