'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import React from 'react'

const slides = [
  { id: 1, image: 'https://picsum.photos/id/1015/1200/400', alt: 'Slide 1', caption: 'First Slide' },
  { id: 2, image: 'https://picsum.photos/id/1016/1200/400', alt: 'Slide 2', caption: 'Second Slide' },
  { id: 3, image: 'https://picsum.photos/id/1018/1200/400', alt: 'Slide 3', caption: 'Third Slide' },
  { id: 4, image: 'https://picsum.photos/id/1020/1200/400', alt: 'Slide 4', caption: 'Fourth Slide' },
  { id: 5, image: 'https://picsum.photos/id/1024/1200/400', alt: 'Slide 5', caption: 'Fifth Slide' },
  { id: 6, image: 'https://picsum.photos/id/1025/1200/400', alt: 'Slide 6', caption: 'Sixth Slide' },
]

export default function HeroSlider() {
  const [emblaRef] = useEmblaCarousel({ loop: true })

  return (
    <div className='mt-0'>
      <div className="overflow-hidden w-screen h-72 md:h-128" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.id} className="flex-[0_0_100%] w-full h-96 md:h-128 relative  md:flex-[0_0_33.3333%] md:w-1/3">
              <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
