import { ArrowLeft, Code, Eye, EyeOff, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginSchema from "../schemas/loginSchema";
import userService from "../services/User";
import { ZodError } from "zod";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";

const Login = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, seterrors] = useState({});
  const [loading, setloading] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleChange(e) {
    const { name, value } = e.target;

    setformData((prev) => ({ ...prev, [name]: value }));

    try {
      loginSchema.pick({ [name]: true }).parse({ [name]: value });
      seterrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof ZodError) {
        const origin = JSON.parse(error.message);
        const fieldErrors =
          Array.isArray(origin) &&
          origin.reduce((acc, err) => {
            acc[err.path[0]] = err.message;
            return acc;
          }, {});
        seterrors(fieldErrors);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setloading(true);
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      setloading(false);
      const origin = JSON.parse(result.error);

      const fieldErrors = origin.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
      seterrors(fieldErrors);
    } else {
      setloading(true);
      try {
        await userService.loginAccount(formData);
        setloading(false);
        toast.success("Login Successfull");
        dispatch(setLoggedin(true));
        navigate("/problems");
      } catch (error) {
        setloading(false);
        toast.error(error?.response?.data?.message);
      }
    }
  }

  async function handleGoogleLogin() {
    try {
      await userService.signInWithGoogle();
      dispatch(setLoggedin(true));
      navigate("/problems")
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "Error in google login"
      );
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="flex items-center absolute right-8 top-4 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="flex items-center justify-center space-x-2 mb-6 pt-5">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold">AlgoLab</span>
          </div>

          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400">
            Sign in to continue your coding journey
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
              
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-4 bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Login
              {loading && <div className="loader"></div>}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button onClick={handleGoogleLogin} className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                Create one here
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Need help?{" "}
            <a
              href="#"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
