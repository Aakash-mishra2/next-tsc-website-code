import Button from "../../common/Button";
import { BiLogOutCircle } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import CommonModal from "../../common/custom/CommonModal";

const LogoutModal = (props) => {
  return (
    <CommonModal
      handleClose={props.handleClose}
      openModal={props.logoutModalIsOpen}
    >
      <div className="p-2 max-w-lg">
        <p className="text-xl md:text-3xl mb-8 font-semibold text-blue-900">
          Do you really want to Logout?
        </p>
        <div className="flex gap-4 mt-5 justify-center">
          <Button
            handler={props.handleClose}
            className="bg-blue-900 border-blue-900 px-3 py-2 text-white border"
          >
            <VscChromeClose size={20} />
            <span className="font-semibold">Cancel</span>
          </Button>
          <Button className="border-blue-200 border-2 px-3 py-2" type="submit">
            <BiLogOutCircle size={20} />
            <span className="font-semibold">Logout</span>
          </Button>
        </div>
      </div>
    </CommonModal>
  );
};

export default LogoutModal;
