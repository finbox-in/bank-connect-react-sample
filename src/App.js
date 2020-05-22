import { FinBoxBankConnect } from "finbox-bank-connect-js";
import React, { useState } from "react";

const App = props => {
  const [showModal, setShowModal] = useState(false);

  const showBankModal = () => {
    setShowModal(true);
  };

  /**
   * Callback when user exits bankconnect journey
   */
  const onExit = () => {
    setShowModal(false);
  };

  /**
   * Callback when any error is encountered during the journey
   * 
   * @param payload - contains reason and linkId
   */
  const onError = payload => {
    console.log("Error -> ", payload);
  };

  /**
   * Callback when statement has been uploaded to FinBox.
   * 
   * @param payload - contains entityId and linkId
   */
  const onSuccess = payload => {
    console.log("Payload -. ", payload);
    setShowModal(false);
  };

  return (
    <div style={{ width: 640 }}>
      {showModal && (
        <FinBoxBankConnect
          linkId="fnu39-2122-33332-asd2d" //Random UUID
          apiKey="<api-key>" //API Key provided by FinBox
          onSuccess={onSuccess}
          onError={onError}
          onExit={onExit}
        />
      )}
      <button onClick={showBankModal}>Upload Statement</button>
    </div>
  );
};

export default App;
