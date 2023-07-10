import Layout from "@/layout/layout";
import Head from "next/head";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineGithub, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import styles from "@/layout/Form.module.css";
import { useState, useEffect } from "react";
import { getSession, signIn } from "next-auth/react";
import { useFormik } from "formik";
import validate_login from "@/lib/validate";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

type Props = {
  email: string;
  password: string;
  rememberMe: boolean;
};
async function HandleGoogle() {
  signIn("google", { callbackUrl: "http://localhost:3000" });
}
async function HandleGithub() {
  signIn("github", { callbackUrl: "http://localhost:3000" });
}

function Login() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedEmail = Cookies.get("email");
    const storedPassword = Cookies.get("password");
    const storedRememberMe = Cookies.get("rememberMe");
    if (storedEmail && storedPassword && storedRememberMe) {
      formik.setValues({
        email: storedEmail,
        password: storedPassword,
        rememberMe: JSON.parse(storedRememberMe),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: validate_login,
    onSubmit,
  });

  async function onSubmit(values: Props) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      remember: values.rememberMe ? "true" : "",
      callbackUrl: "/",
    });

    if (status?.ok) router.push(status?.url!);
    if (status?.ok === false) {
      const verify = confirm(
        "Email or Password not match Please register your account..."
      );
      if (verify) {
        router.push("/register");
      }
    }
  }

  useEffect(() => {
    Cookies.set("email", formik.values.email);
    Cookies.set("password", formik.values.password);
    Cookies.set("rememberMe", formik.values.rememberMe ? "true" : "");
  }, [formik.values.email, formik.values.password, formik.values.rememberMe]);
  

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <section className="flex flex-col w-3/4 ">
        <div className="flex flex-col items-center">
          <h1 className="text-black text-3xl font-bold my-4">Login</h1>
          <p className="text-center">
            Please enter your email and password below to access your account!
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="p-2 w-full flex">
          <div className="w-full flex flex-col gap-6">
            <div
              className={`${
                formik.errors.email && formik.touched.email
                  ? "border-red-600 border-2 rounded-md"
                  : ""
              }`}
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
              className={`${"flex"} ${
                formik.errors.password && formik.touched.password
                  ? "border-red-600 border-2 rounded-md"
                  : ""
              } `}
            >
              <input
                className={styles.inputField}
                type={`${show ? "text" : "password"}`}
                placeholder="Password..."
                {...formik.getFieldProps("password")}
                name="password"
              />
              <span
                className="flex items-center"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <AiFillEye size={20} />
                ) : (
                  <AiFillEyeInvisible size={20} />
                )}
              </span>
            </div>
            <div className="flex items-center">
              <input
                className="scale-[1.282]"
                type="checkbox"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
                name="rememberMe"
              />
              <label htmlFor="rememberMe" className="px-2">
                Remember Me
              </label>
            </div>
            <div>
              <button
                type="submit"
                className=" border-gray-400 border bg-[#1410f0c5] w-full p-2 rounded-md text-[#eee] hover:bg-[#eee] hover:text-gray-700  transition-all ease-in-out"
              >
                Login
              </button>
            </div>
          </div>
        </form>
        <div className="w-full text-center sm:flex justify-center my-2 ">
          don&apos;t have an acoount yet?
          <Link href={"/register"}>
            <p className="text-blue-700">Register</p>
          </Link>
        </div>
        <div className="mx-auto space-x-2">
          <button type="button">
            <FcGoogle onClick={HandleGoogle} size={30} />
          </button>
          <button type="button" onClick={HandleGithub}>
            <AiOutlineGithub size={30} />
          </button>
        </div>
      </section>
    </Layout>
  );
}

export default Login;

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
