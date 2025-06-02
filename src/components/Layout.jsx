import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="container max-w-7xl mx-auto">
      <Navbar />
      <main>{children} </main>
      <Footer />
    </div>
  );
};

export default Layout;
