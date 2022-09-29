import * as Select from "@radix-ui/react-select";
import { CaretDown, CaretUp, Check } from "phosphor-react";

interface Game {
    id: string;
    title: string;
}

interface InputSelectProps {
    games: Game[];
}

export function InputSelect({ games }: InputSelectProps) {
    return (
        <Select.Root>
            <Select.Trigger
                className="bg-zinc-900 px-3 py-3 rounded flex items-center justify-between"
                aria-label="Games"
            >
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <CaretDown height={20} width={20} />
            </Select.Trigger>

            <Select.Portal>
                <Select.Content className="bg-white rounded overflow-hidden">
                    <Select.ScrollUpButton>
                        <CaretUp />
                    </Select.ScrollUpButton>

                    <Select.Viewport className="bg-zinc-600 p-1">
                        <Select.Group className="bg-zinc-900">
                            <Select.Label className="h-8 flex items-center border-b text-zinc-500 border-zinc-100/20">
                                Selecione o game que deseja jogar
                            </Select.Label>

                            {games.map((game) => {
                                return (
                                    <Select.Item
                                        className="text-md text-zinc-300 flex items-center relative h-8 px-1 hover:bg-red-400"
                                        key={game.id}
                                        value={game.title}>
                                        <Select.ItemText className="">
                                            {game.title}
                                        </Select.ItemText>
                                        
                                        <Select.ItemIndicator className="absolute right-1 w-4 inline-flex items-center justify-center">
                                            <Check />
                                        </Select.ItemIndicator>

                                    </Select.Item>
                                );
                            })}
                        </Select.Group>
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}
