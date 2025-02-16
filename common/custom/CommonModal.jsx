import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: "auto",
    bottom: "auto",
    maxWidth: "90%",
    overflow: "none",
    border: "#f5f0f7",
    borderRadius: "12px",
    backgroundColor: "white",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    zIndex: 1000,
    overflow: "none",
    backdropFilter: "blur(5px)",
    background: "rgba(255, 255, 255, 0.2)",
  },
};
Modal.setAppElement("#root");

const CommonModal = (props) => {
  return (
    <div className="mx-5">
      {props.children && (
        <Modal
          isOpen={props.openModal}
          onRequestClose={
            props.notAllowClickAnywhere
              ? props.notAllowClickAnywhere
              : props.handleClose
          }
          style={customStyles}
          contentLabel="modals"
        >
          {props.children}
        </Modal>
      )}
    </div>
  );
};

export default CommonModal;
