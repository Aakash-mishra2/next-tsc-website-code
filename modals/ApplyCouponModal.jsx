"use client";

import { PromoCode } from "../checkout";
import { TbDiscount2 } from "react-icons/tb";
import { VscChromeClose } from "react-icons/vsc";
import CommonModal from "../common/custom/CommonModal";

const ApplyCouponModal = ({
  user,
  coupons,
  applyCoupon,
  handleClose,
  handleOnChange,
  showApplyCoupon,
  handleApplyCoupon,
}) => {
  return (
    <CommonModal
      openModal={applyCoupon}
      handleClose={handleClose}
      notAllowClickAnywhere={() => showApplyCoupon(true)}
    >
      <div>
        <div className="max-w-screen md:max-w-[350px] rounded-[12px]">
          <div className="flex sticky top-0 justify-between items-center pt-0">
            <div className="flex justify-between w-full items-center">
              <div className="flex gap-3 items-center">
                <TbDiscount2 size={30} className="text-slate-600" />
                <p className="text-xl font-semibold text-slate-600">
                  APPLY COUPONS
                </p>
              </div>
              <VscChromeClose
                size={22}
                onClick={handleClose}
                className="text-gray-500 cursor-none lg:cursor-pointer"
              />
            </div>
          </div>
          <div className="pt-4 max-h-[420px] overflow-auto example">
            <div className="border-b border-b-slate-300 pb-4">
              <PromoCode
                user={user}
                handleOnChange={handleOnChange}
                handleApplyCoupon={handleApplyCoupon}
              />
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

export default ApplyCouponModal;
// {coupons?.applicable?.length === 0 &&
//   coupons?.non_applicable?.length === 0 ? (
//     <>
//       <Image
//         width={100}
//         height={100}
//         priority
//         className="w-2/3 p-5 mx-auto mix-blend-multiply"
//         src={DiscountNotAvailable}
//         alt="No coupons Available"
//       />
//       <p className="text-center">
//         It seems like you don&apos;t have any coupon at the moment
//       </p>
//     </>
//   ) : (
//     <div>
//       <div>
//         <h2 className="text-lg font-semibold mt-2 text-slate-500 mb-3">
//           Available Coupons{" "}
//           <span className="text-sm">
//             ({coupons?.applicable?.length})
//           </span>
//         </h2>
//         {coupons?.applicable?.length > 0 && (
//           <CouponCard
//             isAvailable={true}
//             handleClose={handleClose}
//             data={coupons?.applicable}
//             handleApplyCoupon={handleApplyCoupon}
//           />
//         )}
//       </div>
//       <div>
//         <h2 className="text-lg font-semibold my-3 text-slate-500">
//           Unavailable Coupons{" "}
//           <span className="text-sm">
//             ({coupons?.non_applicable?.length})
//           </span>
//         </h2>
//         {coupons?.non_applicable?.length > 0 && (
//           <CouponCard
//             isAvailable={false}
//             handleClose={handleClose}
//             data={coupons?.non_applicable}
//             handleApplyCoupon={handleApplyCoupon}
//           />
//         )}
//       </div>
//     </div>
//   )}
