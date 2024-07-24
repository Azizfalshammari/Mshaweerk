import axios from 'axios';
import React from 'react';
import { useEffect , useState } from 'react';



 function Card() {
    const [searchText, setSearchText] = useState('');
    const [map, setMap] = useState(null);
    const [placeId, setPlaceId] = useState('');
    const [formData, setFormData] = useState({ locations: [] });
    const [searchResult, setSearchResult] = useState(null);

    
  return (
    <div>
      <div className=" imgCard relative  w-[30%] text-right border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 m-[auto] mb-[10px]">
        <img className="imgCard w-full h-80 rounded-xl " src="https://lh3.googleusercontent.com/places/ANXAkqGuae9BQ1CsmzliIGoZt9GflPp8luzq7Diwu6bdQ-YKFPAD3C3eqv7mBOuwe8yx5yPcZvvwz_V7v_no4TeOd9-Pa1z24OzvIe8=s1600-w600"/>
        <div className="absolute top-0 start-0 end-0">
            <div className="p-4 md:p-5">
                {/* section search */}
                <div className='flex mt-[10px] justify-between '>
                <div className="search-bar relative z-10">
                <input type="text" className="textbox text-center mt-[-10px]"
                 
                placeholder="ماهي وجهتك؟"/>
                <a className = "search-btn " href="#"     
               >
                <i className="fa-solid fa-magnifying-glass icon-search mr-[10px] text-[#ffa842] " ></i> 
              
                </a>
           
                </div>
                </div>
            </div>
        </div>
        {/* end img */}
            <div className="textCard p-4 md:p-5">
        <h3 className="title text-lg font-bold text-gray-800 dark:text-white">
        Loream
        </h3>
        <p className="details mt-1 text-gray-500 dark:text-neutral-400 mb-[10px]">
        Lorem Odit cumque iure dicta, facere repudian blanditiis ab?
        </p>
        <p className="rate mt-1  dark:text-neutral-400 text-[#ffa842]">
        <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i>
        </p>
        <div className="boxCard sm:inline-flex sm:items-center justify-center space-y-2 mt-[20px] sm:space-y-0 sm:space-x-3 w-full">
        <input type="text" id="inline-input-label-with-helper-text text-right"
         className="max-w-xs py-3 px-4 block w-full border-gray-200 text-right rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="ادخل عنوانك"
        aria-describedby="hs-inline-input-helper-text"/>
            <label for="inline-input-label-with-helper-text" 
        className="block text-sm font-medium dark:text-white text-[19px]"><i className="fa-solid fa-house text-[#9685CF]"></i></label>
        </div>
      
        <div className="boxCard sm:inline-flex sm:items-center  justify-center space-y-2 mt-[20px] sm:space-y-0 sm:space-x-3 w-full">
        <input type="date" id="inline-input-label-with-helper-text text-right"
         className="max-w-xs py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border- focus:ring-[] disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="ادخل اخر موعد "
        aria-describedby="hs-inline-input-helper-text"/>
            <label for="inline-input-label-with-helper-text" 
        className="block text-sm font-medium dark:text-white text-[19px]"><i className="fa-regular fa-calendar-minus text-[#9685CF]"></i></label>
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
  

  )
}


export default Card