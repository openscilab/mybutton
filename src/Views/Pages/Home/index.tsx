import './index.scss';
import { Col, Grid, Row } from 'rsuite';
import { Swiper, SwiperSlide, useSwiper, EffectCards } from '@components/Swiper/Swiper';

const Home = () => {
	const { registerSwiper } = useSwiper();
	return (
		<div className='home-layout'>
			<Grid>
				<Row>
					<Col md={12}>
						<Swiper {...registerSwiper} effect='cards' modules={[EffectCards]} grabCursor>
							<SwiperSlide>Slide 1</SwiperSlide>
							<SwiperSlide>Slide 2</SwiperSlide>
							<SwiperSlide>Slide 3</SwiperSlide>
							<SwiperSlide>Slide 4</SwiperSlide>
						</Swiper>
					</Col>
					<Col md={12}></Col>
				</Row>
			</Grid>
		</div>
	);
};

export default Home;
