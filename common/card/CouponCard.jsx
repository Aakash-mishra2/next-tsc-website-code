import { toast } from "react-toastify";
import { TbDiscount2 } from "react-icons/tb";

const CouponCard = ({ isAvailable, data, handleApplyCoupon }) => {
  return (
    <div className="flex flex-col gap-4">
      {data.map((coupon, index) => {
        return (
          <div
            key={index}
            className={`bg-white shadow-md rounded-lg ${
              isAvailable
                ? "cursor-none lg:cursor-pointer"
                : "cursor-not-allowed"
            }`}
          >
            <div
              className={`border-b border-dashed border-b-slate-300 p-3 ${
                !isAvailable && "opacity-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <TbDiscount2 size={22} className="text-slate-600 w-7" />
                  <p className="text-md font-bold text-slate-700">
                    {coupon.code.toUpperCase()}
                  </p>
                </div>
                <p
                  onClick={
                    isAvailable
                      ? () => handleApplyCoupon(coupon.code)
                      : () => toast.warn("Coupon is not available!")
                  }
                  className="text-slate-700 text-sm font-semibold lg:hover:underline lg:hover:underline-offset-4"
                >
                  Apply
                </p>
              </div>
              <p className="text-sm text-slate-600 ml-9">
                {coupon?.title || "New coupon"}
              </p>
            </div>
            <p className="p-3 text-xs ml-9 text-slate-400">
              {coupon?.message || "Description"}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CouponCard;
