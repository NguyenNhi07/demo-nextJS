"use client";
import { useFormik } from "formik";
import { useState } from "react";
import customAxios from "../config/axios";
import * as Yup from "yup";
import envelope from "../img/envelope.png";
import lock from "../img/lock.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

function SignUp() {
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const handelClick: () => void = () => {
    router.push("/login");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("This field can not be empty"),
      email: Yup.string()
        .email("Invalid email address")
        .required("This field can not be empty"),
      password: Yup.string()
        .required("This field can not be empty")
        .min(8, "Password length must be between 8-16 characters.")
        .max(16, "Password length must be between 8-16 characters.")
        .test(
          "atLeastOneCapitalized",
          "Password must include at least one capitalized character.",
          (value: any) => {
            if (/[A-Z]/.test(value)) {
              return true;
            }
            return false;
          }
        )
        .test(
          "atLeastOneNumber",
          "Password must include at least one number.",
          (value: any) => {
            if (/[0-9]/.test(value)) {
              return true;
            }
            return false;
          }
        ),
      passwordConfirm: Yup.string()
        .oneOf(
          [Yup.ref("password"), undefined],
          "Confirmation password does not match"
        )
        .required("This field can not be empty"),
    }),
    onSubmit: async (values) => {
      try {
        await customAxios.post("/auth/sign-up", {
          username: values.name,
          email: values.email,
          password: values.password,
          passwordConfirm: values.passwordConfirm,
        });
        setIsSuccess(true);
      } catch (error) {
        console.error("Sign-up failed:", error);
      }
    },
  });

  return (
    <>
      <div className="w-full h-full flex justify-center absolute">
        <div className="w-[480px] h-[650px] shadow-[0_0_25px_rgba(0,0,0,0.25)] flex m-auto justify-center items-center p-10 rounded-2xl relative">
          <div className="flex flex-col gap-6">
            <div className="w-[339px] h-auto font-bold text-2xl text-center text-black">
              <h3 className="title">Sign Up</h3>
            </div>
            <form onSubmit={formik.handleSubmit} className="flex flex-col">
              <div className="flex-col flex gap-4">
                <div className="flex relative flex-col gap-2">
                  <label htmlFor="name">Name</label>
                  <input
                    className={`ps-[10px] w-[339px] h-12 py-3 pr-3 pl-4 rounded-xl border-[1px] border-solid border-black focus:outline-none ${
                      formik.touched.name && formik.errors.name
                        ? "border-[1px] border-solid border-red-600"
                        : ""
                    }`}
                    type="text"
                    placeholder="Name"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="errorEmail">
                      <p className="w-max text-sm text-red-600 font-normal">
                        {formik.errors.name}
                      </p>
                    </div>
                  ) : null}
                </div>
                <div className="relative flex flex-col gap-2">
                  <label htmlFor="email">
                    Email<span className="text-red-600">*</span>
                  </label>
                  <input
                    className={`w-[339px] h-12 py-z3 pr-3 pl-4 rounded-xl border-[1px] border-solid border-black ps-9 outline-none ${
                      formik.touched.email && formik.errors.email
                        ? "border-[1px] border-solid border-red-600"
                        : ""
                    }`}
                    type="text"
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                  />
                  <Image
                    className="w-[18px] h-[18px] absolute left-[10px] top-[46px]"
                    src={envelope}
                    alt=""
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div>
                      <p className="w-max text-sm text-red-600 font-normal">
                        {formik.errors.email}
                      </p>
                    </div>
                  ) : null}
                </div>
                <div className="relative flex flex-col gap-2">
                  <label htmlFor="password">
                    Password<span className="text-red-600">*</span>
                  </label>
                  <input
                    className={`flex justify-between w-[339px] h-12 py-3 pr-3 pl-4 rounded-xl border-[1px] border-solid border-black ps-9 focus:outline-none ${
                      formik.touched.password && formik.errors.password
                        ? "border-[1px] border-solid border-red-600"
                        : ""
                    }`}
                    type="password"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                  />
                  <Image
                    className="w-[18px] h-[18px] absolute left-[10px] top-[46px]"
                    src={lock}
                    alt=""
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="errorPass">
                      <p className="w-max text-sm text-red-600 font-normal">
                        {formik.errors.password}
                      </p>
                    </div>
                  ) : null}
                </div>
                <div className="relative flex flex-col gap-2">
                  <label htmlFor="passwordConfirm">
                    Password Confirmation<span className="text-red-600">*</span>
                  </label>
                  <input
                    className={`flex justify-between w-[339px] h-12 py-3 pr-3 pl-4 rounded-xl border-[1px] border-solid border-black ps-9 focus:outline-none ${
                      formik.touched.passwordConfirm &&
                      formik.errors.passwordConfirm
                        ? "border-[1px] border-solid border-red-600"
                        : ""
                    }`}
                    id="passwordConfirm"
                    type="password"
                    placeholder="Password Confirmation"
                    {...formik.getFieldProps("passwordConfirm")}
                  />
                  <Image
                    className="w-[18px] h-[18px] absolute left-[10px] top-[46px]"
                    src={lock}
                    alt=""
                  />
                  {formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm ? (
                    <div className="errorPass">
                      <p className="w-max text-sm text-red-600 font-normal">
                        {formik.errors.passwordConfirm}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="w-[339px] flex flex-col relative top-[26px]">
                <div>
                  <input
                    type="submit"
                    className="w-[339px] h-12 py-0 px-5 my-[5px] mx-0 rounded-xl bg-[rgba(1,86,252,1)] text-white font-bold text-base border-none"
                    value="Sign Up"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isSuccess && (
        <>
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.2)]"></div>
          <div className="w-full h-full flex justify-center">
            <div className="flex z-50 relative bg-white rounded-2xl p-10 gap-8 justify-center top-[290px] w-[480px]">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-center">
                  Sign Up Successfully Completed.
                </h1>
                <button
                  onClick={handelClick}
                  className="w-[420px] h-12 py-0 px-5 gap-[5px] rounded-xl bg-[rgba(1,86,252,1)] text-white border-none text-base"
                >
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SignUp;
