import AppTabs from "@/ui/Tabs";
import { TableRecordsSwap } from "./TableRecordsSwap";
import { TableRecordsDeposit } from "./TableRecordsDeposit";
import { TableRecordsWithdraw } from "./TableRecordsWithdraw";
import { TableRecordsOthers } from "./TableRecordsOthers";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

export function TabsTransactions() {
    const [tab, setTab] = useState<string | null>("swap")
    const navigate = useNavigate();
    let location = useLocation();
    
    useEffect(() => {
        setTabByRoute()
    }, [location.pathname])

    const setTabByRoute = useCallback(() => {
        let f = location.pathname.split("/")
        let tab = f[f.length - 1]
        const isIndex = Boolean(matchPath("/wallet/records", location.pathname)?.pattern)
        setTab(isIndex ? "swap" : tab)
    }, [location.pathname])

    const onChangeTab = useCallback((t: string | null) => {
        // setTab(t)
        navigate(`/wallet/records/${t?.toLowerCase()}`, {
            replace: true
        })
    }, [location.pathname])
    
    return (
        <>
            <AppTabs 
                className="noBg"
                value={tab}
                showPanel={false}
                onChange={onChangeTab}
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
                            value: "swap",
                        },
                        tabsPanelProps: {
                            children: <>
                                <TableRecordsSwap/>
                            </>,
                            value: "swap",
                        },
                    },
                    {
                        data: {
                            label: "Deposit",
                            value: "deposit",
                        },
                        tabsPanelProps: {
                            children: <>
                                <TableRecordsDeposit/>
                            </>,
                            value: "deposit",
                        },
                    },
                    {
                        data: {
                            label: "Withdraw",
                            value: "withdraw",
                        },
                        tabsPanelProps: {
                            children: <>
                                <TableRecordsWithdraw/>
                            </>,
                            value: "withdraw",
                        },
                    },
                    {
                        data: {
                            label: "Others",
                            value: "others",
                        },
                        tabsPanelProps: {
                            children: <>
                                <TableRecordsOthers/>
                            </>,
                            value: "others",
                        },
                    },
                    
                ]}
            />
        </>
    )
}
