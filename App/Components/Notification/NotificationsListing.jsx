/**
 * @File notifications listing component
 * 
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail
 */

import * as React from 'react';

const NotificationsListing = ({ items }) =>
{
	return !items.length ? null : <ul className="flex flex-v">
		{
			items.map((item) =>
			{
				if (typeof item == 'string')
					return <li className="container-box regular"><p>{item}</p></li>;
			})
		}
	</ul>;

	{
		!componentErrors.length ? null : (
			<div className="container flex flex-v">
				{componentErrors.map((error) => (
					<p
						key={generateId()}
						className="list-item container-box info"
					>
						{error}
					</p>
				))}
			</div>
		);
	}
};