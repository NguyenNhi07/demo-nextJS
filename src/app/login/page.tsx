"use client";
import { useFormik } from "formik";
import customAxios from "../config/axios";
import * as Yup from "yup";
import envelope from "../img/envelope.png";
import lock from "../img/lock.png";
import eyeSlash from "../img/eye-slash.png";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Login() {
  const [error, setError] = useState<string>("");
  const [eye, setEye] = useState<boolean>(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("This field can not be empty"),
      password: Yup.string().required("This field can not be empty"),
    }),

    onSubmit: async (values) => {
      try {
        if (typeof window !== "undefined") {
          const result = await customAxios.post("/auth/login", {
            email: values.email,
            password: values.password,
          });

          localStorage.setItem("token", result.data.data.accessToken);
        }
        router.push("/department");
      } catch (error: any) {
        setError(error.response.data.message);
      }
    },
  });
  return (
    <>
      <div className="w-full h-full flex justify-center absolute items-center">
        <div className="w-[420px] h-[480px] shadow-[0_0_25px_rgba(0,0,0,0.25)] flex m-auto justify-center items-center p-10 rounded-2xl relative">
          <div className="flex flex-col gap-6 ">
            <div className="w-full h-auto font-bold text-2xl text-center text-black">
              <h3 className="title">Login</h3>
            </div>
            <form onSubmit={formik.handleSubmit} className="flex flex-col">
              <div className="flex flex-col gap-4">
                <div className="relative flex flex-col gap-2">
                  <input
                    className={`w-[339px] h-12 px-3 pt-3 pb-4 rounded-xl border-[1px] border-solid border-black ps-9 focus:outline-none ${
                      formik.touched.email && formik.errors.email
                        ? "border-[1px] border-solid border-red-600"
                        : ""
                    }`}
                    type="text"
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                  />
                  <Image
                    className="imgEmail w-[18px] h-[18px] absolute top-[15px] left-[10px]"
                    src={envelope}
                    alt=""
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="errorPass">
                      <p className="w-max text-sm font-normal text-left text-red-600">
                        {formik.errors.email}
                      </p>
                    </div>
                  ) : null}
                </div>
                <div className="relative flex flex-col gap-2">
                  <input
                    className={`w-[339px] h-12 px-3 pt-3 pb-4 rounded-xl border-[1px] border-solid border-black ps-9 outline-none ${
                      formik.touched.password && formik.errors.password
                        ? "border-[1px] border-solid border-red-600"
                        : ""
                    }`}
                    type={eye ? "text" : "password"}
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                  />
                  <Image
                    className="w-[18px] h-[18px] absolute top-[15px] left-[10px]"
                    src={lock}
                    alt=""
                  />
                  <button
                    onClick={() => {
                      setEye(!eye);
                    }}
                  >
                    <Image
                      className="w-[18px] h-[18px] absolute top-[15px] right-[10px]"
                      src={eyeSlash}
                      alt=""
                    />
                  </button>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="errorPass">
                      <p className="w-max text-sm font-normal text-left text-red-600">
                        {formik.errors.password}
                      </p>
                    </div>
                  ) : null}
                  {error && (
                    <p className="w-max text-sm font-normal text-left text-red-600">
                      {error}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-[339px] flex flex-col">
                <div>
                  <input
                    type="submit"
                    className="w-[339px] h-12 px-5 py-0 mx-0 my-[5px] rounded-xl bg-[rgba(1,86,252,1)] text-white font-bold text-base border-none"
                    value="Login"
                  />
                </div>
                <div>
                  <button className="btnSign w-[339px] h-12 px-[20px] py-0 mx-0 my-[5px] rounded-xl bg-white font-normal">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
