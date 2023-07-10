import Layout from "@/layout/layout";
import Head from "next/head";
import Link from "next/link";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import styles from "@/layout/Form.module.css";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { validate_register } from "@/lib/validate";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

type Props = {
  email: string;
  password: string;
  username: string;
};

function Register() {
  const [show, setShow] = useState({ password: false, confirmPassword: false });
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: validate_register,
    onSubmit,
  });

  async function onSubmit(values: Props) {
    await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    }).then((res) => {
      if (res.status === 422) {
        alert("User Already Exists... Try with different email!");
      } else {
        const cookies = Object.keys(Cookies.get());
        cookies.forEach((cookie) => {
          Cookies.remove(cookie);
        });
        router.push("/login");
      }
    });
  }

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>

      <section className="flex flex-col w-3/4">
        <div className="flex flex-col items-center">
          <h1 className="text-black text-3xl font-bold my-3">Register</h1>
          <p className="text-center">
            Please fill out the form below to create your account!
          </p>
        </div>
        <form className="p-2 w-full flex" onSubmit={formik.handleSubmit}>
          <div className="w-full flex flex-col gap-2">
            <div
              className={`${
                formik.errors.username && formik.touched.username
                  ? "border-red-600 border-2 rounded-md"
                  : ""
              } `}
            >
              <input
                className={styles.inputField}
                type="text"
                placeholder="Username..."
                {...formik.getFieldProps("username")}
                name="username"
              />
            </div>

            <div
              className={`${
                formik.errors.email && formik.touched.email
                  ? "border-red-600 border-2 rounded-md"
                  : ""
              } `}
            >
              <input
                className={styles.inputField}
                type="email"
                placeholder="Email..."
                {...formik.getFieldProps("email")}
                name="email"
              />
            </div>

            <div
              className={`${"flex px-1 rounded-md"} ${
                formik.errors.password && formik.touched.password
                  ? "border-red-600 border-2 rounded-md"
                  : ""
              } `}
            >
              <input
                className={styles.inputField}
                type={`${show.password ? "text" : "password"}`}
                placeholder="Password..."
                {...formik.getFieldProps("password")}
                name="password"
              />
              <span
                className="flex items-center"
                onClick={() => setShow({ ...show, password: !show.password })}
              >
                {show.password ? (
                  <AiFillEye size={20} />
                ) : (
                  <AiFillEyeInvisible size={20} />
                )}
              </span>
            </div>

            {formik.errors.password && formik.touched.password ? (
              <span className="text-sm text-[0.8rem]">
                {formik.errors.password}
              </span>
            ) : (
              <></>
            )}
            <div
              className={`${"flex px-1 rounded-md"} ${
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? "border-red-600 border-2 rounded-md"
                  : ""
              } `}
            >
              <input
                className={styles.inputField}
                type={`${show.confirmPassword ? "text" : "password"}`}
                placeholder="Confirm password..."
                {...formik.getFieldProps("confirmPassword")}
                name="confirmPassword"
              />
              <span
                className="flex items-center"
                onClick={() =>
                  setShow({ ...show, confirmPassword: !show.confirmPassword })
                }
              >
                {show.confirmPassword ? (
                  <AiFillEye size={20} />
                ) : (
                  <AiFillEyeInvisible size={20} />
                )}
              </span>
            </div>

            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <span className="text-sm text-[0.8rem]">
                {formik.errors.confirmPassword}
              </span>
            ) : (
              <></>
            )}
            <div>
              <button
                type="submit"
                className=" border-gray-400 border bg-[#1410f0c5] w-full p-2 rounded-md text-[#eee] hover:bg-[#eee] hover:text-gray-700  transition-all ease-in-out"
              >
                Register
              </button>
            </div>
          </div>
        </form>
        <div className="w-full text-center sm:flex justify-center">
          have an acoount?
          <Link href={"/login"}>
            <p className="text-blue-700">Login</p>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export default Register;
