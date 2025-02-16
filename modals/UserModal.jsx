import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { CgAdd } from "react-icons/cg";
import { Form, Button } from "../common";
import config from "../../config/config";
import { CommonModal } from "../common/custom";
import { VscChromeClose } from "react-icons/vsc";

const UserModal = (props) => {
  // const navigate = useNavigate();
  const [file, setFile] = useState({});
  const [user, setUser] = useState({
    name: props.user.firstName,
    gender: props.user.gender,
    dateOfBirth: props.user.dateOfBirth,
    profilePic: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const BASE_URL = config.REACT_APP_BASE_URL;
    const resp = await axios.post(`${BASE_URL}account`, user);
    if (resp.data.message === "success") {
      // navigate("/my-account");
    }
  };

  const updateUser = (e) => {
    e.preventDefault();
  };

  return (
    <CommonModal
      handleClose={props.handleClose}
      openModal={props.userModalIsOpen}
      notAllowClickAnywhere={() => props.openUserModal(true)}
    >
      <div className="p-4 max-w-4xl">
        <h2 className="text-slate-600 pb-4 text-xl md:text-3xl font-bold border-b-2 border-gray-500">
          Edit your details
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-0 md:gap-5 lg:pt-5 justify-start">
            <div className="flex relative flex-col justify-start items-center">
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .webp"
                className="absolute opacity-0 mt-12 z-20 h-40 w-40 top-4 cursor-none lg:cursor-pointer"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                name="image"
              />
              <div className="flex gap-2 required left-0 items-center my-4">
                <CgAdd
                  size={25}
                  className="cursor-none lg:cursor-pointer text-slate-600"
                />
                <p className="text-slate-600 font-bold text-lg">
                  Upload Your Profile Picture
                </p>
              </div>
              <div className="w-40 relative rounded-lg mb-4">
                <Image
                  width={100}
                  height={100}
                  priority
                  className="rounded max-h-40 w-40 object-cover"
                  src={file?.name ? URL.createObjectURL(file) : placeholder}
                  alt={user?.name}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="mt-5">
                <Form
                  type="text"
                  label="Name"
                  maxLength="50"
                  id="first_name"
                  name="first_name"
                  value={user.name}
                  pattern="^[A-Za-z\s]{3,50}$"
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              <div className="relative mt-5">
                <select
                  id="gender"
                  name="gender"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-lg text-gray-500 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
                  value={user.gender}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
                <label
                  htmlFor="gender"
                  className="absolute rounded-lg text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
                >
                  Gender
                </label>
              </div>
              <div className="mt-5">
                <Form
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  label="Date of Birth"
                  placeholder="Date Of Birth"
                  value={user.dateOfBirth}
                  onChange={(e) =>
                    setUser({ ...user, dateOfBirth: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-5">
            <Button
              handler={props.handleClose}
              className="bg-slate-600 h-12 border-slate-600 text-white border px-4 rounded-md"
            >
              <VscChromeClose size={20} />
              <span className="font-semibold">Cancel</span>
            </Button>
            <Button
              handler={updateUser}
              className="border-slate-600 h-12 border-2 px-6 hover:bg-slate-600 hover:text-white text-lg rounded-md"
              type="submit"
            >
              <span className="font-semibold">Update</span>
            </Button>
          </div>
        </form>
      </div>
    </CommonModal>
  );
};

export default UserModal;
