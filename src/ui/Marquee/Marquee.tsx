import { ComponentProps, FC } from "react";
import Marquee from "react-fast-marquee";


type Instance = ComponentProps<typeof Marquee>;
type Custom = {
    
}
type InstanceProps = Instance & Partial<Custom>

const MarqueeList = (props: InstanceProps) => {
    return (
        <Marquee pauseOnHover {...props}>
            {props.children}
        </Marquee>
    )
}

export default MarqueeList;

