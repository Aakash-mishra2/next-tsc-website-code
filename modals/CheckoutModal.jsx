import { CommonModal } from "../common/custom";

const CheckoutModal = ({ handleClose, checkout, notAllowClickAnywhere }) => {
  return (
    <CommonModal
      openModal={checkout}
      handleClose={handleClose}
      notAllowClickAnywhere={notAllowClickAnywhere}
    >
      <div>{/* <NewCheckout handleClose={handleClose} /> */}</div>
    </CommonModal>
  );
};

export default CheckoutModal;
