import React from "react"
import Carousel from "./carousel"
import CarouselItem from "./carousel-item"
import Review from "./review"
 // TODO: replace with real client testimonials (these were copied from margelo.io).
 const Testimonials : React.FC =() => {
    return(
    <Carousel label="Testimonials">
    <CarouselItem index={0}>
        <Review by="Axel (Showtime)">
            Margelo and Showtime both share the love for high-quality software and the passion for building something people want.
        </Review>
    </CarouselItem>


    <CarouselItem index={1}>
        <Review by="Axel (Showtime)">
            Margelo and Showtime both share the love for high-quality software and the passion for building something people want.
        </Review>
    </CarouselItem>

    <CarouselItem index={2}>
        <Review by="Axel (Showtime)">
            Margelo and Showtime both share the love for high-quality software and the passion for building something people want.
        </Review>
    </CarouselItem>


    <CarouselItem index={3}>
        <Review by="Axel (Showtime)">
            Margelo and Showtime both share the love for high-quality software and the passion for building something people want.
        </Review>
    </CarouselItem>

    <CarouselItem index={4}>
        <Review by="Axel (Showtime)">
            Margelo and Showtime both share the love for high-quality software and the passion for building something people want.
        </Review>
    </CarouselItem>
</Carousel>
 )
 }
 


 
 export default Testimonials
 