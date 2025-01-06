import React, { createContext, useContext, useEffect, useState} from "react"
import { auth, googleProvider } from "../config/firebase";
import { onAuthStateChanged,signInWithPopup, signOut } from "firebase/auth"
import axios from "axios";

const AuthContext = createContext()
export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null) 
    const [loading, setLoading] = useState(true)
    

    const signInWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
    
        // Obtener el token de Firebase y enviarlo al backend
        const firebaseToken = result._tokenResponse.idToken;

        // Obtener el token de Firebase
        //const firebaseToken = await user.getIdToken();

        const response = await axios.post(
          'https://lounge-project-production.up.railway.app/api/login',
          {
            firebaseToken,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }
        );
    
        if (response.data.ok) {
          // Guardar datos y actualizar contexto
          localStorage.setItem("firebaseToken", firebaseToken);
          localStorage.setItem("userId", response.data.usuario.id);
          setUser({ ...user, id: response.data.usuario.id });
          console.log("Usuario id es ", response.data.usuario.id);
        } else {
          console.error("Error en la autenticación del backend:", response.data);
          logout();
        }
      } catch (error) {
        if (error.response) {
          console.error("Error del servidor:", error.response.data);
        } else if (error.request) {
          console.error("Sin respuesta del servidor:", error.request);
        } else {
          console.error("Error al iniciar sesión con Google:", error.message);
        }
      }
    };
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            const userId = localStorage.getItem("userId");
            setUser({ ...firebaseUser, id: userId }); // Agrega el ID al estado del usuario
          } else {
            setUser(null);
          }
          setLoading(false);
        });
        return unsubscribe;
      }, []);

    const logout = async () => {
        try {
          await signOut(auth);
          setUser(null);
          localStorage.removeItem("firebaseToken");
          localStorage.removeItem("userId");
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
        }
      };

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <AuthContext.Provider value={{user, signInWithGoogle, logout}}>
            {children}
        </AuthContext.Provider>
    )   

}

export const useAuth = () => {
    return useContext(AuthContext)
}