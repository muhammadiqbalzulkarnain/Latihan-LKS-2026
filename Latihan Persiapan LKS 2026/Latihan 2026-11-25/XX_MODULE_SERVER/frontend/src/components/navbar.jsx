import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function navbar() {
    const username = window.localStorage.getItem('username') || '';

    return <>

        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div className="container">
                <Link className="navbar-brand m-auto" to="/homepage">Facegram</Link>
                <div className="navbar-nav">
                    <Link className="nav-link" to={`/profile/${username}`}>@{username}</Link>
                    <Link className="nav-link" to="/logout">Logout</Link>
                </div>
            </div>
        </nav>

        <Outlet />
    </>
}