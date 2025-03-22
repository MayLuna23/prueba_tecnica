import React from "react";
import "./Modal.css"
export const Modal = ({ title, children, primaryButton, secondaryButton }) => {
    // PrimaryButton y el secondaryButton son dos objetos JSON con las propiedades de los botones
    // Cada boton necesita solo 2 propiedades, El mensaje del boton y lo que se ejecutara al darle click
  const primaryLabel = primaryButton.primaryLabel;
  const onPrimaryClick = primaryButton.onPrimaryClick;
  const secondaryLabel = secondaryButton.secondaryLabel;
  const onSecondaryClick = secondaryButton.onSecondaryClick;

  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <div className="modal-content">
            {children}
        </div>
        <div className="modal-actions">
          <button
            className="modal-button"
            onClick={() => onPrimaryClick()}
          >
            {primaryLabel}
          </button>
          <button
            className="modal-button"
            onClick={() => onSecondaryClick(false)}
          >
            {secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

