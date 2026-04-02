import { createContext, useState } from 'react';
import { Swiper as SwiperType } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperProps } from 'swiper/react';
import { EffectFade, EffectCards, Mousewheel, Keyboard, Pagination, Scrollbar, Autoplay, Navigation, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const SwiperContext = createContext<{ swiper?: SwiperType; setSwiper?: any }>({});

export { Swiper, SwiperSlide, EffectFade, EffectCards, Autoplay, FreeMode, Pagination };

export const useSwiper = () => {
	const [swiper, setSwiper] = useState<SwiperType>();
	const [index, setIndex] = useState({ cur: -1, pre: -1 });

	const registerSwiper: SwiperProps = {
		keyboard: true,
		modules: [Mousewheel, Keyboard, Scrollbar, Pagination, Autoplay, Navigation, EffectFade, EffectCards, FreeMode],
		onInit: sw => setSwiper(sw),
		mousewheel: { thresholdDelta: 5, forceToAxis: true },
		onSwiper: sw => setIndex({ cur: sw.activeIndex, pre: sw?.previousIndex }),
		onSlideChange: sw => setIndex({ cur: sw.activeIndex, pre: sw?.previousIndex }),
	};

	return { index, swiper, registerSwiper };
};
