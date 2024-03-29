import Link from "next/link";
import { prisma } from "@/db"
import { redirect } from "next/navigation";

async function creatTodo( data: FormData){
    "use server"
    const title = data.get("title")?.valueOf()
    if(typeof title !== "string" || title.length ===0){
        throw new Error ("Invalid title")
    }

    console.log("hi")

    await prisma.todo.create({ data: { title, complete: false }})
    redirect("/")
}


export default function Page(){
    return <>
        <header className="flex justify-between items-center mb-4">
            <h1 className="text-2x1">New</h1>
        </header>
        <form action={creatTodo} className="flex gap-2 flex-col">
            <input type="text" 
            name="title"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
            />
            <div>
                <Link href=".." className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100">Cancel</Link>
                <button type="submit" className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100">
                    create
                </button>
            </div>
        </form>
    </>
}