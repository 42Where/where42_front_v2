import React from "react";
import FunctionButtonIcon from "&/Icons/functionButton.svg";
import UserAddIcon from "&/Icons/userAdd.svg";
import User from "@/types/User";
import { Size } from "@/types/enums";
import Checkbox from "@/atoms/buttons/Checkbox/Checkbox";
import IconButton from "@/atoms/buttons/IconButton/IconButton";
import ProfileCard from "../ProfileCard/ProfileCard";

import styles from "./UserTable.module.scss";

type UserTableProps = {
  users?: (User & { isChecked?: boolean })[];
  isInEditMode?: boolean;
  size: Size;
};

const UserTable: React.FC<UserTableProps> = ({
  users,
  isInEditMode = false,
  size,
}) => {
  const ProfileComponentList = users?.map((user, i) => (
    <ProfileCard key={i} user={user} size={size}>
      {isInEditMode ? (
        <Checkbox isChecked={user?.isChecked} size={size} />
      ) : user?.isFriend ? (
        <IconButton Icon={FunctionButtonIcon} size={size} />
      ) : (
        <IconButton Icon={UserAddIcon} size={size} />
      )}
    </ProfileCard>
    // TODO: 이거 나중에 리팩토링 어떻게하지?????
  ));

  return <div className={styles["profile-table"]}>{ProfileComponentList}</div>;
};

export default UserTable;
