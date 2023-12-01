import MainMain from "@/domains/Main/organisms/MainMain";
import MainTemplate from "@/domains/Main/templates/MainTemplate";
import Header from "@/molecules/Header/Header";

const MainPage = () => {
  return (
    <MainTemplate Header={Header}>
      <MainMain />
    </MainTemplate>
  );
};

export default MainPage;
