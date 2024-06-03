import { ComponentProps  } from "react";
import Marquee from "react-fast-marquee";


type Instance = ComponentProps<typeof Marquee>;

type InstanceProps = Instance & Partial<{}>;

const MarqueeList = (props: InstanceProps) => {
  return (
    <Marquee pauseOnHover {...props}>
      {props.children}
    </Marquee>
  );
};

export default MarqueeList;

