import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

// video link: https://youtu.be/chYXh7TG9ZE

const textInputClassName =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

// https://stackoverflow.com/questions/75148276/email-validation-with-zod
const FormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("This is not a valid email.")
      .refine((e) => e !== "abcd@fg.com", "This email is already taken"),
    password: z
      .string()
      .min(8, "Password must be at least 8 character(s)")
      .max(24, "Password must be at less than 24 character(s)"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 character(s)")
      .max(24, "Password must be at less than 24 character(s)"),
    accountType: z.enum(["personal", "commercial"], {
      errorMap: (issue, ctx) => ({
        message: "You must select an Account Type.",
      }),
    }),
    remember: z.literal(false).optional(),
    accept: z.literal(true, {
      errorMap: () => ({ message: "You must accept Terms and Conditions." }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormSchemaType = z.infer<typeof FormSchema>;

const FormFour = () => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  console.log(errors);

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    await new Promise(async (resolve) => {
      await setTimeout(() => {
        console.log(data);
        resolve(undefined);
        reset();
      }, 3000);
    });
  };

  return (
    <div className="md:w-[500px] shadow-sm shadow-white bg-white w-[320px] mx-auto px-7 py-4 rounded-xl">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            type="text"
            id="email"
            className={textInputClassName}
            placeholder="test@test.com"
            {...register("email")}
          />
          {"email" in errors && (
            <span className="text-red-400">{errors.email?.message}</span>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className={textInputClassName}
            {...register("password")}
          />
          {"password" in errors && (
            <span className="text-red-400">{errors.password?.message}</span>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={textInputClassName}
            {...register("confirmPassword")}
          />
          {"confirmPassword" in errors && (
            <span className="text-red-400">
              {errors.confirmPassword?.message}
            </span>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="accountType"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Select an option
          </label>
          <select
            id="accountType"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("accountType")}
          >
            <option value="">Account Type</option>
            <option value="personal">Personal</option>
            <option value="commercial">Commercial</option>
          </select>
          {"accountType" in errors && (
            <span className="text-red-400">{errors.accountType?.message}</span>
          )}
        </div>
        <div className="flex justify-between mb-6">
          <div className="flex">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                {...register("remember")}
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>

          <div>
            <label
              htmlFor="toggle"
              className="inline-flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                value=""
                id="toggle"
                className="sr-only peer"
                {...register("accept")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Accept
              </span>
            </label>
          </div>
        </div>
        <div>
          {"accept" in errors && (
            <span className="text-red-400">{errors.accept?.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </div>
  );
};

export default FormFour;
