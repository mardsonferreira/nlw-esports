import * as ToggleGroupRadix from "@radix-ui/react-toggle-group";

interface ToggleData {
    value: string;
    title: string;
    label: string;
}

interface ToggleProps {
    toggles: ToggleData[];
    values: string[];
    onValueChange: (value: string[]) => void;
}

export function ToggleGroup({ toggles, values, onValueChange }: ToggleProps) {
    return (
        <ToggleGroupRadix.Root
            className="grid grid-cols-4 gap-2"
            type="multiple"
            value={values}
            onValueChange={onValueChange}
        >
            {toggles.map((toggle) => (
                <ToggleGroupRadix.Item
                    key={toggle.value}
                    value={toggle.value}
                    title={toggle.title}
                    className={`w-8 h-8 rounded ${
                        values.includes(toggle.value) ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                >
                    {toggle.label}
                </ToggleGroupRadix.Item>
            ))}
        </ToggleGroupRadix.Root>
    );
}
