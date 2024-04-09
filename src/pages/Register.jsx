import React, { useState } from 'react'
import './Form.css';
import Navbar from '../Navbar';
import { useNavigate, NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbLockCode } from "react-icons/tb";
import { FaFileImage } from "react-icons/fa";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Register = () => {

    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
    
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, `profilepicture/${displayName}`);
            await uploadBytesResumable(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
    
            await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
            });
    
            try {
                await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                });
                await setDoc(doc(db, "userChats", res.user.uid), {});
            } catch (error) {
                console.error("Error setting user document:", error);
                setError(true);
            }
    
            navigate("/Login");
        } catch (error) {
            console.error("Error during registration:", error);
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
                
                                    <form onSubmit={handleSubmit} className="mb-5 col-sm-8 offset-sm-2 col-md-4 offset-md-4 card registerform">
                                        <h2 className="text-center pt-3 pb-4">Register</h2>
                                            <div className="form-group mb-4">
                                                <input type="text" name="displayName" errormessage="Username should be 3-10 characters" placeholder="Username" className="form-control fa/FaRegUser" pattern="^[A-Za-z0-9]{3,16}$" required/>
                                                <div className="icon-container">
                                                    <FaRegUser />
                                                </div>
                                            </div>
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
                                            <div className="form-group mb-3">
                                                <input type="file" id="file" name="file" errormessage="Please upload an image" className="form-control d-none"/>
                                                <label htmlFor='file' className='avatarlabel'>
                                                    <div className="icon-container left-icon">
                                                        <FaFileImage/>
                                                    </div>
                                                    <span className='avatar'>Add a avatar</span>
                                                </label>
                                            </div>
                                            <div className="form-group mt-2 pb-2">
                                                <button type="submit" className="btn btn-block CreateAccount">Signup</button>
                                            </div>
                                            {error && <span>Something went wrong</span>}
                                            <div className="text-center pt-1 pb-2">
                                                <p className="Already">
                                                    Already have an account?
                                                    <NavLink to={"/Login"} className="LoginBtn">
                                                        Login
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

export default Register;