"use client";
import { LabelR } from "@/components/ui/labelR";
import { InputR } from "@/components/ui/inputR";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { register } from "@/lib/auth"; 
import { useRouter } from 'next/navigation'
import Error from "next/error";
import { buildSuccessUrl } from "@/utils/successRedirect";

export default function Signup() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Las contraseñas no coinciden");
      return;
    }
    try {
      await register(firstname, lastname, email, password);
      
      const successUrl = buildSuccessUrl('registration', {
        message: `¡Bienvenido, ${firstname}! Tu cuenta ha sido creada correctamente.`
      });
      router.push(successUrl);
    } catch (error : Error | any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const body = document.body;
    body.classList.add("signup-background");
    return () => {
      body.classList.remove("signup-background");
    };
  }, []);

  return (
    <div className="max-w-md w-full mx-auto rounded-none sm:rounded-2xl p-4 my-[10%] md:my-[5%] md:mt-28 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
      Crea tu Cuenta
      </h2>

      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <LabelR htmlFor="firstname">Nombre</LabelR>
            <InputR id="firstname" placeholder="Juan" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
          </LabelInputContainer>
          <LabelInputContainer>
            <LabelR htmlFor="lastname">Apellido</LabelR>
            <InputR id="lastname" placeholder="Lopez" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <LabelR htmlFor="email">Correo Electronico</LabelR>
          <InputR id="email" placeholder="ejemplo@ejem.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <LabelR htmlFor="password">Contraseña</LabelR>
          <InputR id="password" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <LabelR htmlFor="confirmPassword">Repite tu Contraseña</LabelR>
          <InputR id="confirmPassword" placeholder="••••••••" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </LabelInputContainer>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Regístrate &rarr;
          <BottomGradient />
        </button>
       <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
