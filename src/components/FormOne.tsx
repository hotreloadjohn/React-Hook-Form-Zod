import React from 'react'
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// video link: https://www.youtube.com/watch?v=WmYqlp91jKQ

const NoEMailSchema = z.object({
    name: z.string(),
    sendToEMail: z.literal(false),
});

const EMailSchema = z.object({
    name: z.string(),
    sendToEMail: z.literal(true),
    email: z.string().email().min(1, "Email is required").max(100),
});

const FormSchema = z.discriminatedUnion("sendToEMail", [
    EMailSchema,
    NoEMailSchema,
]);

type FormSchemaType = z.infer<typeof FormSchema>;


const FormOne = () => {
    const { register, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
    });

    const sendToEMail = watch("sendToEMail");

    const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
        if (data.sendToEMail) {
            console.log(data);
        } else {
            console.log(data);
        }
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
                        Order Package
                    </h1>
                    <label className="block">
                        <span className="block mb-1 text-gray-600">Your name</span>
                        <input
                            className="w-full rounded-lg outline focus:outline-2 py-3 px-2"
                            type="text"
                            {...register("name")}
                        />
                        {"name" in errors && <span className='text-red-400'>{errors.name?.message}</span>}
                    </label>
                    <label className="block mt-6">
                        <input
                            type="checkbox"
                            className="text-orange-600 w-5 h-5 border-gray-300 focus:ring-0 focus:ring-offset-0"
                            {...register("sendToEMail")}
                        />
                        <span className="ml-2 text-gray-600">Send receipt to email?</span>
                    </label>
                    {sendToEMail && (
                        <label className="block mt-6">
                            <span className="block mb-1 text-gray-600">Email</span>
                            <input
                                className="w-full rounded-lg outline focus:outline-2 py-3 px-2"
                                type="text"
                                {...register("email", { shouldUnregister: true })}
                            />

                            {"email" in errors && <span className='text-red-400'>{errors.email?.message}</span>}
                            {/* { "email" in errors.email &&  errors.email && <span className='text-red-400'>{errors.email?.message}</span>} */}
                        </label>
                    )}

                    <pre>{JSON.stringify(watch(), null, 2)}</pre>

                    <button className="mt-12 w-full bg-orange-600 rounded-lg px-6 py-3 text-white font-medium">
                        Order Package
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FormOne