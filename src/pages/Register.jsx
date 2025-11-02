import React, {  useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaEye} from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../provider/AuthProvider';

const Register = () => {
    const { createUser, signInWithGoogle, setUser, updateUser } = useContext(AuthContext);
    const [show, setShow] =useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleRegister = e => {
        e.preventDefault()
        setError('')
        const displayName = e.target.name.value
        const photoURL = e.target.photo.value
        const email = e.target.email.value
        const password = e.target.password.value

        if (!displayName.trim()) {
            return setError('Please enter your name.');
        }
        if (!email) {
            return setError('Please enter your email address.');
        } 

        if (!password) {
            return setError('Please enter your password.');
        }
        if (password.length < 6) {
            return setError("Password must be at least 6 characters long");
        } 
        if (!/[A-Z]/.test(password)) {
            return setError("Password must include at least one uppercase letter");
        } 
        if (!/[a-z]/.test(password)) {
            return setError("Password must include at least one lowercase letter");
        }

        createUser( email, password)
            .then(result => {
            const user = result.user

            updateUser({displayName, photoURL})
                .then(()=> {
                    setUser({...user ,displayName, photoURL});
                    toast.success("Account created successfully!")
                    navigate('/')
                })
                .catch(error => {
                    toast.error(error.message)
                    setUser(user)
                })
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setError('This email is already registered!');
                } 
                else if (error.code === 'auth/weak-password') {
                    setError('Password should be at least 6 characters.');
                } 
                else {
                    setError('Something went wrong. Please try again later.');
                }
            });
    }

    const handleGoogleRegister = () => {
        signInWithGoogle()
            .then(result => {
                setUser(result.user)
                toast.success('Signed up with Google successfully!');
                navigate(location.state || '/')
            })
            .catch(error => {
                toast.error(error.message)
            })
    }

    return (
        <div className="flex justify-center items-center min-h-screen pt-12 pb-16 bg-gray-100">
            <div className="w-[88%] md:w-[40%] pb-3 rounded-[0.7rem] bg-white overflow-hidden shadow">
                <h2 className="font-semibold text-2xl text-center mb-4">
                   Register Your <span className="text-green-400">GreenNest</span>
              </h2>

                <div className="card-body">
                    <form onSubmit={ handleRegister }>
                        <fieldset className="fieldset">
                            <label className="label">Your Name</label>
                            <input name='name' type="text" className="input w-full" placeholder="Name" />

                            <label className="label">Photo URL</label>
                            <input name='photo' type="text" className="input w-full" placeholder="Photo " />

                            <label className="label">Email address</label>
                            <input  name="email"  type="email" className="input w-full" placeholder="Email"  />

                            <div className="relative">
                                <label className="label mb-[0.38rem] mt-2">Password</label>
                                <input name="password" type={ show ? "text" : "password" } className="input w-full" placeholder="password" />
                                <span onClick={()=> setShow(!show) } className="absolute text-[1rem] right-4 top-[2.77rem] cursor-pointer z-50 " > { show ? <FaEye/> : <IoEyeOff/> }  </span>
                            </div>

                            { error && <p className='text-red-500 text-[0.8rem]'> {error} </p> }
                         
                          <button type="submit" className="btn btn-neutral mt-4 w-full">
                            Register
                          </button>
                        </fieldset>
                    </form>

                    <p className="text-gray-500 text-center"> Already have an account?  <Link to="/auth/login" className="text-green-700  font-medium hover:link " >  Login </Link>{" "} </p>

                    <div className="flex items-center gap-3 ">
                        <hr className="flex-1 border-gray-200" />
                        <span className="text-gray-400 text-sm">or</span>
                        <hr className="flex-1 border-gray-200" />
                    </div>

                    <button onClick={handleGoogleRegister} className="btn w-full hover:bg-green-50 bg-white text-black rounded-md border border-[#e5e5e5] flex items-center justify-center gap-2"> <FcGoogle size={18}/>Register with Google</button>

                </div>
            </div>
        </div>
    );
};

export default Register;