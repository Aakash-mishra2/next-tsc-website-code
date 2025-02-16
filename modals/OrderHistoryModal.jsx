import Image from "next/image";
import { CommonModal } from "../common/custom";
import { VscChromeClose } from "react-icons/vsc";

const OrderHistoryModal = ({ handleClose, openModal, order }) => {
  return (
    <CommonModal handleClose={handleClose} openModal={openModal}>
      <div className="max-w-[480px]">
        <div className="flex sticky top-0 bg-white shadow-md justify-between items-center border-b border-b-slate-300 p-4">
          <div className="text-2xl font-semibold">Order History</div>
          <VscChromeClose
            onClick={handleClose}
            size={25}
            className="text-gray-500 cursor-none lg:cursor-pointer"
          />
        </div>
        <div className="px-4 pb-4 max-h-[450px] overflow-auto example">
          <div>
            <h2 className="my-3 font-semibold text-lg text-slate-600">
              Order Details
            </h2>
            <div className="flex flex-col gap-1 border rounded-lg border-slate-300 p-3">
              <div className="flex text-sm">
                <p className="w-1/2 font-semibold text-slate-400">Order Id</p>
                <p className="w-1/2">#{order.order_id}</p>
              </div>
              <div className="flex text-sm">
                <p className="w-1/2 font-semibold text-slate-400">Order Date</p>
                <p className="w-1/2">{order.order_placed_date}</p>
              </div>
              <div className="flex text-sm">
                <p className="w-1/2 font-semibold text-slate-400">
                  Order Total
                </p>
                <p className="w-1/2">₹ {order.final_amount}</p>
              </div>
              <div className="flex text-sm">
                <p className="w-1/2 font-semibold text-slate-400">
                  Delivery Status
                </p>
                <p className="w-1/2">{order.delivery_status}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="my-3 font-semibold text-lg text-slate-600">
              Product Details
            </h2>
            <div className="flex flex-col gap-3 border rounded-lg border-slate-300 p-3">
              {order.items.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex gap-3 items-start text-slate-400 text-sm"
                  >
                    <figure className="w-20 md:w-16 aspect-square">
                      <Image
                        width={100}
                        height={100}
                        priority
                        className="rounded-lg"
                        src={productImg || item.primary_image}
                        alt={item.product_name}
                      />
                    </figure>
                    <figcaption className="font-semibold">
                      <h2>{item.product_name}</h2>
                      <p>₹ {item?.cut_price}</p>
                      <p>Qty: {item.quantity}</p>
                    </figcaption>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="my-3 font-semibold text-lg text-slate-600">
              Payment Details
            </h2>
            <div className="flex flex-col gap-1 border rounded-lg border-slate-300">
              <div className="flex text-sm p-3">
                <p className="w-1/2 font-semibold text-slate-400">
                  Payment Method
                </p>
                <p className="w-1/2">{order.payment_method}</p>
              </div>
              <div className="border-y border-y-slate-400 p-3">
                <p className="pb-2 font-semibold text-slate-400">
                  Shipping Address
                </p>
                <p className="text-sm">
                  34A Ground floor, Hauz Khas Fort Rd, South Delhi - 110016
                  Delhi India
                </p>
              </div>
              <div className="flex text-sm p-3">
                <p className="w-1/2 font-semibold text-slate-400">
                  Phone Number
                </p>
                <p className="w-1/2">{order.user_detail.phone}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="my-3 font-semibold text-lg text-slate-600">
              Order Summary
            </h2>
            <div className="flex flex-col gap-1 border rounded-lg border-slate-300 p-3">
              <div className="flex text-sm">
                <p className="w-1/2 font-semibold text-slate-400">
                  Total Price
                </p>
                <p className="w-1/2"> ₹ {order.total_amount}</p>
              </div>
              <div className="flex text-sm">
                <p className="w-1/2 font-semibold text-slate-400">
                  Coupon Discount
                </p>
                <p className="w-1/2"> ₹ {order.coupon_discount}</p>
              </div>
              <div className="flex text-sm">
                <p className="w-1/2 font-semibold text-slate-400">
                  Online Discount
                </p>
                <p className="w-1/2"> ₹ {order.online_discount}</p>
              </div>
              <div className="flex text-sm">
                <p className="w-1/2 font-semibold text-slate-400">
                  Final Price
                </p>
                <p className="w-1/2"> ₹ {order.final_amount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

export default OrderHistoryModal;
