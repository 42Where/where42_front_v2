import React, { useState } from "react";
import { Input, Modal } from "antd";
import { SearchProps } from "antd/es/input";

import User from "@/types/User";
import { Size } from "@/types/enums";
import UserTable from "../UserTable/UserTable";
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
  // const {
  //   myData: { id },
  // } = useMyDataStore((state) => state);

  const onSearch: SearchProps["onSearch"] = (v, e) => {
    e?.preventDefault();
    // Axios.get("/v3/search", { params: { intraId: id, keyWord: v } })
    //   .then((res) => {
    //     // setUserList(res.data);
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // TODO: 임시 구현
    // api 호출 후에 setUserList로 상태 업데이트 구현 필요
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
        size="large"
      />
      <UserTable users={userList} size={size} />
    </Modal>
  );
};

export default SearchModal;
