import {Link} from 'react-router-dom';
import {login} from "../helpers/fetch.js";
import {useState} from "react";

export default function Login() {
    const [errors, setErrors] = useState()
    document.title = 'Login'

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value
        const password = e.target.password.value

        login(username, password, setErrors);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container">
                    <Link className="navbar-brand m-auto" to="/">Facegram</Link>
                </div>
            </nav>

            <main className="mt-5">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="card">
                                <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                                    <h5 className="mb-0">Login</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-2">
                                            <label htmlFor="username">Username</label>
                                            <input type="text" className="form-control" id="username" name="username" required />
                                            <p className={'text-danger'}>{errors?.['username']?.[0]}</p>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" id="password" name="password" required />
                                            <p className={'text-danger'}>{errors?.['password']?.[0]}</p>
                                        </div>

                                        <button type="submit" className="btn btn-primary w-100">
                                            Login
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="text-center mt-4">
                                Don't have account? <Link to="/register">Register</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}