import { useState } from "react";
import { Link } from "react-router-dom";
import "./AuthenticationForm.css";
import { Input } from "../input/Input";
import { useAuth } from "../../context/useAuth";

export enum AuthenticationFormMode {
  SIGNIN = "signin",
  SIGNUP = "signup",
}

interface AuthenticationFormProps {
  mode: AuthenticationFormMode;
}

export const AuthenticationForm = ({ mode }: AuthenticationFormProps) => {
  const { registerUser, loginUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === AuthenticationFormMode.SIGNIN) {
      loginUser(formData.email, formData.password);
    } else {
      registerUser(formData.email, formData.password);
    }

    // Handle authentication logic here
    console.log(`${mode} attempt:`, formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>
          {mode === AuthenticationFormMode.SIGNIN ? "Sign In" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === AuthenticationFormMode.SIGNUP && (
            <Input
              id="name"
              label="Full Name"
              placeholder="Enter your full name"
              handleInputChange={handleInputChange}
              required={true}
              value={formData.name}
            />
          )}

          <Input
            id="email"
            label="Email"
            placeholder="Enter your email"
            handleInputChange={handleInputChange}
            type="email"
            required={true}
            value={formData.email}
          />

          <Input
            id="password"
            label="Password"
            placeholder="Enter your password"
            handleInputChange={handleInputChange}
            type="password"
            required={true}
            value={formData.password}
          />

          {mode === AuthenticationFormMode.SIGNUP && (
            <Input
              id="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              handleInputChange={handleInputChange}
              type="password"
              required={true}
              value={formData.confirmPassword}
            />
          )}

          <button type="submit" className="auth-button">
            {mode === AuthenticationFormMode.SIGNIN ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          {mode === AuthenticationFormMode.SIGNIN ? (
            <p>
              Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
          ) : (
            <p>
              Already have an account? <Link to="/signin">Sign in here</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
