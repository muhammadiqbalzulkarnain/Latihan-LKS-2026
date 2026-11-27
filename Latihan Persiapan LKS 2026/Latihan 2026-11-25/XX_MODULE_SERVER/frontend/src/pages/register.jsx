import {Link} from 'react-router-dom';
import {useState} from 'react';
import {register} from "../helpers/fetch.js";

export default function Register() {
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullName = e.target.full_name.value;
        const username = e.target.username.value;
        const password = e.target.password.value;
        const bio = e.target.bio.value;
        const isPrivate = e.target.is_private.checked;

        register({ fullName, username, password, bio, isPrivate }, setErrors)
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
                                    <h5 className="mb-0">Register</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-2">
                                            <label htmlFor="full_name">Full Name</label>
                                            <input type="text" className="form-control" id="full_name" name="full_name" required />
                                            <p clasName={'text-danger'}>{errors?.['full_name']?.[0]}</p>
                                        </div>

                                        <div className="mb-2">
                                            <label htmlFor="username">Username</label>
                                            <input type="text" className="form-control" id="username" name="username" required />
                                            <p clasName={'text-danger'}>{errors?.['username']?.[0]}</p>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" id="password" name="password" required />
                                            <p clasName={'text-danger'}>{errors?.['password']?.[0]}</p>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="bio">Bio</label>
                                            <textarea name="bio" id="bio" cols="30" rows="3" className="form-control"></textarea>
                                            <p clasName={'text-danger'}>{errors?.['bio']?.[0]}</p>
                                        </div>

                                        <div className="mb-3 d-flex align-items-center gap-2">
                                            <input type="checkbox" id="is_private" name="is_private" />
                                            <label htmlFor="is_private">Private Account</label>
                                            <p clasName={'text-danger'}>{errors?.['is_private']?.[0]}</p>
                                        </div>

                                        <button type="submit" className="btn btn-primary w-100">
                                            Register
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="text-center mt-4">
                                Already have an account? <Link to="/">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}