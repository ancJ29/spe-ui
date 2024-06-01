import { Avatar, Group, NumberFormatter, Table } from "@mantine/core";
import AppText from "@/ui/Text/AppText";
import { ReactNode } from "react";
import _, { cloneDeep } from "lodash"
type FieldType = {
    name: string
    text: string
}

type InstanceProps = {
    fields: FieldType[];
    items: any[];
    fieldTemplate: (field: FieldType, row: any) => ReactNode
    hideHeader?: boolean
}


export default function AppTable(props: InstanceProps) {
    const rows = shuffleArray(elements).map((element) => (
        <Table.Tr key={element.id} style={{ "cursor": "pointer" }}>
            {
                props.fields.map((field, index) => (
                    <Table.Td key={index}>
                        {props.fieldTemplate(field, element)}
                    </Table.Td>
                ))
            }
        </Table.Tr>
    ));

    return (
        <Table withRowBorders={false} highlightOnHover w={"100%"}>
            {!props.hideHeader && <Table.Thead>
                <Table.Tr>
                    {props.fields.map((t, i) => (
                        <Table.Th key={i}><AppText instanceType="WithThead">{t.text}</AppText></Table.Th>
                    ))}
                </Table.Tr>
            </Table.Thead>}
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    )
}

function getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function shuffleArray(array: any[]) {
    const newArray = array.slice(); 
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
const elements = [
    { id: 6, lastPrice: 12.011, change: getRandomNumber(-25, 10), token: 'ETHUSDT', chart: 'Carbon', icon: "https://www.bybit.com/bycsi-root/assets/image/coins/light/eth.svg" },
    { id: 7, lastPrice: 14.007, change: getRandomNumber(-25, 6), token: 'BTCUSDT', chart: 'Nitrogen', icon: "https://www.bybit.com/bycsi-root/assets/image/coins/light/btc.svg" },
    { id: 39, lastPrice: 88.906, change: getRandomNumber(-25, 9), token: 'GMTUSDT', chart: 'Yttrium', icon: "https://www.bybit.com/bycsi-root/fop/b97e9838-e8df-4c98-8f20-adf3815b5b07.svg" },
    { id: 56, lastPrice: 137.33, change: getRandomNumber(-25, 4), token: 'SLIM/USDT', chart: 'Barium', icon: "https://www.bybit.com/bycsi-root/assets/image/coins/light/btc.svg" },
    { id: 58, lastPrice: 140.12, change: getRandomNumber(-25, 12), token: 'SRP/USDT', chart: 'Cerium', icon: "https://www.bybit.com/bycsi-root/assets/image/coins/light/btc.svg" },
];

export function generateItems() {
    let _items = cloneDeep(elements)
    return shuffleArray(_items)
}
