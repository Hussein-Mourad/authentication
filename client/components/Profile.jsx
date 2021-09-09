import Button from "components/Button";
import Link from "next/link";

const ProfileItem = ({ title, children }) => {
  return (
    <div className="flex items-center justify-between sm:justify-start px-2 py-8 sm:px-10 ">
      <span className="w-5/12 sm:w-2/12 mr-5 text-sm text-gray-500 dark:text-gray-300 font-medium uppercase">
        {title}
      </span>{" "}
      <div className="break-words inline-block w-5/6">{children}</div>
      <div>
      </div>
    </div>
  );
};

export default function Profile({ user }) {
  var fields = ["photo", "name", "bio", "phone", "email", "password"];
  return (
    <div className="sm:border border-gray-300 divide-y rounded-lg mt-2 sm:mt-7 w-full">
      <div className="w-full flex items-center justify-between px-2 sm:px-10 py-8">
        <div className="flex flex-col font-medium text-lg text-gray-800 dark:text-gray-200">
          Profile{" "}
          <span className="text-sm font-base text-gray-500 dark:text-gray-300">
            Some info may be visible to other people
          </span>
        </div>
        
        <Link href="/edit">
          <Button
            className="border border-gray-300 hover:bg-gray-50 
        active:bg-gray-100 active:text-gray-700 dark:hover:bg-gray-600 
        dark:active:text-gray-200 dark:active:bg-gray-500"
          >
            Edit
          </Button>
        </Link>
      </div>
      
      {fields.map((field, index) => (
        <ProfileItem key={index} title={field}>
          {field === "photo" && (
            <img
              className="w-20 h-20 rounded-lg"
              src={user[field]}
              alt="profile image"
            />
          )}
          {field !== "photo" && field !== "password" && user[field]}
          {field === "password" && "*".repeat(user["passwordLength"])}
        </ProfileItem>
      ))}
    </div>
  );
}

Profile.defaultProps = {
  user: {
    photo: "",
  },
};
