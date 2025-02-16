import { TiTick } from "react-icons/ti";
import { MdOutlineDeleteOutline } from "react-icons/md";

const ApplyCouponBtn = ({
  saved,
  showBtn,
  couponStatus,
  handleApplyCoupon,
}) => {
  return (
    <>
      {!showBtn && (
        <div
          className={`${
            couponStatus === "success" ? "mt-2 mb-4" : "my-2"
          } lg:mt-5 lg:mb-7`}
        >
          <div className="rounded-lg bg-gradient-to-r from-slate-100 to-slate-400/50 shadow-sm">
            {couponStatus === "success" && (
              <div className="py-2 px-3">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <TiTick
                      size={20}
                      className="bg-slate-600 w-5 rounded-full text-white"
                    />
                    <p className="text-md font-semibold text-slate-600">
                      You Saved ₹ {saved} with this code🎉
                    </p>
                  </div>
                  <div>
                    <MdOutlineDeleteOutline
                      title="Remove"
                      size={25}
                      onClick={() => handleApplyCoupon(null)}
                      className="text-slate-700 cursor-none lg:cursor-pointer"
                    />
                  </div>
                </div>
                <p className="text-sm text-slate-500 ml-7">Coupon Applied</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ApplyCouponBtn;
// <div
// onClick={() => showApplyCoupon(true)}
// className={`py-2 px-4 bg-white cursor-none lg:cursor-pointer ${
//   couponStatus === "success"
//     ? "rounded-b-lg"
//     : "rounded-lg bg-gradient-to-r from-slate-50 to-slate-300/70 shadow-md"
// }`}
// >
// <div className="flex justify-between items-center">
//   <p className="text-md font-semibold text-slate-600">
//     APPLY COUPON
//   </p>
//   <BsArrowRightShort size={25} className="text-slate-600" />
// </div>
// <p className="text-sm text-slate-500">
//   Save more with coupon available for you
// </p>
// </div>
