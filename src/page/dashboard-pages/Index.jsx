import { Header, DashboardMenu, Banner } from "../../components/layout";

function Index() {
  return (
    <>
      <Header />
      <DashboardMenu />
      <Banner
        text1="Hi, oaksintelligence"
        text2="Welcome to Conditron"
        text3="page 2 Account Verified."
      />
    </>
  );
}

export default Index;
