import Form from "../common/Form";
import { handleKeyPress, valid } from "@/api/generalFunc";

const PersonalDetail = ({
  user,
  disableText,
  customErrors,
  handleOnChange,
  isShipRocketOrder,
  handleCustomError,
  handleBlockCODCheck,
}) => {
  return (
    <>
      <div className="mt-3">
        <Form
          id="phone"
          type="text"
          name="phone"
          maxLength="10"
          inputMode="numeric"
          value={user.phone}
          label="Phone Number *"
          onBlur={handleCustomError}
          onKeyPress={handleKeyPress}
          onChange={handleBlockCODCheck}
          disabled={disableText || JSON.parse(isShipRocketOrder)}
          customerrors={valid.inputField(customErrors, "phone")}
        />
      </div>
      {/*      <div className="flex gap-3 items-center">
        <FormInput
          type="checkbox"
          id="notification"
          name="notification"
          className="h-5 w-5 mt-2 rounded-md"
          value={user.notification}
          onChange={handleOnChange}
        />
        <label htmlFor="notification" className="text-sm">
          Keep me up to date on news and exclusive offers
        </label>
  </div>*/}
      <h2 className="text-xl pb-2 mt-3">Shipping Address</h2>
      <div className="flex flex-col md:flex-row gap-2 md:gap-5">
        <div className="w-full lg:w-1/2">
          <Form
            type="text"
            maxLength="49"
            id="first_name"
            name="first_name"
            label="First Name *"
            disabled={disableText}
            value={user.first_name}
            onChange={handleOnChange}
            onBlur={handleCustomError}
            customerrors={valid.inputField(customErrors, "first_name")}
          />
        </div>
        <div className="w-full lg:w-1/2 mt-3 lg:mt-0">
          <Form
            type="text"
            id="last_name"
            maxLength="49"
            name="last_name"
            label="Last Name *"
            disabled={disableText}
            value={user.last_name}
            onChange={handleOnChange}
            onBlur={handleCustomError}
            customerrors={valid.inputField(customErrors, "last_name")}
          />
        </div>
      </div>
    </>
  );
};

export default PersonalDetail;
