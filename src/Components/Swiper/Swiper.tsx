import { EffectFade } from 'swiper';
import { createContext, useState } from 'react';
import { Swiper as SwiperType } from 'swiper/types';
import { SwiperProps, Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, { Mousewheel, Keyboard, Pagination, Scrollbar, Autoplay, Navigation } from 'swiper';

//? ------------------- Load styles --------------------------------------
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/effect-fade/effect-fade';
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module

//? ------------------- Load modules -------------------------------------
SwiperCore.use([Mousewheel, Keyboard, Scrollbar, Pagination, Autoplay, Navigation]);

//? ------------------- Utils --------------------------------------------

export const SwiperContext = createContext<{ swiper?: SwiperType; setSwiper?: any }>({});

export { Swiper, SwiperSlide, EffectFade };

export const useSwiper = () => {
	const [swiper, setSwiper] = useState<SwiperType>();
	const [index, setIndex] = useState({ cur: -1, pre: -1 });

	const registerSwiper: SwiperProps = {
		keyboard: true,
		onInit: sw => setSwiper(sw),
		mousewheel: { thresholdDelta: 5, forceToAxis: true },
		onSwiper: sw => setIndex({ cur: sw.activeIndex, pre: sw?.previousIndex }),
		onSlideChange: sw => setIndex({ cur: sw.activeIndex, pre: sw?.previousIndex }),
	};

	return { index, swiper, registerSwiper };
};
