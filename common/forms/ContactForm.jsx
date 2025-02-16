import axios from "axios";
import Button from "../Button";
import { useState } from "react";
import { toast } from "react-toastify";
import config from "../../../config/config";

const ContactForm = () => {
  const [feedBack, setFeedBack] = useState({
    username: "",
    phoneNumber: "",
    comment: "",
    emailId: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: feedBack.emailId,
      name: feedBack.username,
      message: feedBack.comment,
      phone: "+91" + feedBack.phoneNumber,
    };
    if (feedBack?.comment.length < 10)
      return toast.error("Description must be at least 10 characters.");
    if (feedBack?.phoneNumber.length !== 10)
      return toast.error("Enter valid phone Number.");
    const BASE_URL = config.REACT_APP_BASE_URL;
    const resp = await axios.post(`${BASE_URL}api/contact/create/`, data, {
      headers: { "Content-Type": "application/json" },
    });
    if (resp.status === 201) {
      toast("Your feedback has been submitted");
      setFeedBack(null);
    }
  };
  return (
    <div className="rounded-none shadow-2xl">
      <div className="p-4 lg:p-14">
        <h4 className="text-lg py-4 lg:py-0 lg:text-2xl font-bold text-center">
          WANT TO SAY SOMETHING?
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 lg:mt-14">
            <div className="relative">
              <input
                type="text"
                id="username"
                maxLength="50"
                name="username"
                placeholder=" "
                pattern="^[^-\s][a-zA-Z \s]*$"
                value={feedBack?.username || ""}
                className="block px-2.5 pb-2.5 pt-4 w-full text-lg text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
                onChange={(e) =>
                  setFeedBack({ ...feedBack, username: e.target.value })
                }
                required
                autoFocus
              />
              <label
                htmlFor="username"
                className="absolute rounded-lg text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
              >
                Name *
              </label>
            </div>
          </div>
          <div className="mt-5">
            <div className="relative">
              <input
                type="email"
                id="emailId"
                maxLength="50"
                placeholder=" "
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                className="block px-2.5 pb-2.5 pt-4 w-full text-lg text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
                value={feedBack?.emailId || ""}
                onChange={(e) =>
                  setFeedBack({ ...feedBack, emailId: e.target.value })
                }
                required
              />
              <label
                htmlFor="emailId"
                className="absolute rounded-lg text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
              >
                Email *
              </label>
            </div>
          </div>
          <div className="mt-5">
            <div className="relative">
              <input
                type="text"
                maxLength="10"
                placeholder=" "
                id="phoneNumber"
                name="phoneNumber"
                pattern="[0-9\/]*"
                required
                className="block px-2.5 pb-2.5 pt-4 w-full text-lg text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
                value={feedBack?.phoneNumber || ""}
                onChange={(e) =>
                  setFeedBack({ ...feedBack, phoneNumber: e.target.value })
                }
              />
              <label
                htmlFor="phoneNumber"
                className="absolute rounded-lg text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
              >
                Phone Number
              </label>
            </div>
          </div>
          <div className="mt-5">
            <div className="relative">
              <textarea
                rows={5}
                type="text"
                id="comment"
                name="comment"
                placeholder=" "
                maxLength="250"
                className="block px-2.5 pb-2.5 pt-4 w-full text-lg text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
                value={feedBack?.comment || ""}
                onChange={(e) =>
                  setFeedBack({ ...feedBack, comment: e.target.value })
                }
                required
              />
              <label
                htmlFor="comment"
                className="absolute rounded-lg text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
              >
                Describe Your Query *
              </label>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full rounded-lg h-12 bg-gray-400 text-white border border-gray-400 mt-5 py-3 hover:bg-gray-400/90"
          >
            <span className="text-center w-full text-xl">Send Message</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
