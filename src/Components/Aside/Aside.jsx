import ReactSimplyCarousel from 'react-simply-carousel';
import { useState } from 'react';
import React from 'react'
import './aside-style.css'
import ReactPlayer from 'react-player'
// import toast, { Toaster } from 'react-hot-toast';


const items = [
  {id: 1, title: 'item #4', img: (<a href="https://t.me/c/1182400329/2961"><img src='/img/img5.jpeg' alt="logo" /></a>)},
  {id: 2, title: 'item #1', img: (<a href="https://t.me/c/1182400329/2961"><img src='/img/img1.jfif' alt="logo" /></a>)},
  {id: 3, title: 'item #3', img: (<a href="https://t.me/c/1182400329/2961"><img src='/img/img2.jfif' alt="logo" /></a>)},
  {id: 4, title: 'item #2', img: (<ReactPlayer className="video" url='https://youtube.com/shorts/APUm_UaDjqg?si=Zozt1010PlQ5KIXr' />)},
  {id: 5, title: 'item #4', img: (<a href="https://t.me/c/1182400329/2961"><img src='/img/img3.jfif' alt="logo" /></a>)},
  {id: 6, title: 'item #2', img: (<a href="https://t.me/c/1182400329/2961"><img src='/img/img4.jpg' alt="logo" /></a>)},
];


const Aside = () => {

  // const notify = () => toast('');
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <aside>
      {/* <Toaster/> */}

      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={2}
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
            display: 'none',
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
            minWidth: 500,
          },
        ]}
        speed={200}
        easing="linear"
      >

        {items.map(item => <div className="items" key={item.id}>{item.img}</div>)}

      </ReactSimplyCarousel>

    </aside>
  )

}

export default Aside