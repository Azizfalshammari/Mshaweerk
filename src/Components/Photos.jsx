
            
//             <img className='w-80 h-80 rounded-[6px] mr-[10px]' src="" alt="" />
//             <img className='w-80 h-80 rounded-[6px] mr-[10px]' src="https://i.pinimg.com/564x/10/87/08/108708800aca6e736a5a7eec751e8678.jpg" alt="" />
//             <img className='w-80 h-80 rounded-[6px] mr-[10px]' src="https://i.pinimg.com/564x/04/b1/cf/04b1cff128af90daa74b1b11036a2ed9.jpg" alt="" />
//             <img className='w-80 h-80 rounded-[6px] mr-[10px]' src="https://i.pinimg.com/564x/b3/f6/bf/b3f6bf8790a5b3b910a8f859881d473b.jpg" alt="" />





import React from "react";

// تفاصيل الكاروسيل
const cardDetails = {
  0: {
    imgUrl: 'https://i.pinimg.com/564x/85/9f/be/859fbed9799839634f155353e9b82e7e.jpg',
    title: "Text 1"
  },
  1: {
    imgUrl: 'https://i.pinimg.com/564x/85/9f/be/859fbed9799839634f155353e9b82e7e.jpg',
    title: "Text 2"
  },
  2: {
    imgUrl: 'https://i.pinimg.com/564x/10/87/08/108708800aca6e736a5a7eec751e8678.jpg',
    title: "Text 3"
  },
  3: {
    imgUrl: 'https://i.pinimg.com/564x/04/b1/cf/04b1cff128af90daa74b1b11036a2ed9.jpg',
    title: "Text 4"
  },
  4: {
    imgUrl: 'https://i.pinimg.com/564x/b3/f6/bf/b3f6bf8790a5b3b910a8f859881d473b.jpg',
    title: "Text 5"
  },
  5: {
    imgUrl: "https://picsum.photos/id/42/200/300",
    title: "Text 6"
  },
  6: {
    imgUrl: "https://picsum.photos/id/243/200/300",
    title: "Text 7"
  }
};

// مكون CarouselItem
function CarouselItem({ imgUrl, imgTitle }) {
  return (
    <div className="carousel-card">
      <img src={imgUrl} alt={imgTitle} />
    </div>
  );
}

// مكون AutoplayCarousel
export default function AutoplayCarousel() {
  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {Object.keys(cardDetails).map((detailKey) => (
          <CarouselItem
            key={detailKey}
            imgUrl={cardDetails[detailKey].imgUrl}
            imgTitle={cardDetails[detailKey].title}
          />
        ))}
        {Object.keys(cardDetails).map((detailKey) => (
          <CarouselItem
            key={`duplicate-${detailKey}`}
            imgUrl={cardDetails[detailKey].imgUrl}
            imgTitle={cardDetails[detailKey].title}
          />
        ))}
      </div>
    </div>
  );
}
