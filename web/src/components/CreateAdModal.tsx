import { useEffect, useState, FormEvent } from "react";
import { Check, GameController } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import axios from "axios";

import { Input } from "./Form/Input";
import { InputSelect } from "./Form/Select";
import { ToggleGroup } from "./Form/ToggleGroup";

import { getDaysOfWeek } from "../utils/DaysOfWeek";

interface Game {
    id: string;
    bannerUrl: string;
    title: string;
    _count: {
        ads: number;
    };
}

export function CreateAdModal() {
    const daysOfWeek = getDaysOfWeek();

    // TODO get this from context
    const [games, setGames] = useState<Game[]>([]);
    const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([]);
    const [selectedGame, setSelectedGame] = useState<string>();
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);

    useEffect(() => {
        async function loadGames() {
            axios("http://localhost:3333/games").then((response) =>
                setGames(response.data)
            );
        }

        loadGames();
    }, []);

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        // TODO Add validations
        if (!selectedGame && !data.name) {
            return;
        }

        try {
            await axios.post(
                `http://localhost:3333/games/${selectedGame}/ads`,
                {
                    name: data.name,
                    yearsPlaying: Number(data.yearsPlaying),
                    discord: data.discord,
                    weekDays: selectedWeekDays.map(Number),
                    hourStart: data.hourStart,
                    hourEnd: data.hourEnd,
                    useVoiceChannel: useVoiceChannel,
                }
            );

            alert("Anúcio criado com sucesso");
        } catch (error) {
            console.log(error);
            alert("Erro ao criar Anúcio");
        }
    }

    function handleCheckUseVoiceChannel(checked: Boolean | "indeterminate") {
        if (checked === true) {
            setUseVoiceChannel(true);
        } else {
            setUseVoiceChannel(false);
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                <Dialog.Title className="text-3 font-black">
                    Publique um anúncio
                </Dialog.Title>

                <form
                    onSubmit={handleCreateAd}
                    className="mt-8 flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold" htmlFor="game">
                            Qual o game?
                        </label>

                        <InputSelect
                            games={games}
                            onSelectOption={setSelectedGame}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Seu nome (ou nickname)?</label>
                        <Input
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Como te chamam dentro do game?"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="yearsPlaying">
                                Joga há quanto tempo?
                            </label>
                            <Input
                                name="yearsPlaying"
                                id="yearsPlaying"
                                type="number"
                                placeholder="Tudo bem ser ZERO"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord">Qual o seu discord?</label>
                            <Input
                                name="discord"
                                id="discord"
                                type="text"
                                placeholder="Usuário#0000"
                            />
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="weekDays">
                                Quando costuma jogar?
                            </label>

                            <ToggleGroup
                                toggles={daysOfWeek}
                                values={selectedWeekDays}
                                onValueChange={setSelectedWeekDays}
                            />
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="hourStart">
                                Qual o horário do dia?
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <Input
                                    name="hourStart"
                                    id="hourStart"
                                    type="time"
                                    placeholder="De"
                                />
                                <Input
                                    name="hourEnd"
                                    id="hourEnd"
                                    type="time"
                                    placeholder="Até"
                                />
                            </div>
                        </div>
                    </div>

                    <label className="mt-2 flex gap-2 text-sm items-center">
                        <Checkbox.Root
                            checked={useVoiceChannel}
                            className="w-6 h-6 p-1 rounded bg-zinc-900"
                            onCheckedChange={handleCheckUseVoiceChannel}
                        >
                            <Checkbox.Indicator>
                                <Check className="w-4 h-4 text-emerald-400" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>

                    <footer className="mt-4 flex justify-end gap-4">
                        <Dialog.Close
                            type="button"
                            className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                        >
                            Cancelar
                        </Dialog.Close>

                        <button
                            className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                            type="submit"
                        >
                            <GameController size={24} />
                            Encontrar
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    );
}
