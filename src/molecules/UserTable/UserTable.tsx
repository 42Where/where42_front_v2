import React from "react";
import User from "@/types/User";
import { Size } from "@/types/enums";
import ProfileCard from "../ProfileCard/ProfileCard";

import styles from "./UserTable.module.scss";
import Group from "@/types/Group";

type UserTableProps = {
  users?: (User & {
    Icon?: React.ReactNode;
    onClick?: React.MouseEventHandler;
  })[];
  parentGroup?: Group;
  size: Size;
};

const UserTable: React.FC<UserTableProps> = ({ users, size, parentGroup }) => {
  return (
    <div className={styles["profile-table"]}>
      {users?.map((user) => (
        <ProfileCard
          key={user.id}
          user={user}
          size={size}
          onClick={user.onClick}
          parentGroup={parentGroup}
        >
          {user.Icon}
        </ProfileCard>
      ))}
    </div>
  );
};

export default UserTable;
