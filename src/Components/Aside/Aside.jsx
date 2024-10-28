import ReactSimplyCarousel from 'react-simply-carousel';
import { useState } from 'react';
import React from 'react'
import './style.css'


const items = [
  {id: 1, title: 'item #1', img: '/img/spiritlife-logo.png'},
  {id: 2, title: 'item #2', img: '/img/spiritlife-logo.png'},
  {id: 3, title: 'item #3', img: '/img/spiritlife-logo.png'},
  {id: 4, title: 'item #4', img: '/img/spiritlife-logo.png'},
  {id: 5, title: 'item #5', img: '/img/spiritlife-logo.png'}
];


const Aside = () => {

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <>
      <aside>
        <ReactSimplyCarousel
          activeSlideIndex={activeSlideIndex}
          onRequestChange={setActiveSlideIndex}
          itemsToShow={3}
          itemsToScroll={1}
          className="slide"
          forwardBtnProps={{
            //here you can also pass className, or any other button element attributes
            style: {
              alignSelf: 'center',
              background: 'black',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              fontSize: '20px',
              height: 30,
              lineHeight: 1,
              textAlign: 'center',
              width: 30,
              // display: 'none',
            },
            children: <span>{`>`}</span>,
          }}
          backwardBtnProps={{
            //here you can also pass className, or any other button element attributes
            style: {
              alignSelf: 'center',
              background: 'black',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              fontSize: '20px',
              height: 30,
              lineHeight: 1,
              textAlign: 'center',
              width: 30,
              display: 'none',
            },
            children: <span>{`<`}</span>,
          }}
          responsiveProps={[
            {
              itemsToShow: 3,
              itemsToScroll: 1,
              minWidth: 768,
            },
          ]}
          speed={300}
          easing="linear"
        >

          {items.map(item => <div key={item.id}><img src={item.img} alt="logo" /></div>)}

        </ReactSimplyCarousel>

      </aside>
    </>
  )

}

export default Aside