import { FC } from "react";
import Marquee from "react-fast-marquee";

type MarqueeProps = {
    items: JSX.Element[],
    children: React.ReactNode
}
const MarqueeList: FC<Partial<MarqueeProps>> = (props: Partial<MarqueeProps>) => {
    return (
        <Marquee pauseOnHover>
            {props.children}
        </Marquee>
    )
}

export default MarqueeList;

