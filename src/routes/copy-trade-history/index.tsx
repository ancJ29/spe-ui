import { useCopyTradeMode } from "@/hooks/useCopyTradeMode";
import { MasterOrders } from "@/ui/CopyTrade";

export default function Page() {
  const { type } = useCopyTradeMode();

  return type.isMaster ? <MasterOrders /> : <MasterOrders />;
}
