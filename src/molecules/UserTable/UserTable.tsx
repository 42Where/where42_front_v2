import React from "react";

import User from "@/types/User";
import Group from "@/types/Group";

import ProfileCard from "../ProfileCard/ProfileCard";

import styles from "./UserTable.module.css";

type UserTableProps = {
  users?: (User & {
    Icon?: React.ReactNode;
    onClick?: React.MouseEventHandler;
  })[];
  parentGroup?: Group;
};

const UserTable: React.FC<UserTableProps> = ({ users, parentGroup }) => {
  return (
    <div className={styles.user_table}>
      {users?.map((user) => (
        <ProfileCard
          key={user.intraId}
          user={user}
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
