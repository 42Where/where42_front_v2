import React, { use, useState } from "react";
import { Input, Modal } from "antd";
import { SearchProps } from "antd/es/input";

import User from "@/types/User";
import { Size } from "@/types/enums";
import UserTable from "../UserTable/UserTable";
import { useSize } from "@/utils/MediaQuary";
import memberApi from "@/api/memberApi";
import groupApi from "@/api/groupApi";
import useMyDataStore from "@/stores/useUserStore";

// import styles from "./SearchModal.module.scss";

type SearchModalProps = {
  open: boolean;
  onCancel: () => void;
  /**
   * 컴포넌트의 크기입니다.
   */
  size: Size;
};

const SearchModal: React.FC<SearchModalProps> = ({ open, size, onCancel }) => {
  const [inputValue, setInputValue] = useState("");
  const [userList, setUserList] = useState<User[]>([]);
  const Size = useSize();

  const { user } = useMyDataStore();

  // const {
  //   myData: { id },
  // } = useMyDataStore((state) => state);

  const onSearch: SearchProps["onSearch"] = (v, e) => {
    e?.preventDefault();
    console.log(v);
    memberApi
      .searchMember({ keyWord: v })
      .then((data) => {
        console.log(data);
        // 임시로 모두 그룹에 추가
        groupApi.addMemberAtGroup({
          groupId: user?.defaultGroupId as number,
          members: data.map((user) => user.intraId),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };
  const handleCancle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setInputValue("");
    setUserList([]);
    onCancel();
  };

  return (
    <Modal title="카뎃 검색" open={open} onCancel={handleCancle} footer={null}>
      <Input.Search
        placeholder="검색할 카뎃의 아이디를 입력해주세요"
        value={inputValue}
        onChange={onChange}
        onSearch={onSearch}
        allowClear
        size={Size === "medium" ? "middle" : Size}
      />
      <UserTable users={userList} />
    </Modal>
  );
};

export default SearchModal;
