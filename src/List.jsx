import React, { useState } from 'react'

import "./List.css"

export const List = ({ data, setter }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='List'>
			<span className={`setList ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>

			</span>
			{isOpen &&
				<ul>
					{data.map((elem, index) => <li
						key={index}
						className="list__item"
						onClick={() => {
							setter(elem)
							setIsOpen(!isOpen)
						}
						}
					>
						{elem}
					</li>)}
				</ul>
			}

		</div >
	)
}
