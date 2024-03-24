import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./state/auth/auth";

function ProtectedRoute({ element, ...rest }) {
    const navigate = useNavigate();
    const { user } = useAuthStore();
  
   useEffect(() => {
      if (!user) {
        navigate('/login');
      }
    }, [user, navigate]);
  
    return user ? element : null;
  }
  export default ProtectedRoute;