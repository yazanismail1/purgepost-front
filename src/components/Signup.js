'use client';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '@/components/FirebaseConfig';
import React from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {useRouter} from 'next/navigation';

export default function Signup() {
    const router = useRouter();

    const handleSignUp = async (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;
        let confirmPassword = e.target.confirmPassword.value;
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                createdAt: new Date(),
                balance: 0,
                instagramToken: '',
            });

            alert('Account created successfully');
            router.push('/login');
            // window.location.href = '/login';
        } catch (err) {
            alert(err.message);
            console.log(err.message);
        }
    };


    return (
        <div className="max-w-4xl flex items-center mx-auto p-4">
            <div className="grid md:grid-cols-3 items-center shadow-lg rounded-xl overflow-hidden">
                <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-primary to-hover lg:px-8 px-4 py-4">
                    <div>
                        <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
                        <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Welcome to our registration page! Get started by creating your account.</p>
                    </div>
                    <div>
                        <h4 className="text-white text-lg font-semibold">Simple & Secure Registration</h4>
                        <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
                    </div>
                </div>

                <form className="md:col-span-2 w-full py-6 px-6 sm:px-16" onSubmit={e => handleSignUp(e)}>
                    <div className="mb-6">
                        <h3 className="text-gray-800 text-2xl font-bold">Create an account</h3>
                    </div>

                    <div className="space-y-6">

                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Email</label>
                            <div className="relative flex items-center">
                                <input name="email" type="email" required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-primary" placeholder="Enter email" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 682.667 682.667">
                                    <defs>
                                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                            <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                        </clipPath>
                                    </defs>
                                    <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                        <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                                        <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Password</label>
                            <div className="relative flex items-center">
                                <input name="password" type="password" required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-primary" placeholder="Enter password" />
                                <svg onClick={(e) => e?.target?.previousSibling?.type == 'password' && e.target.previousSibling.type ? e.target.previousSibling.type = 'text' : e.target.previousSibling.type = 'password'}
                                    xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                </svg>
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Confirm password</label>
                            <div className="relative flex items-center">
                                <input name="confirmPassword" type="password" required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-primary" placeholder="Enter password" />
                                <svg onClick={(e) => e?.target?.previousSibling?.type == 'password' && e.target.previousSibling.type ? e.target.previousSibling.type = 'text' : e.target.previousSibling.type = 'password'}
                                    xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                </svg>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input required id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-primary focus:ring-blue-500 border-gray-300 rounded" />
                            <label for="remember-me" className="ml-3 block text-sm text-gray-800">
                                I accept the <a href="/legal/terms" className="text-primary font-semibold hover:underline ml-1">Terms and Conditions</a>
                            </label>
                        </div>
                    </div>

                    <div className="!mt-12">
                        <button type="submit" className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-primary hover:bg-hover focus:outline-none">
                            Create an account
                        </button>
                    </div>
                    <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <a href="/login" className="text-primary font-semibold hover:underline ml-1">Login here</a></p>
                </form>
            </div>
        </div>
        // <section className="">
        //     <div className="flex flex-col items-center justify-center ">
        //         <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        //             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        //                 <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
        //                     Create an account
        //                 </h1>
        //                 <form className="space-y-4 md:space-y-6" onSubmit={e => handleSignUp(e)}>
        //                     <div>
        //                         <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
        //                         <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" placeholder="name@company.com" required/>
        //                     </div>
        //                     <div>
        //                         <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
        //                         <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" required/>
        //                     </div>
        //                     <div>
        //                         <label for="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
        //                         <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" required/>
        //                     </div>
        //                     <div className="flex items-start">
        //                         <div className="flex items-center h-5">
        //                             <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary" required/>
        //                         </div>
        //                         <div className="ml-3 text-sm">
        //                             <label for="terms" className="font-light text-gray-500">I accept the <a className="font-medium text-primary hover:underline " href="#">Terms and Conditions</a></label>
        //                         </div>
        //                     </div>
        //                     <button type="submit" className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
        //                     <p className="text-sm font-light text-gray-500">
        //                         Already have an account? <a href="#" className="font-medium text-primary hover:underline dark:text-primary">Login here</a>
        //                     </p>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </section>
    )
}
