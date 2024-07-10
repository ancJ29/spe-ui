import AppTabs from "@/ui/Tabs";

export function TabsTransactions() {
    return (
        <>

            <AppTabs
                className="noBg"
                defaultValue={"1"}
                showPanel
                classNames={{
                    root: "tabBorderSmall"
                }}
                styles={{
                    tabLabel: {
                        fontWeight: "bolder",
                        fontSize: "20px"
                    }
                }}
                items={[
                    {
                        data: {
                            label: "Swap",
                            value: "1",
                        },
                        tabsPanelProps: {
                            children: <>
                                {/* xxx */}
                            </>,
                            value: "positions",
                        },
                    },
                    {
                        data: {
                            label: "Deposit",
                            value: "2",
                        },
                        tabsPanelProps: {
                            children: <>
                                {/* yyy */}
                            </>,
                            value: "2",
                        },
                    },
                    {
                        data: {
                            label: "Withdraw",
                            value: "3",
                        },
                        tabsPanelProps: {
                            children: <>
                                {/* yyy */}
                            </>,
                            value: "3",
                        },
                    },
                    {
                        data: {
                            label: "Others",
                            value: "4",
                        },
                        tabsPanelProps: {
                            children: <>
                                {/* yyy */}
                            </>,
                            value: "4",
                        },
                    },
                    
                ]}
            />
        </>
    )
}
