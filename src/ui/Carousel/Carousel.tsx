import imgBitcoin2 from "@/assets/images/undraw_bitcoin_p2p_re_1xqa.svg";
import imgBitcoin1 from "@/assets/images/undraw_bitcoin_re_urg.svg";
import imgBitcoin3 from "@/assets/images/undraw_profile_image_re_ic2f.svg";
import AppCard, { AppCardProps } from "@/ui/Card/AppCard";
import { Carousel, Embla } from "@mantine/carousel";
import { Progress } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useRef, useState } from "react";

export default function CarouselPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const autoplay = useRef(Autoplay({ delay: 20000 }));

  const handleScroll = useCallback(() => {
    if (!embla) {
      return;
    }
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (embla) {
      embla.on("scroll", handleScroll);
      handleScroll();
    }
  }, [embla, handleScroll]);

  const items: AppCardProps[] = [
    {
      image: imgBitcoin1,
      title:
        "European New Users Exclusive: Enjoy 0 Fees and 500% APR!",
      tags: ["UTA", "Derivatives"],
    },
    {
      image: imgBitcoin2,
      title: "Exclusive: Enjoy 0 Fees and 500% APR!",
      tags: ["Enjoy", "Fees"],
    },
    {
      image: imgBitcoin3,
      title:
        "European New Users Exclusive: Enjoy 0 Fees and 500% APR!",
      tags: ["UTA", "Derivatives"],
    },
    {
      image: imgBitcoin2,
      title: "Exclusive: Enjoy 0 Fees and 500% APR!",
      tags: ["Enjoy", "Fees"],
    },
    {
      image: imgBitcoin1,
      title:
        "European New Users Exclusive: Enjoy 0 Fees and 500% APR!",
      tags: ["UTA", "Derivatives"],
    },
    {
      image: imgBitcoin2,
      title: "Exclusive: Enjoy 0 Fees and 500% APR!",
      tags: ["Users Exclusive", "European"],
    },
  ];
  return (
    <>
      <Carousel
        slideSize="33%"
        slideGap="md"
        loop
        align="start"
        slidesToScroll={1}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        withControls
        withKeyboardEvents
        getEmblaApi={setEmbla}
      >
        {items.map((_, _k) => (
          <Carousel.Slide key={_k}>
            <AppCard {..._} />
          </Carousel.Slide>
        ))}
      </Carousel>
      <Progress
        value={scrollProgress}
        maw={320}
        size="sm"
        mt="xl"
        mx="auto"
      />
    </>
  );
}
