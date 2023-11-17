import { Header, BreadCrumb, Banner } from "../../components/layout";
import * as images from "../../assets";
import "./auth.css";

function RegisterSuccessPage() {
  return (
    <>
      <Header />
      <BreadCrumb />
      <Banner
        text1="Hi, oaksintelligence"
        text2="Welcome to Conditron"
        text3="page 1 Account Unverification."
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="contain-img d-flex justify-content-center">
            <img src={images.people} alt="" className="img-fluid" />
          </div>
        </div>
        <div className="row pb-3 justify-content-center">
          <p className="text-center verification">
            Your Acccount is Undergoing Verification
          </p>
        </div>
      </div>
    </>
  );
}

export default RegisterSuccessPage;
