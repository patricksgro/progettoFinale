import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext.jsx";

export function ProtectedRoute({ children }) {
    const { token } = useAuthContext();

    if (!token) {

        return <Navigate to="/login" replace />;
    }

    return children;
}