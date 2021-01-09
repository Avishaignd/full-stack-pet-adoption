import React from 'react'
import PetCard from './PetCard';

export default function SearchResults (props) {

    return (
        <div className="d-flex">
            {props.props.map((pet) => {
                return <PetCard key={Math.random()} pet={pet}/>
            })}
        </div>
    )
}
