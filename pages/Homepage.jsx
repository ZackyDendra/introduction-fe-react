import ContentMenu from "../components/content/ContentMenu";
import Footer from "../components/Footer/Footer";
import NavbarHomepage from "../components/Navigation/NavbarHomepage";
import Sidebar from "../components/Navigation/Sidebar";

export default function Homepage() {
  return (
    <>
      <NavbarHomepage />

      <div style={{ display: "flex" }}>
        <Sidebar />
        <ContentMenu />
      </div>

      <Footer />
    </>
  );
}