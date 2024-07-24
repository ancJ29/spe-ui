import useMetadata from "@/hooks/useMetadata";
import { Header } from "@/ui/Header";
import { Alert, Box, Button, Card, Container, Flex, Image, SimpleGrid, Space, Text, Title } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { Footer } from "../top-page";
import svgLogo from "@/assets/images/logo.svg";
import svgLogoLight from "@/assets/images/logo_light.svg";
import useTranslation from "@/hooks/useTranslation";
import undraw_business_deal_re_up4u from "@/assets/images/undraw_business_deal_re_up4u.svg";
import undraw_done_re_oak4 from "@/assets/images/undraw_done_re_oak4.svg";
import undraw_product_iteration_kjok from "@/assets/images/undraw_product_iteration_kjok.svg";

import partner_FSL from "@/assets/images/partners/light/FSL.png";
import partner_Isolation_Mode from "@/assets/images/partners/light/Isolation_Mode.png";
import partner_KSK from "@/assets/images/partners/light/KSK.png";
import partner_Layer_1 from "@/assets/images/partners/light/Layer_1.png";
import partner_Meteorite from "@/assets/images/partners/light/Meteorite.png";
import partner_Rectangle from "@/assets/images/partners/light/Rectangle.png";
import partner_bloomberg from "@/assets/images/partners/light/bloomberg.png";
import partner_intro_backer1 from "@/assets/images/partners/light/intro-backer-1.png";
import partner_intro_backer2 from "@/assets/images/partners/light/intro-backer-2.png";
import partner_katman_1 from "@/assets/images/partners/light/katman_1.png";
import partner_marketwatch from "@/assets/images/partners/light/marketwatch.png";

import AboutImage from "@/assets/images/partners/light/about-image.png";


export default function Page() {
  const location = useLocation();
  const { data } = useMetadata();
  const t = useTranslation();
  return (
    <>
      <Header metadata={data} />
      <Container>
        <Space my={"xl"} />
        <Box py={70}>
          <Flex justify={"center"}>
            <Image src={svgLogo} lightHidden />
            <Image src={svgLogoLight} darkHidden />
          </Flex>
          <Box mx={"auto"} maw={"70%"}>
            <Text ta={"center"}>
              {t("At OMTrade, we stand by a powerful belief: financial power and freedom should be within everyone's reach. By uniting traders, influencers, and everyday users, we've built a system that levels the playing field, turning the dream of winning big into an achievable reality.")}
            </Text>
          </Box>
        </Box>
      </Container>
      <Box
        mih={700}
        py={100}
        style={{
          background: `url(${AboutImage}) no-repeat 100% 0,linear-gradient(90deg,#f7b86c 0,#f18f14 95.7%)`
        }}
      >
        <Container>
          <SimpleGrid
            cols={2}
            styles={{
              root: {
                gap: "100px"
              }
            }}
          >
            <Text c={"white"}>
              {t("Our roots are in the unwavering belief in the potential of crypto. It’s a force for revolution, a pathway for anyone to carve out a better life in a world that often feels restrictive and lacking in opportunity. As a team of industry veterans and experienced FX traders, we recognized the intimidating and complex nature of getting started in this space.")}
            </Text>
            <Text c={"white"}>
              {t("Understanding that true empowerment through crypto demands breaking down entry barriers, we've made it our mission to simplify crypto investments through copy trading. Our aim is to make financial liberation accessible to everyone.")}
            </Text>
          </SimpleGrid>
          <Space my={60}/>
          <Title order={3} ta={"center"} c={"white"}>{t("Our Investors")}</Title>
          <Flex gap={40} my={50} align={"center"}>
            <Box component="a" href="https://fsl.com/" target="_blank">
              <Image src={partner_FSL} />
            </Box>
            <Box component="a" target="_blank" href="https://www.folius.ventures/">
              <Image src={partner_intro_backer2} />
            </Box>
            <Box component="a" target="_blank" href="https://www.incuba.capital/">
              <Image src={partner_intro_backer1} />
            </Box>
            <Box component="a" target="_blank" href="https://www.meteoritelab.net/">
              <Image src={partner_Meteorite} />
            </Box>
            <Box component="a" target="_blank" href="https://www.kskangel.com/">
              <Image src={partner_KSK} />
            </Box>
          </Flex>
          <Space my={70}/>
          <Title order={3} ta={"center"} c={"white"}>{t("As Featured in")}</Title>
          <SimpleGrid cols={3} my={"xl"}>
            <Flex align={"start"} component="a" target="_blank" href="https://www.bloomberg.com/press-releases/2023-11-17/omtrade-announces-seed-round-funding-led-by-stepn-s-find-satoshi-lab-folius-ventures-and-incuba-alpha" >
              <Image mx={"auto"} w={200} src={partner_bloomberg} />
            </Flex>
            <Flex align={"start"} component="a" target="_blank" href="https://finance.yahoo.com/news/omtrade-announces-seed-round-funding-180000122.html?guccounter=1">
              <Image mx={"auto"} w={200} src={partner_katman_1} />
            </Flex>
            <Flex align={"start"} component="a" target="_blank" href="https://www.morningstar.com/news/globe-newswire/8981598/omtrade-announces-seed-round-funding-led-by-stepns-find-satoshi-lab-folius-ventures-and-incuba-alpha">
              <Image mx={"auto"} w={200} src={partner_Layer_1} />
            </Flex>
            <Flex align={"end"} component="a" target="_blank" href="https://www.marketwatch.com/press-release/omtrade-announces-seed-round-funding-led-by-stepn-s-find-satoshi-lab-folius-ventures-and-incuba-alpha-8b042b3b?mod=search_headline">
              <Image mx={"auto"} w={200} src={partner_marketwatch} />
            </Flex>
            <Flex align={"end"} component="a" target="_blank" href="https://www.streetinsider.com/Globe+Newswire/OMTrade+Announces+Seed+Round+Funding+Led+by+STEPN%E2%80%99s+Find+Satoshi+Lab%2C+Folius+Ventures%2C+and+Incuba+Alpha/22430575.html">
              <Image mx={"auto"} w={200} src={partner_Rectangle} />
            </Flex>
            <Flex align={"end"} component="a" target="_blank" href="https://markets.businessinsider.com/news/stocks/omtrade-announces-seed-round-funding-led-by-stepn-s-find-satoshi-lab-folius-ventures-and-incuba-alpha-1032832450">
              <Image mx={"auto"} w={200} src={partner_Isolation_Mode} />
            </Flex>
          </SimpleGrid>
          <Space my={100}/>
          <Text c={"white"}>
            {t("OMTrade is the proud proprietor of a licensed Digital Currency Exchange (DCE) accredited by the Australian Transaction Reports and Analysis Centre (AUSTRAC), identified by registration number DCE100812987-001.")}
          </Text>
        </Container>
      </Box>
      <Container>
        <WhyCopyTradingSection />
        <Alert variant="light" color="primary">
          <Flex justify={"space-between"} align={"center"}>
            <Title order={3}>{t("Join us on this journey towards financial empowerment.")}</Title>
            <Button>{t("Register Now")}</Button>
          </Flex>
        </Alert>
      </Container>
      <Space my={"xl"} />

      {data && <Footer metadata={data} />}
    </>
  );
}

function WhyCopyTradingSection() {
  const t = useTranslation();
  return (
    <>
      <Card radius={"lg"} py={60}>
        <Title order={1} ta={"center"}>
          {t("Our Values")}
        </Title>
        <Space my={"md"} />
        <SimpleGrid cols={3}>
          <Box ta={"center"}>
            <Flex align={"center"} h={200}>
              <Image mx={"auto"} w={200} src={undraw_product_iteration_kjok} />
            </Flex>
            <Space my={"md"} />
            <Title order={2}>{t("Freedom")}</Title>
            <Space my={"md"} />
            <Text>
              {t("Crypto empowers everyday people an escape from oppressive systems and opening the door to economic freedom.")}
            </Text>
          </Box>
          <Box ta={"center"}>
            <Flex align={"center"} h={200}>
              <Image mx={"auto"} w={200} src={undraw_done_re_oak4} />
            </Flex>
            <Space my={"md"} />
            <Title order={2}>
              {t("Fairness")}
            </Title>
            <Space my={"md"} />
            <Text>
              {t("We advocate for an environment where everyone has an equal opportunity to strive for economic freedom and improve their lives.")}
            </Text>
          </Box>
          <Box ta={"center"}>
            <Flex align={"center"} h={200}>
              <Image mx={"auto"} w={200} src={undraw_business_deal_re_up4u} />
            </Flex>
            <Space my={"md"} />
            <Title order={2}>{t("Fulfillment")}</Title>
            <Space my={"md"} />
            <Text>
              {
                t("Investing shouldn't just be about numbers. It should be an accessible and exciting experience, satisfying in its potential.")
              }
            </Text>
          </Box>
        </SimpleGrid>
      </Card>
    </>
  );
}
