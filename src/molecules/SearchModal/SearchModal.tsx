import React, { useState } from "react";
import { Input, Modal } from "antd";
import { SearchProps } from "antd/es/input";

import User from "@/types/User";
import { Size } from "@/types/enums";
import UserTable from "../UserTable/UserTable";
import { useSize } from "@/utils/MediaQuary";
import memberApi from "@/api/memberApi";
// import useMyDataStore from "@/stores/useMyDataStore";

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
  // const {
  //   myData: { id },
  // } = useMyDataStore((state) => state);

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    _e?.preventDefault();

    console.log(info?.source, value);

    // create dummy data
    const dummyUserList: User[] = [
      {
        intraId: 0,
        intraName: "김민수",
        image: "https://cdn.intra.42.fr/users/minsu.jpg",
        inCluster: true,
        agree: true,
      },
      {
        intraId: 1,
        intraName: "박민수",
        image: "https://cdn.intra.42.fr/users/minsu.jpg",
        inCluster: true,
        agree: true,
      },
      {
        intraId: 2,
        intraName: "이민수",
        image: "https://cdn.intra.42.fr/users/minsu.jpg",
        inCluster: true,
        agree: true,
      },
    ];
    setUserList(dummyUserList);

    // memberApi
    //   .getMemberInfo({ intraId: Number(value) })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
