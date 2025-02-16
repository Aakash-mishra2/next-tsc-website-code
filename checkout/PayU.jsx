import config from "@/config/config";

const PayU = ({
  payURef,
  payUpinRef,
  payUhashRef,
  initiatePayU,
  payUemailRef,
  payUphoneRef,
  payUorderRef,
  payUamountRef,
  payUaddressRef,
  payUorderIdRef,
  payUproductRef,
  payUlastnameRef,
  payUfirstnameRef,
}) => {
  const PAYU_SUCCESS_URL = `${config?.BASE_URL}api/checkout/redirect/?url=${window.location.origin}/&verify=true`;
  const PAYU_FAILURE_URL = `${config?.BASE_URL}api/checkout/redirect/?url=${
    window.location.origin
  }/${initiatePayU ? "&cod_to_paid=true" : ""}`;

  return (
    <div className="hidden">
      <form action={config?.PAYU_URL} method="POST">
        <input ref={payUhashRef} name="hash" />
        <input
          ref={payUemailRef}
          name="email"
          defaultValue={"ayuvyauser@gmail.com"}
        />
        <input ref={payUphoneRef} name="phone" />
        <input ref={payUorderRef} name="txnid" />
        <input ref={payUpinRef} name="zipcode" />
        <input ref={payUorderIdRef} name="udf1" />
        <input ref={payUamountRef} name="amount" />
        <input ref={payUaddressRef} name="address1" />
        <input ref={payUlastnameRef} name="lastname" />
        <input ref={payUfirstnameRef} name="firstname" />
        <input ref={payUproductRef} name="productinfo" />
        <input name="key" defaultValue={config?.PAY_KEY} />
        <input name="surl" defaultValue={PAYU_SUCCESS_URL} />
        <input name="furl" defaultValue={PAYU_FAILURE_URL} />
        <input
          name="enforce_paymethod"
          defaultValue="creditcard|debitcard|netbanking|upi|cashcard"
        />
        <button type="submit" ref={payURef}>
          PAYU
        </button>
      </form>
    </div>
  );
};

export default PayU;
