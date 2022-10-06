import { useKeenSlider } from "keen-slider/react";

import { GameBanner } from "./GameBanner";

interface Game {
    id: string;
    bannerUrl: string;
    title: string;
    _count: {
        ads: number;
    };
}

interface SliderProps {
    items: Game[];
}

export function Slider({ items }: SliderProps) {
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        slides: {
            perView: 6,
            spacing: 10,
        },
    });

    return (
        <div ref={sliderRef} className="keen-slider mt-16">
            {items.map((item) => (
                <div key={item.id} className="keen-slider__slide">
                    <GameBanner
                        key={item.id}
                        bannerUrl={item.bannerUrl}
                        title={item.title}
                        adsCount={item._count.ads}
                    />
                </div>
            ))}
        </div>
    );
}
