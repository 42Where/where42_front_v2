import type { Meta, StoryObj } from "@storybook/react";

import Header from "./Header";

/**
 * - Header로 사용할 컴포넌트입니다.
 * - 로그인했을경우 검색, 로그아웃 버튼이 보입니다.
 * - 로고를 클릭하면 메인페이지로 이동합니다.
 * - 검색 버튼을 클릭하면 검색창으로 이동합니다.
 * - 추후 검색창으로 이동이 아닌 검색 플로트를 띄우는 방식으로 변경할 예정입니다.
 * - 로그아웃 버튼을 클릭하면 로그아웃을 합니다.
 * - 추후 redux/zustand 도입시 userData를 제거할 예정입니다.
 */

export default {
  title: "Molecules/Header",
  component: Header,
  tags: ["autodocs"],
} as Meta;

type HeaderType = StoryObj<typeof Header>;

export const BasicHeader: HeaderType = {
  args: {
    url: "/",
  },
};

export const MainHeader: HeaderType = {
  args: {
    url: "/main",
  },
};

export const SearchPageHeader: HeaderType = {
  args: {
    url: "/search",
  },
};
