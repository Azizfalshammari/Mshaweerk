
            
//             <img className='w-80 h-80 rounded-[6px] mr-[10px]' src="" alt="" />
//             <img className='w-80 h-80 rounded-[6px] mr-[10px]' src="https://i.pinimg.com/564x/10/87/08/108708800aca6e736a5a7eec751e8678.jpg" alt="" />
//             <img className='w-80 h-80 rounded-[6px] mr-[10px]' src="https://i.pinimg.com/564x/04/b1/cf/04b1cff128af90daa74b1b11036a2ed9.jpg" alt="" />
//             <img className='w-80 h-80 rounded-[6px] mr-[10px]' src="https://i.pinimg.com/564x/b3/f6/bf/b3f6bf8790a5b3b910a8f859881d473b.jpg" alt="" />





import React from "react";

// تفاصيل الكاروسيل
const cardDetails = {
  0: {
    imgUrl: 'https://i.pinimg.com/564x/04/b1/cf/04b1cff128af90daa74b1b11036a2ed9.jpg',
    title: "Text 1" ,
    time: "7:00 PM"  
  },
  1: {
    imgUrl: 'https://i.pinimg.com/564x/b3/f6/bf/b3f6bf8790a5b3b910a8f859881d473b.jpg',
    title: "Text 2",
      time: "7:00 PM"
  },
  2: {
    imgUrl: 'https://i.pinimg.com/564x/10/87/08/108708800aca6e736a5a7eec751e8678.jpg',
    title: "Text 3",
      time: "7:00 PM"
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
    imgUrl: 'https://mail.google.com/mail/u/0?ui=2&ik=3c551a684f&attid=0.1&permmsgid=msg-f:1804659188637567376&th=190b6ff877630990&view=fimg&fur=ip&sz=s0-l75-ft&attbid=ANGjdJ-drrrYMLHltT7U3xhpPG_jIJSfWxF3C60BGzhTHFjO3oBlrwdOEfoYpu8k1QN1zY6L6Jxji97Ssz_Y_f-O21J2LQWg45MbeNK0GYc6Kbz_jhjHFhieuz_ZwTw&disp=emb&realattid=190b6ff2a02e474e4861',
    title: "Text 6"
  },
  6: {
    imgUrl: "https://picsum.photos/id/243/200/300",
    title: "Text 7"
  }
};

// مكون CarouselItem
// function CarouselItem({ imgUrl, imgTitle }) {
//   return (
//     <div className="carousel-card">
//       <img src={imgUrl} alt={imgTitle} />
//     </div>
//   );
// }
function CarouselItem({ imgUrl, imgTitle, imgTime }) {
    return (
      <div className="carousel-card">
        <img src={imgUrl} alt={imgTitle} />
        <div className="carousel-card-title">{imgTitle}</div>
        <div className="carousel-card-time">{imgTime}</div>
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
            imgTime={cardDetails[detailKey].time}
          />
        ))}
        {Object.keys(cardDetails).map((detailKey) => (
          <CarouselItem
            key={`duplicate-${detailKey}`}
            imgUrl={cardDetails[detailKey].imgUrl}
            imgTitle={cardDetails[detailKey].title}
            imgTime={cardDetails[detailKey].time}
          />
        ))}
      </div>
    </div>
  );
}
