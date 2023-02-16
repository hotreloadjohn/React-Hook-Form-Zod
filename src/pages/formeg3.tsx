import FormOne from "@/components/FormOne"
import FormThree from "@/components/FormThree"

function FormEgPage() {
    return (
        <div className="bg-gray-200 min-h-screen">
            <p>Trying to replicate this <span className="underline"><a href="https://reactkit.radzion.com/dynamic-form">Dynamic form</a></span> using Zod validation and Tailwind CSS</p>
            <FormThree />
        </div>
    )
}

export default FormEgPage