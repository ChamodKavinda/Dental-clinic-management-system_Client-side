import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const Signup = () => {
    return(
        <div className="form_container">
            <h2>Signup Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={handleOnChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Enter your username"
                        onChange={handleOnChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={handleOnChange}
                    />
                </div>
                <button type="submit">Submit</button>
                <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup