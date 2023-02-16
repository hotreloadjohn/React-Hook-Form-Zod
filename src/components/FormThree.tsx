import React from "react";
import { z } from "zod";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// https://reactkit.radzion.com/dynamic-form

const expSchema = z.object({
  position: z.string().min(1, "Position is required").max(100),
  responsibility: z.string().min(1, "Responsibility is required").max(100),
});
const FormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  bio: z.string(),
  exp: z.array(expSchema).min(1, "At least 1 work experience is required"),
  // exp: z.array(expSchema).refine((val) => {
  //     console.log("Refine: ", val.length < 0)
  //     return val.length > 0
  // })
});

type FormSchemaType = z.infer<typeof FormSchema>;

const FormThree = () => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      exp: [{ position: "", responsibility: "" }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "exp",
    control,
  });
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    await new Promise(async (resolve) => {
      await setTimeout(() => {
        console.log(data);
        resolve(undefined);
        reset();
      }, 3000);
    });
  };

  console.log(errors);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-xl w-full mx-auto px-4 py-32">
        <form
          className="bg-white rounded-lg px-8 py-12 shadow-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-orange-600 text-xl font-semibold mb-8">
            Job Application
          </h1>
          <label className="block">
            <span className="block mb-1 text-gray-600 font-bold">
              Your name
            </span>
            <input
              className="w-full rounded-lg outline focus:outline-2 py-3 px-2"
              type="text"
              {...register("name")}
            />
            {"name" in errors && (
              <span className="text-red-400">{errors.name?.message}</span>
            )}
          </label>
          <div className="form-control w-full flex flex-col mt-2">
            <label htmlFor="bio" className="label">
              <span className="label-text font-bold">Bio</span>
            </label>

            <textarea
              className="outline p-2"
              rows={3}
              placeholder="I'm a Software Engineer..."
              {...register("bio")}
            />
          </div>

          <div className="form-control w-full flex flex-col mt-2">
            <label htmlFor="exp" className="label">
              <span className="label-text font-bold">Experiences</span>
            </label>

            {fields.map((field, index) => {
              return (
                <section key={field.id} className="flex flex-col w-full">
                  <label>
                    <span>Position</span>
                    <input
                      className="w-full rounded-lg outline focus:outline-2 py-3 px-2"
                      type="text"
                      {...register(`exp.${index}.position`)}
                    />
                  </label>
                  {errors.exp && (
                    <p className="text-red-400">
                      {errors.exp[index]?.position?.message}
                    </p>
                  )}
                  <div className="flex flex-col">
                    <label htmlFor="responsility" className="label">
                      <span className="label-text">Reponsibility</span>
                    </label>

                    <textarea
                      className="outline p-2"
                      rows={3}
                      placeholder="I was responsoble for..."
                      {...register(`exp.${index}.responsibility`)}
                    />
                  </div>
                  {errors.exp && (
                    <p className="text-red-400">
                      {errors.exp[index]?.responsibility?.message}
                    </p>
                  )}
                  {/* <p>{errors.exp?.[${index}]?.position?.message}</p> */}
                  {/* <span>{errors.exp?[index]?.responsibility?.message}</span> */}
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-lg mt-2"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                </section>
              );
            })}

            <button
              className="bg-green-400 text-black px-2 py-1 rounded-lg mt-2"
              type="button"
              onClick={() => {
                append({
                  position: "",
                  responsibility: "",
                });
              }}
            >
              + New Experience
            </button>

            {errors.exp && (
              <p className="text-red-400">{errors.exp?.message}</p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            className={`mt-12 w-full ${
              isSubmitting ? "bg-gray-300" : "bg-orange-600"
            } rounded-lg px-6 py-3 text-white font-medium`}
          >
            Submit
          </button>
        </form>

        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </div>
    </div>
  );
};

export default FormThree;
