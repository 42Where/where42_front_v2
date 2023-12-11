import MainMain from "@/domains/Main/organisms/MainMain";
import MainTemplate from "@/domains/Main/templates/MainTemplate";
import Header from "@/molecules/Header/Header";
import Footer from "@/molecules/Footer/Footer";

const MainPage = () => {
  return (
    <MainTemplate Header={Header} Footer={Footer}>
      <MainMain />
    </MainTemplate>
  );
};

export default MainPage;
