import { Cuisine, Location, PRICE, Review } from '@prisma/client';
import Link from 'next/link';
import Price from '../../components/Price';
import { calculateReviewRatingAverage } from '../../../utils/calculateReviewRatingAverage';
import Stars from '../../components/Stars';

interface RestaurantCard {
	id: number;
	name: string;
	main_image: string;
	cuisine: Cuisine;
	slug: string;
	location: Location;
	price: PRICE;
	reviews: Review[];
}

export default function RestaurantCard({
	restaurant,
}: {
	restaurant: RestaurantCard;
}) {
	const renderRatingText = () => {
		const rating = calculateReviewRatingAverage(restaurant.reviews);

		if (rating > 4) return 'Awesome';
		else if (rating > 3 && rating <= 4) return 'Good';
		else if (rating > 0 && rating <= 3) return 'Average';
		else '';
	};

	return (
		<div className='border-b flex pb-5 ml-4'>
			<img src={restaurant.main_image} alt='' className='w-44 h-36 rounded' />
			<div className='pl-5'>
				<h2 className='text-3xl'>{restaurant.name}</h2>
				<div className='flex items-start'>
					<Stars reviews={restaurant.reviews} />
					<p className='ml-2 text-sm'>{renderRatingText()}</p>
				</div>
				<div className='mb-9'>
					<div className='font-light flex text-reg'>
						<Price price={restaurant.price} />
						<p className='mr-4 capitalize'>{restaurant.cuisine.name}</p>
						<p className='mr-4 capitalize'>{restaurant.location.name}</p>
					</div>
				</div>
				<div className='text-red-600'>
					<Link href={`/restaurant/${restaurant.slug}`}>
						View more information
					</Link>
				</div>
			</div>
		</div>
	);
}
