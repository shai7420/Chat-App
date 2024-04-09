import React, { useState } from 'react'
import './Form.css';
import Navbar from '../Navbar';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate, NavLink } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbLockCode } from "react-icons/tb";

const Login = () => {

    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmits = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        }catch (error) {
            setError(true);
        }
    };

    return (
        <div className="App Section">
            <Navbar/>
            <section className="z-index mt-5">
                <div className="container wrapper">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-sm-12">
                                <div className="text-contentview">
                
                                    <form onSubmit={handleSubmits} className="mb-5 col-sm-8 offset-sm-2 col-md-4 offset-md-4 card registerform">
                                        <h2 className="text-center pt-3 pb-4">Login</h2>
                                            <div className="form-group mb-4">
                                                <input type="email" name="email" errormessage="It should be a valid Email address!" placeholder="Email" className="form-control" required/>
                                                <div className="icon-container">
                                                    <MdOutlineMailOutline/>
                                                </div>
                                            </div>
                                            <div className="form-group mb-4">
                                                <input type="Password" name="password" errormessage="Password should be 7-15 characters" placeholder="Password" className="form-control" pattern="^[A-Za-z0-9!@#$%^&*]{7,15}$" required/>
                                                <div className="icon-container">
                                                    <TbLockCode/>
                                                </div>
                                            </div>
                                            <div className="form-group mt-2 pb-2">
                                                <button type="submit" className="btn btn-block CreateAccount">Login</button>
                                            </div>
                                            {error && <span class="text-danger text-center">Wrong Crendentials... Try again</span>}
                                            <div className="text-center pt-1 pb-2">
                                                <p className="Already">
                                                    Don't have an account?
                                                    <NavLink to={"/Register"} className="LoginBtn">
                                                        Signup
                                                    </NavLink>
                                                </p>
                                            </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;