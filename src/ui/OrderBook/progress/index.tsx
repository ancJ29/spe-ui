import { Box } from "@mantine/core";
const transitions = [100, 300, 600, 400, 1000, 1200, 2000];
export function ProgressBarStatic({ isAsk }: { isAsk?: boolean }) {
  return (
    <>
      <Box
        h={"100%"}
        aria-level={
          transitions[Math.floor(Math.random() * transitions.length)]
        }
        className={`progress_bar progress_bar--static ${
          isAsk ? "isDown" : "isUp"
        }`}
        right={0}
        top={0}
        w={`${100}%`}
        pos={"absolute"}
      ></Box>
    </>
  );
}
