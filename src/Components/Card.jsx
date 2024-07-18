import React from 'react'

export default function Card() {
  return (
    <div>
         {/* <div>
             <div className='container mx-auto mt-1 p-8'> 
        <div className='sea mb-3'>
            </div> 
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
          {/* {filteredProducts.map(product => ( <div key={product.id}  */}
          {/* className='bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105'> */}
             {/* <img src={product.image} className='w-full h-80 object-cover' /> */}
             {/* <div className='bg-white rounded-lg shadow-md overflow-hidden'> 
            <img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGBcXGBcYGBcYGhgVFxcXFhcYGBgYHSggGBolGxcXITEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0OGhAQGy0lHSUtLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tOC0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAACAwAEBQEGBwj/xAA+EAABAwICBwYEBAUDBQEAAAABAAIRAyEEMQUSQVFhgfAGcZGhscETIjLRQpLh8RRSYnKiFSMzc4KywtIW/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAECAwQFBv/EAC0RAAICAQIDBwQCAwAAAAAAAAABAhEDBBITITEFIkFRYYGxM2Jx8EKhI1LR/9oADAMBAAIRAxEAPwD47SpAvgTGe9bIpLGw5Bdl4Z5Lcw+SzzbTNUEmheojYrGoufDUd5LZXQ4xWKZ3pTQrFJqrky2KO/C3LlTDnMK7Rpq5Toql5tpesG5GMw7CnNw85LRxOjgbhLw9JzTByQs0WriLgtOpEwmHM2V51DeFp6Npg2IV6rRGRg7iuXm1T31R0sWBKPUwG4cqxRZvCvUgwj+Ui3DxUNRoMWKonkk+VGjGorxJRpQnuoIfjhPY8LJJyNO4y8Th1V+GtfFqp8Oy0Y5uuZVNJmZVpqpXZFlt/wAKkYjCQt2LMrow5cbaMcU+aq12BatajGSo16RzXQxO3Zzs3SjGxLVRe1auIYqNRi7GFKjj5XzKZauQnmmpqLSkZmyvC5qqyWIdRJoExGqpqp/w0LmqLGIKEo6g68UiofmAuq3KiSVhEKri2lX9RV67QcjdRl0HHqZ6ib8EqKsusNjvBek0WQ5tl56gxs/NPKM+a9VofAnVJgjgdWe+2SzZmjXhTHiigrMDc7K/TpFBpDBMcAXyIBiJOedh7LI50zbGKkjObJPyjWG8H2VqmwhZ+EDA4lr9WDmQTc7NWSRszK9PRoktBsZGYy8ksmXbyJwwpq0xGHIVxjEH8Km06RWSbXVM0Q8mW6DQbJ4woBkwVXotI2K6H2ghYsjd8maYtVzRpYPAAgFhQaRpkC8EgXE81Sw2KfTuzbFkeJxznulzBYRYZjiqYYciyX1RGeXkZT6t4MCd4PsgqTvC2aeBZU2EFcraLLREd22O4/dbnmx3VGaKn4szaYNlb+bZ4KxQw+8K9RwkZCyyZZpM1458upj6xOdlZphX6uBByEJdPAFV7otEt7RXa2SnnAyFcp4TVzTWGFW5v+ImzFforeFkaRw2qNy9vUe2LrA0pSBlbdJmm5d7oZMyi4uup4TGMuqLqS9Li8JfJUnYReqw5o7UedywluMQ01z4S2jgEp2BKv48Sh4pGT8JKrQ0SclttwB3LK7RYN1gGGQJkTBBmcu7lPFQlqF4Eo4JeJktx51rgatvNXabg4SNmap4HAF/ytEnMuFxBgQOHHNb2JoCk0ZN64hQ4vmTeLyPPB2s8HZ6lCGgukmG7T37Fbq1GtLQBrzeMr3jLP8ATirmjKNN77MGQtBgEEi1srA3uoqQ9pSxzAGRIuLcVn6ogxEjMyJiJW1U0dUfUqCI1SNWWkDgBwVDSWj2MgtcTtM8ePlCHNDUKRRcHbjv8bqLYpMYAJqdeC6lvQ9rMuhUG1el0dpEBgOerujqF5MFMZUIyKrnCy2Lo+h6I0kyrOtbIX47lo6SwINP5bmxAAk94giDxXznAaQ1CJFpBPGDO1an/wCjqSS15G7uOawZNPNS7pux6iNd7qbWC0Ox1XVIeBAILtWxEjYINxvzuvT1aDKNMu2NBNttp8V8xdpaofxGJkRa/JWKel6jmFjnEg7Dfu7lVl0uWTTcuRfDWQSqj6JgsRSqtDmODp2bRtII2Kw3CjcvJdk9IBroc0gAkhrfmP8AaScwAvX4LTjHuILYbqgjPWJ/Fs1Q0WvO1Yc2Jwk0i6OZSSaLNDCcFcGBkZK7Sws5EHuKu0aJGxc6e4u43I8yMGQ6IstFuHZkc1sPw07EI0cChz3Vusr4tdCuLWbBHED1S2NO1sjcVr0MBCtNwjdyeNFUsyMinotpu1scJkK0zRq0hQjIJzWWsFfwk+pS878DHfgAEIwoW6KMi4VephNxVeTBStAtRfVmQ/ChIODC13YYIDTHQVCTLVlMl2DG9ZeKwGa9E9oSKtMdBa8CcXbZCWW+VHkqujJSDorcJXr3UgM1WxFZrWudawJvMWG2F04ailyMrg2+h5j/AEY7kbdD/wBKZ2V0hWqPqCr834twYdZw1QIm4AO3ksztvpZ3xm0AQ1ogucHOEa0i8ZwDMKfFk5bbGoUraL79HRs8F4ztDpZ1Ks5jqctaPl2EOsZJM2i8RuWtg9OauMcatVoplkhwcS0jJo1dhuSRFoWR2rxOHqvFSm5xN9a1nTBFzfh4K7HJppMUo2uRTw9Gi9vxy8tubEj6wZaYtNgPAqtjaxqMANVstBEm0jZAIz48Fkvmbm1yAjc87LrXzKdthYLDjXBqH5YMnOYgQPGLqzgcc2nU1g2GnZM9XVEut9WXHrcEnX3AqXNj2JHo8R2mGTaZmcydywMTiNYz3peqdy5q+Caih0DJURHvUToCs1GWnNadTCNIsBtmNnDNLNMmwiReD6hWlBnay6SrFVocTAh27fxSSJ2JUAGtdaGGxpEAARxCoupnchY7YoygpIdm1h9I6p3bwr+H0iBe8bQIuMzmvPAE2DfP7qBxFtu7JUS08WWrIfT+zXaTVe465IJktP4rQCZ2x6L6BovTdF4A+I0OgSDa/NfnSniHAzdaOH0tUbcOtuKwZuzrdxZfHNypn6PFdhH1DfyzQVMUxoB1xBy4r4Hhu0VVpkOI3w4rSraebVAD9YjZDiPAZLBPs+aLlOLPuWGxbXCWuBHBWBW4r4ThNI/CJdTrPbPO24jamaS0/iHNIe5zw6IdNiPm+kCNX6lXHRzukyPcfU+5/GTKdc8F4LsLpmpiaTg+NamQLW+Uj5bbF6umSN6yzhqISaobxRatM3abSVyq0jNLwGKaMyu43FNORXR2btLv57vIx1LfVCajgUoxuWVpDS9KlOs8AgTqzc8I5LLf2vwwbJqfNE6sGROwmIzssEdNnl/E1KKS6np4Co6Vc8UnGiAXkDV57fBeJrduXQQGnWDHXtGuRAN8gDJi6w6HbeqKTWvqAFguYvEGJIAGUK5aTL1C4p9T3dIVf4ZxcPnExruBJByk5A3gWi21eY0tpwMw7qRHxHEQXhzXFusTY7HGBfdrBeLxvbF77azn5wJPPrgsatpR79+eWQC3YdFk6yB5F4HrNFdof4afh6rdYNm2sZb+Kc7gwRlZY+ksa2odYkk6xdrTeXfV5rCquLc8+KQcRNvP2W6Ok727xK3JIdWql7pGQtuspUdA3lJ+PFgB6pn8Qc9vFathHcjlOmTsKNwOQsFP4tL/AImc/JFMdpAEAzbmfZQ4qMoH2QVq2YSzTOZ75U1HzIOVdAy++8lDUgmJyS+AUiMlKiDZHA7HLiFwUTojZdbjC76sz+L72RNp5bYO/b3WVIMmeA80VMOEfuI3KVkEy4+nJEC4vxPMdeCGpfi7fttsPFD85OcWtCRWpnWmZmCOtiipLoG5BOoXubHaOoU+Ahpsc4mQSmuY6NsZQnuQWjjHRtI9Uw1i6xvHWxNo4aQJgd6MYZo+o2iIGWxVvLEW9FZ9QT9Mmdt/FQ13TYRH4fO3BWmto/TM9xhWMHgw4/JSe874N+8pcVeTJKXkVRRLxrD9uBO1A/CVBlK9NhdC1yIFMMG4uH/rO5WqHZOuSCazW8Gtc71IUU8jfQNzPLVMK5on5r+u5Sl/EAWa7LyX0fDdkGn63vP5W+gladDsvhm/U0nvc4+6VSfVIk5WfPtHaXr0Rr0mPZVsdYHcCLtJIJvtG0rXw3abFOANTEVfiDZrm+7IgDivbU9HYRhth6ZO8tBPiVcp12N+ljG/2taPQJLFLwZFsx+z/aPEgtY8Gq3WHzAOcSDIgu3DNa3arS72loYxzdVrjrCczbxt5rtTS7pDQYn02qtQ008BtzDmz5keyls/jfMlz27j51pLGVK0gtd8xJcbkmb+KyxVe0Q2m8wIkyvrlfGtePmY139zQfUKi+hhXZ0KbTvDQPRRenl52R3o+S6+Ie65dt2HyVGvTfrakOnaIX1bHdnMM+4DhO1r3ehMLLq9lQBFOoeEwT7Eqaxzj0SHvPn9Om4WAInbe/NaeDlsue0ki43DkVtYrQuIbEOa6O9p91QxTK7RemSd4v6Kuby/6klkroZWKoOqOloPO/WaF2i3NF7ZeadU0i4Q0zPnOxcbj7Eu29ZKO7J4EJ5X1oX/AKcRn1l91WfRIMEq6zEl5jK8H19kbnUwL39U1kmnzIxy86Zlub1dSpS1VfdXZrCLwUNbFgiN36qam/IseRGaeKhKsPYDz9eoS3UY65q1SQlNMW1nJcLSFYdRgcfdJdScRw665oUkG9ASd6iuUaB1R9H/AHGpP+NlE90fMjvYHwxMpvxWgKqzCVTs8bK1S0U/8TwO66jw2yuhX8Up/GiMpWjS0RT/ABS7nHotHD4VjfpY3wnzKfCQKKMKnWe76abj3NPrzWhR0VXdmA0cT7CVt0zxV+hgnkTqwP5nHVHIuieSfDiOkYFLs5P1VeTW+5Wnh+z1AZtc7+51vAQtilhmDN+twYLfmd/8lXqIA+ljW8T8x/ysOQCdJEkUcDoemLsotH9WqAPzFa9LC7yO4CfsEOtNySTxujNeErHRbp0wNniZ9ICb8UDr2WY7FcUh1UnaojNWpjtyUcQTtWeHKOqpgXfjpdTFKi+sq1aumhF+jWnXd/Kx3iRb3SHVD8Gk7+4f5W90AdGGe7+YxykD7rgvhWnc4n/Jw91k4nf3fcl/T/6a9nc2/bf9odSxaN9WVksenMqbF0DCXRiCNqP+LBzVBzktzkwNM4jjI3G488uSRUcw5gji248CZ81QNUqfHTENr4EPy1X8Nv5XXPKVjYvQ9MkjV1TwsRyOS0XvUONdkSHDc4aw5TdvIhJxT6hZ5mvoKPofHf8ApCzcVoqsNzu4j3XtHPpOzBYd4+dv5TDh4lJfgHG7CH/2GT+Qw7yUeGh2jwFSm5v1At77LjavivYVaewjvB+yo18DTObY7pHok4hyMRj9pMdQrDsR3d36806toobHnndVauAqNFoPjPoq3AKGA2PUI6bwARzWa97hnI2XlD8ZQ4dio0xUCizvildS4YqN4OTKZvGadT+A3+eqfyN93eist0k8CGBtMf0CDzcfmPitJIZR0dUzcAwb3nV8jc8grVOjRbm51Q/0jUb+Z0k+AWe10mSSTvP6qxTKQzTpYkj/AI2sp8QJd+d0nwhG10mXEk7yZPmqDagTRWhIZpU3wmfHhZYrcV343FKhmkcQhFcqk129OY7YkMtB6L4ir64QGoigLDnpbqiSaiWaidCHOqKrUqLj6iLBt16jRxk9wufRKctsXJ+A4R3SUV4mlpj5KDG8QPBpJ813BCcIeGsfA6yT2nq/8Y/uP/j+qs9niHUSNms5viB91ym3HTRn91/J00k9RKP218GOHJgdIVQOixz+yY1y7ZyCy1649yrOdF13XQIJzktzkLilOcmAfxELqiU56WXJiGPekuehclufvQBcGk3xD4qDc8a0dzvqHIrhdQd/NSP52+zh5qg4pZckBffo18EsioN7DreLfqHgqDghFWDIMEbRZWv9VcbVGtqj+ofNyeIckMpEqvUwrD+ELUjDvyc6kdzvmb+YXHMJVbRtQDWAD2/zMOuPK45hKgsyTo9u8qKxPUqJUFj2JzCqjXpoegZca+E0VuOaotcmiokMuiquipKptJT6aALLXEp9I8ZVVpTWPSGXGvvmEfxVS1r9ddFd+IkMt/ElRz/TJVtff13Ka6dCHfEOcoXVOvulF3f4IHPTAY95Wh2fpy9zv5WwP+79AVjly9H2epxS1v5iTyFh6FY9dPbhfryNeihuyr05lHtK/wD3ANzB5k/orfZqp/tH/qEf4sKyNPPmu++4f4j3V/s7Vim7b8582s2eCz5o1pIr8F2KV6qT/JSxjYq1Buc6OZkeqQHJ+mx/vH+oNdHKPZUSV0dPPdji/RGDPHbkkvUsh09dW+6gfdVmvvc9yIlXFQ4lLc5LDrX9FwuTAjigc5cLkpzkAdJQFy4HICUARwSiURcgddAgHFLLkbkolAEL0VKu5plri08CR6JRCWUgNT/Wau3Ucd5Y0k95hRZRcuJBSLAcjDkgFMBSJDwU1h665qs0o2FIC2x3RTWOVRp5JrTf7IGWw6M/JGamX7qrrfp11miD8/ugCyX9dZIhU4qsHGLBHrdSgLLGvHiI25SprQJPR3pQO70XQ5ADS/8AZA53XBA07o4ICQgAyeuuK9lhKWqxrdwA8BdeQwFPWqsb/UDyHzHlZeyadq5PaU+cY+51uzocpS9jx2kH61V53vd6kDyAWn2dP+28f15d7WgSM1hOq7efjcra7NwWVL3Dxt2wM+ErTq41gryoy6WV57/JztGIcw72kW4EbN91kB1uvFbfaWlDGOvAdGyBrXvtmQvPh4MwcuUcFZoJXhXuQ1sazP2CDriOurp2vbzSHu3KNqb1sMgZddTX4lA5+Y58Eqf1hADda6W53X2UcQlvcmBHFLLlHuS3lIA5QygJQlyACLkBUD0BKAOFAXLpKFAEJXFzVXEhBhHKSCjBUSQ4FNVeU1h6juQA5js0c7VXHUphNygCwx4gi/67/NGH/b2SQR4WzHt90bffu/YJgPDzs2b8/su36/XvF0oO259X9lHcI/ZADtbrefsoHGc+63UpRdfZwM7PH7ohUEcOge/9UAHPXBCd8buvL1QtK4Rf9/KeskAbPZmlNV7v5WwO9x+zfNb2PqatKo7aGOPOCs3s1TikXR9TiZ4D5Rl3E80/T1XVw7zvgfmcAuDnfE1NeqR3sK4emv0bPITG/wBpXouylS1UXsWEm2cO455eS87re9t4+2a3OyTjNUf9MyT/AH3iPfYulrvoP2+TmaL6y9/g1NOs1sM45AQcoycJtuheSp5jPy65r2NSlLagOrdrhAbBuNp1jK8W1wier5Krs192UfX5Lu0V3oy9PgOTHM9HvQl178r5+fsunx64rmtHpbdbd3dQumc07Od7IHGZ37bR6bMlAevSeP6KVDI64eyAOa3XLrwQuKFzhv8APreg1s0AQlC/vXEGsgCOKAldc5A4wgDsrkoC5cLkgOlCVCUKAISVFzxUSAIcLJgM8Uqe9GCgYyeto2hGHpIKcx10AHKY13W/ruS6ZsB+3r5oot4deaAG62UDPM778ctngj53y4buaT55ekfZMa/cBv8ADr1QIY3v6HRRUjsy5xZLLjGdp843eK4H8I69EDGA7PfOLR1xRAxA5xvBv5pQb4ifb9V2dk368EAGT3Dr7IH1LE8445LodbLJP0bT161Mf1A8m/Nfw81GctsW34EoR3SUV4nssGzUY1k/S0DwCy+1DopAXu8bTsDjlPALWBWD2sf/AMTdnzHhsHuuBpVuzr8nf1dRwyryo86459eq3+xx+at/az1esB5Wx2ULTUeHATqtLd9i6Y8R4rra1f4Je3yjkaN/54+/wz1DGQYFhtgefevC4hmq5zcyHEX4Ej2XtqlW86zR3nM24rx2l3D47wCLukRtkA58ysXZre9r0NvaKWxP1A2j9rbED+o/XJc1rXH73C7NtmzcOG3Ndo4wLSYE9A5IHE7/ACXRP7nn7IGnrj75oAmseVilhyKe/alEZ33IGEd4QQoHW8uuC5Oz7dFAHHIC5Gcs0opAQoEZKWEAQlQQuTwQkoALVUQyd5USALYN37I9UzG0KKIGH3G1kbN3XkoogQbN/jzXZi+3JRRADNfdlH3nNdJ2908dvPYoogBrTOzMHx6hDNyZk89nXkoogAzlPghBv4+UriiAOusVrdl6E1XOP4WjxcbeQcOaiiy6x1hl++Jr0SvPG/3keoBXmO1dQmq1u5ttubjnu+lcUXL0P1l+GdTX/Rf5Riax9vXitjsrJe4AkDVbJEXAJtBB47jxUUXV1f0ZfvicrSfWj++B6l1SDnlFu+dq8t2naRW1p+po5QSPcLqi5eh5Zl+H8HT13PC/Yy2TE+a5rGSCIG8Hn7KKLvI4LOPFs9+zbvQxa2yJ7iYnunYuqJgC4dcuCUwbzPJRRAzndxQE+O6bZ7V1RIAZsLbv2QlcUQIkJRUUSGCSuEqKIA5rKKKIA//Z'></img>
              <div className='p-4 flex flex-col items-start'> 
            <h2 className='text-xl font-semibold mb-2'>Title</h2>
            <p className='text-gray-700 mb-2'></p> */}
            {/* <Link to={`/details/${product.id}`}>  */}
            {/* <button className='bg-gradient-to-r from-[#FFB526] to-[#ED5004] text-black px-4 py-2 rounded-md hover:bg-yellow-600'> View Details </button>  */}
            {/* </Link>  */}
            {/* </div>
             </div>  */}
             {/* ))} */}
            {/* </div> */} 
            {/* </div> */}
      {/* </div> */}
      <div class=" imgCard relative  w-[30%] text-right border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 m-[auto] mb-[10px]">
        <img class="imgCard w-full h-80 rounded-xl " src="https://i.pinimg.com/236x/73/e4/ce/73e4cef17f5c235ed7891c09bb71f5d0.jpg"/>
        <div class="absolute top-0 start-0 end-0">
            <div class="p-4 md:p-5">
                {/* section search */}
                <div className='flex mt-[10px] justify-between '>
                {/* <div><i className="fa-solid fa-magnifying-glass icon-search"></i></div> */}
                <div class="search-bar relative z-10">
                <input type="text" className="textbox text-center mt-[-10px] " placeholder="ماهي وجهتك؟"/>
                <a class = "search-btn " href="#">
                <i className="fa-solid fa-magnifying-glass icon-search mr-[10px] text-[#ffa842] "></i> 
                {/* ............. */}
                {/* search... */}
                </a>
                </div>
                </div>
            </div>
        </div>
        {/* end img */}
            <div className="textCard p-4 md:p-5">
        <h3 class="title text-lg font-bold text-gray-800 dark:text-white">
        Loream
        </h3>
        <p className="details mt-1 text-gray-500 dark:text-neutral-400 mb-[10px]">
        Lorem Odit cumque iure dicta, facere repudian blanditiis ab?
        </p>
        <p className="rate mt-1  dark:text-neutral-400 text-[#ffa842]">
        <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i>
        </p>
        <div className="boxCard sm:inline-flex sm:items-center justify-center space-y-2 mt-[20px] sm:space-y-0 sm:space-x-3 w-full">
        <input type="text" id="inline-input-label-with-helper-text text-right"
         className="max-w-xs py-3 px-4 block w-full border-gray-200 text-right rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="ادخل عنوانك"
        aria-describedby="hs-inline-input-helper-text"/>
            <label for="inline-input-label-with-helper-text" 
        class="block text-sm font-medium dark:text-white text-[19px]"><i className="fa-solid fa-house text-[#9685CF]"></i></label>
        </div>
      
        <div className="boxCard sm:inline-flex sm:items-center  justify-center space-y-2 mt-[20px] sm:space-y-0 sm:space-x-3 w-full">
        <input type="date" id="inline-input-label-with-helper-text text-right"
         className="max-w-xs py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border- focus:ring-[] disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="ادخل اخر موعد "
        aria-describedby="hs-inline-input-helper-text"/>
            <label for="inline-input-label-with-helper-text" 
        class="block text-sm font-medium dark:text-white text-[19px]"><i className="fa-regular fa-calendar-minus text-[#9685CF]"></i></label>
        </div>
        <div className="boxCard sm:inline-flex sm:items-center justify-center space-y-2 mt-[20px] sm:space-y-0 sm:space-x-3 w-full">
        <input type="text" id="inline-input-label-with-helper-text "
         className="max-w-xs py-3 px-4 block w-full border-gray-200 text-right rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="ملاحظات"
        aria-describedby="hs-inline-input-helper-text"/>
            <label for="inline-input-label-with-helper-text" 
        className="block text-sm font-medium dark:text-white text-[20px] "><i className="fa-solid fa-pencil text-[#9685CF]"></i></label>
        </div>
         </div>
         {/* end */}
            </div>
        </div>
    

//  </div>

  )
}
