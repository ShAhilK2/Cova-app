import React from "react";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const selectedUser = useSelector((state) => state.user.userData);
  return (
    <div className="flex justify-center items-center">
      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full">
        <img
          src={selectedUser?.avatar}
          alt={selectedUser?.name}
          className="w-full h-full rounded-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold dark:text-white">
          {selectedUser?.name}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {selectedUser?.email}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
