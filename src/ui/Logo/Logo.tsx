import svgLogo from "@/assets/images/logo.svg";
import svgLogoLight from "@/assets/images/logo_light.svg";
import { Image } from "@mantine/core";

export function AppLogo() {
    return (
        <>
            <Image darkHidden src={svgLogoLight} w={140} />
            <Image src={svgLogo} w={140} />
        </>
    );
}
