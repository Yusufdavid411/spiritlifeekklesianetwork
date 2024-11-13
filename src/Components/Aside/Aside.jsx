import ReactSimplyCarousel from 'react-simply-carousel';
import { useState } from 'react';
import React from 'react'
import './aside-style.css'
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
// import toast, { Toaster } from 'react-hot-toast';


const items = [
  {id: 1, title: 'item #4', img: (<a href="/img/img5.jpeg"><img src='/img/img5.jpeg' alt="logo" /></a>)},
  {id: 4, title: 'item #2', img: (<ReactPlayer className="video" url='https://youtube.com/shorts/APUm_UaDjqg?si=Zozt1010PlQ5KIXr' />)},
  {id: 2, title: 'item #1', img: (<a href="/img/img1.jfif"><img src='/img/img1.jfif' alt="logo" /></a>)},
  {id: 3, title: 'item #3', img: (<a href="/img/img2.jfif"><img src='/img/img2.jfif' alt="logo" /></a>)},
  {id: 5, title: 'item #4', img: (<a href="/img/img3.jfif"><img src='/img/img3.jfif' alt="logo" /></a>)},
  {id: 6, title: 'item #2', img: (<a href="/img/img4.jpg"><img src='/img/img4.jpg' alt="logo" /></a>)},
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
          className:"btn",
          //here you can also pass className, or any other button element attributes
          // style: {
            
          // },
          children: <FontAwesomeIcon icon={faCaretRight} className="icon-btn" fade />,
        }}
        backwardBtnProps={{
          className:"btn",
          //here you can also pass className, or any other button element attributes
          // style: {
          //   alignSelf: 'center',
          //   background: 'black',
          //   border: 'none',
          //   borderRadius: '50%',
          //   color: 'white',
          //   cursor: 'pointer',
          //   fontSize: '20px',
          //   height: 30,
          //   lineHeight: 1,
          //   textAlign: 'center',
          //   width: 30,
          // },
          children: <FontAwesomeIcon icon={faCaretLeft} className="icon-btn" fade />,
        }}
        responsiveProps={[
          {
            itemsToShow: 3,
            itemsToScroll: 1,
            minWidth: 650,
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