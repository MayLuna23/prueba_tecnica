import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "Vuelos",
      "/login": "Login",
      
    };

    document.title = titles[location.pathname] || "10s Vuelos";
  }, [location]);
};
