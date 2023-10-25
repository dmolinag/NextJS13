import { PRICE } from '@prisma/client';
import React from 'react';

export default function Price({ price }: { price: PRICE }) {
	const renderPrice = () => {
		switch (price) {
			case PRICE.CHEAP:
				return (
					<>
						<span className='font-bold'>$$</span>
						<span className='text-gray-400'>$$</span>
					</>
				);
			case PRICE.REGULAR:
				return (
					<>
						<span className='font-bold'>$$$</span>
						<span className='text-gray-400'>$</span>
					</>
				);
			case PRICE.EXPENSIVE:
				return (
					<>
						<span className='font-bold'>$$$$</span>
					</>
				);

			default:
				break;
		}
	};

	return <p className='flex mr-3'>{renderPrice()}</p>;
}
