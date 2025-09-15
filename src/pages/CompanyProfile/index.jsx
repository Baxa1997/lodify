import HeadBreadCrumb from "../../components/HeadBreadCrumb";
import MainHeading from "../../components/MainHeading";
import MainTabs from "../../components/MainTabs";
import { CompanyInfo } from "./modules/CompanyInfo";
import { Report } from "./modules/Report";

const CompanyProfile = () => {
  return (
    <div>
      <HeadBreadCrumb title={"Company Profile"} />
      <MainHeading
        mt="20px"
        mb="20px">
        Company Profile
      </MainHeading>
      <MainTabs
        tabList={[
          "Company Info",
          "Equipment",
          "Domicile(s)",
          "Certifications",
          "Business Ownership Information",
          "FMCSA Report",
        ]}
        tabPanels={[
          <CompanyInfo key={"Company Info"} />,
          <></>,
          <></>,
          <></>,
          <></>,
          <Report key={"FMCSA Report"} />,
        ]} 
      />
    </div>
  );
};

export default CompanyProfile;
