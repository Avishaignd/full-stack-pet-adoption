import React from "react";
import { Carousel } from "react-bootstrap";

export default function PetsCarousel(pets) {

    // console.log(pets);

  return (
      <>
      <h5>All these pets now have a place to live thanks to you guys!</h5>
    <Carousel id="carousel">
      {pets.pets.map(pet => {
          return <Carousel.Item interval={1900}>
              <img src={pet.image} className="carousel-image"/>
          </Carousel.Item>
      })}
    </Carousel>
    </>
  );
}
