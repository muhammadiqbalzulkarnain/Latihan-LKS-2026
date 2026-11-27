import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NoAuth() {
    const token = window.localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            <Link to="/login" />
        }
    });

    return <Outlet />
}