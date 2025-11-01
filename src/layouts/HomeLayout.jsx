import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
;

const HomeLayout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000); 
    return () => clearTimeout(timer);
  }, [location]);

  if (isLoading) return <Loading />; 

  return (
    <div>
      <header>
        <nav className="mx-auto my-3">
          <Navbar />
        </nav>
      </header>

      <main className="min-h-[80vh]">
        <section className="main">
            
          <Outlet />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomeLayout;
