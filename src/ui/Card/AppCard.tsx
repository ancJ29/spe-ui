import { Card, Flex, Image, Title, rem } from "@mantine/core";
import AppPill from "@/ui/Pill/AppPill";
import { ComponentProps } from "react";

type Instance = ComponentProps<typeof Card>;
type Custom = {
    image: string
    title: string
    tags: string[]
}
type InstanceProps = Instance & Partial<Custom>

export default function AppCard(props: InstanceProps) {
    return (
        <Card {...props} shadow="none" padding="md" radius="md" withBorder bd="20" h={"100%"}>
            <Flex gap="sm">
                <div style={{ flex: `0 0 ${rem(100)}` }}>
                    <Image
                        src={props.image}
                        alt="Norway"
                    />
                </div>
                <Flex direction="column" gap={"sm"}>
                    <Title order={4} lineClamp={2}>
                        {props.title}
                    </Title>
                    <Flex gap={"sm"}>
                        {props.tags?.map((tag, i) => (
                            <AppPill key={i}>{tag}</AppPill>
                        ))}
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}

export function AppCard2(props: InstanceProps) {
    return (
        <Card {...props} shadow="none" padding="md" radius="md" withBorder bd="20" h={"100%"}>
            <Flex gap="sm">
                <div style={{ flex: `0 0 ${rem(100)}` }}>
                    <Image
                        src={props.image}
                        alt="Norway"
                    />
                </div>
                <Flex direction="column" gap={"sm"}>
                    <Title order={4} lineClamp={2}>
                        {props.title}
                    </Title>
                    <Flex gap={"sm"}>
                        {props.tags?.map((tag, i) => (
                            <AppPill key={i}>{tag}</AppPill>
                        ))}
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}
