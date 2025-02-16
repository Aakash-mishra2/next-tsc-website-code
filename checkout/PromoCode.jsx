const PromoCode = ({
  user,
  newUI,
  handleOnChange,
  isButtonDisabled,
  handleApplyCoupon,
}) => {
  const ApplyPromoCode = async (e) => {
    e.preventDefault();
    if (isButtonDisabled) return;
    console.log(user.promoCode);
    handleApplyCoupon(user.promoCode);
  };
  return (
    <>
      {newUI ? (
        <div className="flex justify-center items-center gap-2">
          <input
            type="text"
            id="promoCode"
            name="promoCode"
            value={user.promoCode}
            onChange={handleOnChange}
            disabled={isButtonDisabled}
            placeholder="Gift card or discount code"
            className="py-3 w-full border border-gray-500 rounded-md outline-none focus:border-2 transition-all duration-200 ease-linear focus:border-gray-400 text-slate-600 pl-4"
          />
          <span
            onClick={ApplyPromoCode}
            className="bg-slate-500 transition-all duration-200 px-6 rounded-md text-lg text-white hover:bg-slate-500/80 py-[11px] cursor-none lg:cursor-pointer"
          >
            Apply
          </span>
        </div>
      ) : (
        <div className="border border-slate-600 rounded-full bg-white pr-1 flex justify-between items-center">
          <input
            type="text"
            id="promoCode"
            name="promoCode"
            placeholder="Promo Code"
            value={user.promoCode}
            onChange={handleOnChange}
            className="py-3 w-full rounded-full text-slate-600 outline-none pl-4"
            autoFocus
          />
          <span
            onClick={ApplyPromoCode}
            className="bg-slate-500 transition-all duration-200 px-8 rounded-full text-white hover:bg-slate-500/80 py-2 cursor-none lg:cursor-pointer"
          >
            Apply
          </span>
        </div>
      )}
    </>
  );
};

export default PromoCode;
