import { Avatar, Box, Flex, Pagination, Space } from "@mantine/core";
import AppText from "../Text/AppText";
import { IconSortUpDown } from "../IconSortUpDown/IconSortUpDown";
import AppPill from "../Pill/AppPill";
import AppButton from "../Button/AppButton";

export function GridMasterTraders() {
  const _items = [...Array(10)];
  return (
    <>
      <Box className="table-grid" w={"100%"}>
        <div
          className="table-grid-row header-click"
          style={{ border: "solid 1px" }}
        >
          <Box className="table-grid-cell">
            <AppText instancetype="withTheadSmall">Nickname</AppText>
          </Box>
          <Box className="table-grid-cell">
            <Flex align={"center"} gap={5}>
              <AppText instancetype="withTheadSmall">
                {"7d Master's PnL"}
              </AppText>
              <IconSortUpDown />
            </Flex>
          </Box>
          <Box className="table-grid-cell">
            <Flex align={"center"} gap={5}>
              <AppText instancetype="withTheadSmall">7d ROI</AppText>
              <IconSortUpDown />
            </Flex>
          </Box>
          <Box className="table-grid-cell">
            <Flex align={"center"} gap={5}>
              <AppText instancetype="withTheadSmall">
                {"7d Followers' PnL"}
              </AppText>
              <IconSortUpDown />
            </Flex>
          </Box>
          <Box className="table-grid-cell">
            <Flex align={"center"} gap={5}>
              <AppText instancetype="withTheadSmall">
                  7d Win Rate
              </AppText>
              <IconSortUpDown />
            </Flex>
          </Box>
          <Box className="table-grid-cell">
            <Flex align={"center"} gap={5}>
              <AppText instancetype="withTheadSmall">
                  Stability Index
              </AppText>
              <IconSortUpDown />
            </Flex>
          </Box>
          <Box className="table-grid-cell">
            <Flex align={"center"} gap={5}>
              <AppText instancetype="withTheadSmall">
                  Follower(s)
              </AppText>
              <IconSortUpDown />
            </Flex>
          </Box>
          <Box className="table-grid-cell">
            <AppText instancetype="withTheadSmall">Action</AppText>
          </Box>
        </div>
        {_items.map((_i, i) => (
          <div key={i} className="table-grid-row">
            <Box className="table-grid-cell">
              <Flex w={"100%"} gap={10}>
                <Avatar
                  size={48}
                  src={
                    "/images/6f03645d-a21a-40d1-97e2-90cbfef6ce98.jpg6"
                  }
                />
                <Box maw={280}>
                  <AppText instancetype="WithCellToken">
                      Pino89 {/* cspell:disable-line */}
                  </AppText>
                  <Flex gap={10}>
                    <AppPill instancetype="WithTagSmall">
                        Stable
                    </AppPill>
                    <AppPill instancetype="WithTagSmall">
                        Trading Bots
                    </AppPill>
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <Box className="table-grid-cell">
              <AppText instancetype="WidthPriceNormal">
                  +3.92%
              </AppText>
            </Box>
            <Box className="table-grid-cell">
              <AppText instancetype="WidthPriceNormal">
                  +43,160.26
              </AppText>
            </Box>
            <Box className="table-grid-cell">
              <AppText instancetype="WidthPriceNormal">
                  +21,477.87
              </AppText>
            </Box>
            <Box className="table-grid-cell">
              <AppText instancetype="WidthPriceNormal">
                  +66.97%
              </AppText>
            </Box>
            <Box className="table-grid-cell">
              <AppText instancetype="WidthPriceNormal">
                  5.0/5.0
              </AppText>
            </Box>
            <Box className="table-grid-cell">
              <AppText instancetype="WidthPriceNormal">256</AppText>
            </Box>
            <Box className="table-grid-cell">
              <AppButton
                variant="gradient"
                fullWidth
                size="sm"
                c={"dark"}
                gradient={{ from: "primary", to: "yellow", deg: 90 }}
              >
                  Copy
              </AppButton>
            </Box>
          </div>
        ))}
      </Box>
      <Space my={30} />
      <Flex justify={"center"} w={"100%"}>
        <Pagination total={10} />
      </Flex>
    </>
  );
}
