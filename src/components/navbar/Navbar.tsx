import React from 'react';
import { NavLink } from 'react-router-dom'
import { StyledNavbar } from './styles'

const Navbar = () => {

    // const getShortenedName = (fullName: string | null): string => {
    //     if (!fullName) {
    //         return "";
    //     }
    //     const words = fullName.split(" ");
    //     return words.slice(0, 1).join(" ");
    // };

    // const signWithGoogle = async () => {
    //     const provider = new GoogleAuthProvider();
    //     try {
    //         await signInWithPopup(auth, provider);
    //     } catch (error) {
    //         console.error("Erro ao fazer login com Google", error);
    //     }
    // };

    return (
        <StyledNavbar>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/criar-Despesas">Criar Despesa</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/dashboard-page">Dashboard Page</NavLink>
        </StyledNavbar>
    )
}

export default Navbar;