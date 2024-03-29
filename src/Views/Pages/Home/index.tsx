import './index.scss';
import { Autoplay } from 'swiper';
import { Col, Grid, Row } from 'rsuite';
import FaButton from '@src/Components/FaButton';
import noAccount from '@assets/Images/no-account-needed.png';
import { Swiper, SwiperSlide, useSwiper, EffectCards } from '@components/Swiper/Swiper';

const Home = () => {
	const { registerSwiper } = useSwiper();
	return (
		<div className='home-layout'>
			<Grid>
				<Row className=''>
					<Col md={12} className='swiper-col'>
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
								<h2>Supported Services</h2>
							</SwiperSlide>
							<SwiperSlide>
								<img src={noAccount} alt='' />
								<h2>No Account Necessary</h2>
								<p>You do not have to create an account or sign up to avail our services.</p>
							</SwiperSlide>
							<SwiperSlide>
								<h2>Open Source & Free</h2>
							</SwiperSlide>
							<SwiperSlide>
								<h2>Mobile & Responsive</h2>
							</SwiperSlide>
						</Swiper>
					</Col>
					<Col md={12} className='info-col'>
						<h1>My Button</h1>
						<FaButton>Get Share Buttons</FaButton>
					</Col>
				</Row>
			</Grid>
		</div>
	);
};

export default Home;
