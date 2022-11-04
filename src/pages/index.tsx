import { FormEvent, useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { api } from "../lib/api";

import appImage from "../assets/app-nlw-copa-preview.png";
import logoImage from "../assets/logo.svg";
import usersImage from "../assets/users-avatar.png";
import checkIcon from "../assets/icon-check.svg";

interface HomeProps {
  poolCount: number;
  userCount: number;
  guessCount: number;
}

export default function Home({ poolCount, userCount, guessCount }: HomeProps) {
  const [title, setTitle] = useState("");

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("pools", { title });
      const { code } = response.data;

      navigator.clipboard.writeText(code);
      toast.success(`Bolão criado com sucesso! Código: ${code}`);
      setTitle("");
    } catch {
      toast.error(`Erro ao criar o bolão! Tente novamente.`);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-2 gap-28 max-w-[1124px] mx-auto h-screen items-center justify-between">
        <div className="flex flex-col gap-10">
          <Image src={logoImage} alt="NLW Copa" />

          <h1 className="mt-5 text-white text-5xl font-bold">
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>

          <div className="flex items-center gap-2">
            <Image
              src={usersImage}
              alt="Quatro fotos de perfil de usuários da aplicação"
            />
            <strong className="text-gray-200 font-bold text-xl">
              <span className="text-green-500 mr-1">+{userCount}</span>
              pessoas já estão usando
            </strong>
          </div>

          <form onSubmit={createPool} className="flex gap-2">
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Qual nome do seu bolão?"
              className="px-6 py-4 text-gray-200 text-sm bg-gray-700 border border-gray-600 rounded flex-1"
              required
            />
            <button
              type="submit"
              className="bg-yellow-500 px-6 py-4 text-sm rounded font-bold uppercase"
            >
              Criar meu bolão
            </button>
          </form>

          <p className="text-gray-300 text-sm leading-relaxed">
            Após criar seu bolão, você receberá um código único que poderá usar
            para convidar outras pessoas 🚀
          </p>

          <div className="border-t border-gray-600 pt-10 flex justify-between text-gray-100 ">
            <div className="flex items-center gap-2">
              <Image src={checkIcon} alt="" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold">+{poolCount}</span>
                <span>Bolões criados</span>
              </div>
            </div>

            <div className="w-px h-16 bg-gray-600" />

            <div className="flex items-center gap-2">
              <Image src={checkIcon} alt="" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold">+{guessCount}</span>
                <span>Palpites enviados</span>
              </div>
            </div>
          </div>
        </div>
        <Image
          src={appImage}
          alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
          quality={100}
        />
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const [poolCountResponse, userCountResponse, guessCountResponse] =
    await Promise.all([
      api.get("pools/count"),
      api.get("users/count"),
      api.get("guesses/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      userCount: userCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
    },
  };
};
