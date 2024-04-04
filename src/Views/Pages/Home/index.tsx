import './index.scss';
import { Autoplay } from 'swiper';
import { Col, Row } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import FaButton from '@src/Components/FaButton';
import { classes } from '@src/Tools/Utils/React';
import useWindow from '@src/Tools/Hooks/useWindow';
import responsive from '@assets/Images/responsive.png';
import openSource from '@assets/Images/open-source.png';
import noAccount from '@assets/Images/no-account-needed.png';
import { Swiper, SwiperSlide, useSwiper, EffectCards } from '@components/Swiper/Swiper';

const Home = () => {
	const { isDesktop } = useWindow();
	const { registerSwiper } = useSwiper();
	const navigate = useNavigate();

	// -----------------------------------------------------------------
	return (
		<div className='home-layout'>
			<Row className='grid md:flex'>
				<Col xs={24} md={12} className='swiper-col'>
					<Swiper
						{...registerSwiper}
						effect='cards'
						modules={[EffectCards, Autoplay]}
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
						grabCursor>
						<SwiperSlide>
							<h2>Open Source & Free</h2>
							<img src={openSource} alt='' />
							{/* <p>You do not have to create an account or sign up to avail our services.</p> */}
						</SwiperSlide>
						<SwiperSlide>
							<h2>No Account Necessary</h2>
							<img src={noAccount} alt='' />
						</SwiperSlide>
						<SwiperSlide>
							<h2>Mobile & Responsive</h2>
							<img className='w-5/6 mx-auto' src={responsive} alt='' />
						</SwiperSlide>
					</Swiper>
				</Col>
				<Col xs={24} md={12} {...classes('info-col', { reverse: !isDesktop })}>
					<h1>My Button</h1>
					<FaButton onClick={() => navigate('/get')}>Get Share Buttons</FaButton>
				</Col>
			</Row>
		</div>
	);
};

export default Home;
