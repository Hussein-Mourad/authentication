import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Button from "components/Button";
import ChangePhotoModal from "components/ChangePhotoModal";
import InputGroup from "components/InputGroup";
import Spacer from "components/Spacer";
import Router from "next/router";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { updateUserData } from "services/authServices";

export default function ProfileEdit({ user, setUser }) {
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    setPhoto(user.photo);
    setName(user.name);
    setBio(user.bio);
    setPhone(user.phone);
    setEmail(user.email);
    setPassword(user.password);
    return null;
  }, [user]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen((state) => !state);
  };
  const handleSave = () => {
    setIsLoading(true);
    var userData = { name, bio, phone, email };
    if (password !== user.password) userData.password = password;
    updateUserData(user._id, userData, (data, err) => {
      console.log(data, err);
      if (err) {
        setError(err);
        setIsLoading(false);
      }
      if (data.errors) setError(data.errors);
      else {
        setUser((user) => {
          return { ...user, ...userData, photo };
        });
        setMessage(data);
        Router.push("/");
      }
      setIsLoading(false);
    });
  };

  setTimeout(() => setMessage(""), 3000);

  return (
    <div
      className="sm:border border-gray-300 rounded-lg sm:mt-2 w-full p-2 sm:px-10 sm:py-5 md:py-8"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {isModalOpen && (
        <ChangePhotoModal
          photo={user.photo}
          setUser={setUser}
          id={user._id}
          stateHandler={toggleModal}
        />
      )}
      <h1 className="text-xl">Change info</h1>
      <p className="mt-2 dark:text-gray-200 text-sm">
        Changes will be reflected to every services
      </p>
      <div className="flex items-center">
        <div className="relative mt-5 mr-5 w-32 h-32 group flex  justify-center">
          <button
            className="hidden group-hover:flex items-center  justify-center absolute inset-0 bg-black bg-opacity-30 w-full rounded-md text-white active:text-gray-200"
            onClick={toggleModal}
          >
            <CameraAltIcon />
          </button>

          <img className="rounded-md" src={photo} alt="profile picture" />
        </div>
        <button
          className="uppercase text-gray-400 dark:text-gray-100 text-sm 
          hover:text-gray-500 active:text-gray-600 
          dark:hover:text-gray-200 dark:active:text-gray-300"
          onClick={toggleModal}
        >
          change photo
        </button>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <Spacer margin="my-3">
          <InputGroup
            inputClassName="p-2 text-sm placeholder-gray-400 dark:placeholder-gray-300 dark:text-gray-100"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name..."
          />
        </Spacer>
        <Spacer margin="my-3">
          <InputGroup
            inputClassName="p-2 text-sm placeholder-gray-400 dark:placeholder-gray-300 dark:text-gray-100"
            type="text"
            label="Bio"
            error={error?.bio}
            placeholder="Enter your Bio..."
            multiline
            cols="30"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="5"
          />
        </Spacer>
        <Spacer margin="my-3">
          <InputGroup
            inputClassName="p-2 text-sm placeholder-gray-400 dark:placeholder-gray-300 dark:text-gray-100"
            label="Phone"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={error?.phone}
            placeholder="Enter your phone..."
          />
        </Spacer>
        <Spacer margin="my-3">
          <InputGroup
            inputClassName="p-2 text-sm placeholder-gray-400 dark:placeholder-gray-300 dark:text-gray-100"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error?.email}
            placeholder="Enter your email..."
            readOnly={user?.isOAuthUser ?? false}
            disabled={user?.isOAuthUser ?? false}
          />
        </Spacer>
        <Spacer margin="my-3">
          <InputGroup
            inputClassName="p-2 text-sm placeholder-gray-400 dark:placeholder-gray-300 dark:text-gray-100"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error?.password}
            placeholder="Enter your password..."
          />
        </Spacer>
        <small className="block text-sm text-semibold text-green-500">
          {message}
        </small>
        <Button
          className="my-3 text-white dark:text-gray-200 bg-blue-500 font-medium
           active:bg-blue-600 focus:ring focus:ring-blue-300 dark:focus:ring-blue-400"
          leftIcon={
            isLoading ? (
              <Loader type="Oval" color="#fff" height={15} width={15} />
            ) : null
          }
          onClick={handleSave}
        >
          Save
        </Button>
      </form>
    </div>
  );
}

ProfileEdit.defaultProps = {
  user: {
    photo: "https://ui-avatars.com/api/?name=John+Doe",
  },
};
