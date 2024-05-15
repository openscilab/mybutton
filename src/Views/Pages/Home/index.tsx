import './index.scss';
import { Autoplay } from 'swiper';
import { Button, Col, Row } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import responsive from '@assets/Images/responsive.png';
import openSource from '@assets/Images/open-source.png';
import noAccount from '@assets/Images/no-account-needed.png';
import { Swiper, SwiperSlide, useSwiper, EffectCards } from '@components/Swiper/Swiper';
import useWindow from '@src/Tools/Hooks/useWindow';
import { ReactComponent as Right } from '@assets/icons/angle-right-solid.svg';
import { ReactComponent as Left } from '@assets/icons/angle-left-solid.svg';
import { classes } from '../../../Tools/Utils/React';

const Home = () => {
	const navigate = useNavigate();

	// -----------------------------------------------------------------
	return (
		<div className='home-layout'>
			<Row className='grid md:flex'>
				<Col xs={24} md={12} className='swiper-col'>
					<SwiperWrapper>
						<>
							<SwiperSlide>
								<h2>Open Source & Free</h2>
								<img src={openSource} alt='' />
							</SwiperSlide>
							<SwiperSlide>
								<h2>No Account Necessary</h2>
								<img src={noAccount} alt='' />
							</SwiperSlide>
							<SwiperSlide>
								<h2>Mobile & Responsive</h2>
								<img className='w-5/6 mx-auto' src={responsive} alt='' />
							</SwiperSlide>
						</>
					</SwiperWrapper>
				</Col>
				<Col xs={24} md={12} className='info-col'>
					<h1>My Button</h1>
					<Button className='get-share-buttons' onClick={() => navigate('/get')}>
						Get Share Buttons
					</Button>
				</Col>
			</Row>
		</div>
	);
};

const SwiperWrapper: FC = ({ children }) => {
	const { registerSwiper, swiper } = useSwiper();
	const { isDesktop, size } = useWindow();
	const numberOfSlides = size.width < 680 ? 1 : 2;

	return isDesktop ? (
		<Swiper
			{...registerSwiper}
			effect='cards'
			modules={[EffectCards, Autoplay]}
			autoplay={{
				delay: 2500,
				disableOnInteraction: false,
			}}
			grabCursor>
			{children}
		</Swiper>
	) : (
		<Swiper
			freeMode
			keyboard
			speed={2500}
			spaceBetween={45}
			{...registerSwiper}
			slidesPerView={numberOfSlides}
			pagination={{ clickable: true }}
			allowTouchMove={true}
			autoplay={{ delay: 2500, pauseOnMouseEnter: false, disableOnInteraction: false }}>
			<Left {...classes('angle angle-left', { first: swiper?.activeIndex === 0 })} onClick={() => swiper?.slidePrev()} />
			{children}
			<Right
				{...classes('angle angle-right', { last: swiper?.activeIndex === 3 - numberOfSlides })}
				onClick={() => swiper?.slideNext()}
			/>
		</Swiper>
	);
};

export default Home;
