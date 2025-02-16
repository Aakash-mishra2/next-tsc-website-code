import { useEffect } from "react";
import Cancelled from "./Cancelled";
import { useSelector } from "react-redux";
import UpdateAddress from "./UpdateAddress";
import LinkExpired from "./LinkExpiredModal";
import CommonModal from "../../common/custom/CommonModal";

const OrderStatus = ({
  handleClose,
  setOrderStatusModel,
  openOrderStatusModel,
}) => {
  const order_status = useSelector((state) => state.order.order_status);
  const isWrongAddress = useSelector((state) => state.order.isWrongAddress);

  useEffect(() => {
    if (order_status === "ABANDONED") handleClose();
  }, [order_status, handleClose]);

  return (
    <CommonModal
      handleClose={handleClose}
      openModal={openOrderStatusModel}
      notAllowClickAnywhere={() => setOrderStatusModel(true)}
    >
      {isWrongAddress && (
        <UpdateAddress
          handleClose={handleClose}
          isWrongAddress={isWrongAddress}
        />
      )}
      {order_status === "EXPIRED" && <LinkExpired handleClose={handleClose} />}
      {order_status === "CANCELLED" && (
        <Cancelled handleClose={handleClose} isverifyUser={order_status} />
      )}
    </CommonModal>
  );
};

export default OrderStatus;
