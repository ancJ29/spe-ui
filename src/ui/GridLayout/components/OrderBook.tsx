import AppTabs from "@/ui/Tabs";
import AppText from "@/ui/Text/AppText";
import { NumberFormatter } from "@mantine/core";

export function OrderBook() {
  return (
    <>
      <AppTabs
        instancetype="WithMediumNoBorder"
        defaultValue={"1"}
        showPanel
        items={[
          {
            data: {
              label: "Order Book",
              value: "1",
            },
            tabsPanelProps: {
              children: (
                <>
                  <div className="head_item_grid">
                    <div className="head_item_grid--item head_item_grid--item-20">
                      <AppText fz={10}>Price(USDT)</AppText>
                    </div>
                    <div className="head_item_grid--item head_item_grid--item-40">
                      <AppText fz={10}>Qty(ETH)</AppText>
                    </div>
                    <div className="head_item_grid--item head_item_grid--item-40">
                      <AppText fz={10}>Total(ETH)</AppText>
                    </div>
                  </div>
                  {[...Array(10)].map((item, i) => (
                    <div className="row_item_grid" key={i}>
                      <div className="row_item_grid--item row_item_grid--item-20">
                        <AppText c={"red"} fz={12}>
                          <NumberFormatter
                            thousandSeparator
                            value={3422.52}
                          />
                        </AppText>
                      </div>
                      <div className="row_item_grid--item row_item_grid--item-40">
                        <AppText fz={12}>
                          <NumberFormatter
                            thousandSeparator
                            value={Math.random() * 100}
                          />
                        </AppText>
                      </div>
                      <div className="row_item_grid--item row_item_grid--item-40">
                        <AppText fz={12}>
                          <NumberFormatter
                            thousandSeparator
                            value={Math.random() * 100}
                          />
                        </AppText>
                      </div>
                    </div>
                  ))}
                </>
              ),
              value: "positions",
            },
          },
          {
            data: {
              label: "Recent Trades",
              value: "2",
            },
            tabsPanelProps: {
              children: <div></div>,
              value: "2",
            },
          },
        ]}
      />
    </>
  );
}
