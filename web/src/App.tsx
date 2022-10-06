import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import ReactLoading from "react-loading";

import "keen-slider/keen-slider.min.css";
import "./styles/main.css";

import logoImg from "./assets/logo-nlw-esports.svg";

import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import { Slider } from "./components/Slider";

interface Game {
    id: string;
    bannerUrl: string;
    title: string;
    _count: {
        ads: number;
    };
}

function App() {
    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadGames() {
            axios("http://localhost:3333/games")
                .then((response) => setGames(response.data))
                .finally(() => {
                    setIsLoading(false);
                });
        }

        loadGames();
    }, []);

    return (
        <>
            <div className="max-w-[1366px] mx-auto flex flex-col items-center my-10">
                <img src={logoImg} alt="" />

                <h1 className="text-6xl text-white font-black mt-20">
                    Seu{" "}
                    <span className="text-transparent bg-nlw-gradient bg-clip-text">
                        duo
                    </span>{" "}
                    está aqui.
                </h1>

                {isLoading ? (
                    <div>
                        <ReactLoading type={"bars"} color={"#8B5CF6"} />
                    </div>
                ) : (
                    <Slider items={games} />
                )}

                <Dialog.Root>
                    <CreateAdBanner />

                    <CreateAdModal />
                </Dialog.Root>
            </div>
        </>
    );
}

export default App;
