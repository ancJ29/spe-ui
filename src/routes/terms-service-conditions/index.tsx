import TermsServiceWrapper from "@/ui/TabsPolicy";
import { Box, Container, Space } from "@mantine/core";
import PdfViewer from "./PdfViewer";

export default function Page() {
  return (
    <>
      <Container>
        <Space my={"xl"} />
        <TermsServiceWrapper />
        <PdfViewer url="./docs/Terms_and_Conditions_en.pdf" />
        <Box hidden py={30} className="pdf-term">
          <p
            style={{
              paddingTop: "3pt",
              paddingLeft: "5pt",
              textIndent: "1pt",
              lineHeight: "156%",
              textAlign: "left",
            }}
          >
            These Terms and Conditions (the “Terms” or this
            “Agreement”) govern the use of the electronic trading
            platform, including any website or mobile application (the
            “App”, together with the website, the “Site”) for
            accessing the platform, and any services provided through
            the platform (collectively, the “Platform”) provided by
            OMcrypto Fintech Limited (the “Company”, “we”, “us” or
            “our”). The Terms form a binding agreement between the
            Company and you, as an individual user (“you”,
          </p>
          <p
            style={{
              paddingLeft: "7pt",
              textIndent: "-1pt",
              lineHeight: "156%",
              textAlign: "left",
            }}
          >
            “your” or “User”) for your individual usage of the App and
            Platform. By registering for and downloading the App and
            using the Platform, you confirm your acceptance of this
            Agreement and our associated Privacy Policy. If you do not
            agree to these Terms, you must immediately uninstall the
            App and cease using the App and the Platform.
          </p>
          <p
            style={{
              paddingTop: "4pt",
              textIndent: "0pt",
              textAlign: "left",
            }}
          >
            <br />
          </p>
          <p
            style={{
              paddingLeft: "7pt",
              textIndent: "0pt",
              lineHeight: "157%",
              textAlign: "left",
            }}
          >
            Securities Disclaimer: No material or any other
            information which may be made available on the Site or
            Platform shall constitute or be construed as a
            recommendation, endorsement, offer, invitation or
            solicitation to enter into any transaction with or
            purchase any product, or otherwise deal with securities,
            crypto assets or other products. You further understand
            that none of the information providers, including any
            Third-Party Providers (as defined below) are advising you
            personally concerning the nature, potential, value or
            suitability of any particular security or crypto asset,
            portfolio of securities or crypto assets, transaction,
            investment strategy or other matter, and any information
            provided is not tailored to the investment needs of any
            specific person. You understand that an investment in any
            security or crypto asset is subject to a number of risks,
            and
          </p>
          <p
            style={{
              paddingLeft: "7pt",
              textIndent: "0pt",
              lineHeight: "157%",
              textAlign: "left",
            }}
          >
            that discussions of any security or crypto asset published
            on the Site or Platform may not contain a list or
            description of relevant risk factors. Please note that
            markets change continuously, so any information, content,
            Third-Party Content (as defined below) or other material
            provided on or through the Site or Platform may not be
            complete or current, or may be superseded by more current
            information. You rely on such information at your own
            risk.
          </p>
          <p
            style={{
              paddingTop: "3pt",
              textIndent: "0pt",
              textAlign: "left",
            }}
          >
            <br />
          </p>
          <p
            style={{
              paddingLeft: "7pt",
              textIndent: "0pt",
              lineHeight: "157%",
              textAlign: "left",
            }}
          >
            No Professional or Investment Advice. Our Site and
            Platform are not intended to provide tax, legal, insurance
            or investment advice, and nothing on the Site or Platform
            should be construed as an offer to sell, a solicitation of
            an offer to buy, or a recommendation for any security or
            crypto
          </p>
          <p
            style={{
              paddingLeft: "7pt",
              textIndent: "0pt",
              lineHeight: "157%",
              textAlign: "left",
            }}
          >
            asset by the Company. You alone are solely responsible for
            determining whether any investment, security or strategy,
            or any other product or service, is appropriate or
            suitable for you based on your
          </p>
          <p
            style={{
              paddingLeft: "7pt",
              textIndent: "0pt",
              lineHeight: "113%",
              textAlign: "left",
            }}
          >
            investment objectives and personal and financial
            situation. You should consult an attorney or tax
            professional regarding your specific legal or tax
            situation.
          </p>
          <p style={{ textIndent: "0pt", textAlign: "left" }}>
            <br />
          </p>
          <ol id="l1">
            <li data-list-text={1}>
              <p
                className="s1"
                style={{
                  paddingLeft: "25pt",
                  textIndent: "-16pt",
                  textAlign: "left",
                }}
              >
                Definitions
              </p>
              <ol id="l2">
                <li data-list-text="1.1">
                  <p
                    style={{
                      paddingTop: "18pt",
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "154%",
                      textAlign: "left",
                    }}
                  >
                    Unless otherwise defined or the context otherwise
                    requires, all capitalized terms shall have the
                    meaning given to them in these Terms:
                  </p>
                  <ol id="l3">
                    <li data-list-text="(a)">
                      <p
                        style={{
                          paddingTop: "3pt",
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "154%",
                          textAlign: "left",
                        }}
                      >
                        “Account” means the account established by a
                        User that has downloaded the App or accessed
                        the Site and registered with the Company to
                        use the Site and the Platform.
                      </p>
                    </li>
                    <li data-list-text="(b)">
                      <p
                        style={{
                          paddingTop: "9pt",
                          paddingLeft: "23pt",
                          textIndent: "-16pt",
                          textAlign: "left",
                        }}
                      >
                        “App” means the mobile application provided by
                        the Company to access the Platform.
                      </p>
                      <p
                        style={{
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(c)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "138%",
                          textAlign: "left",
                        }}
                      >
                        “Authorized Individual” means any person that
                        is authorized to access and use the Site
                        (including the App) and Platform on behalf of
                        a User.
                      </p>
                      <p
                        style={{
                          paddingTop: "8pt",
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(d)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "161%",
                          textAlign: "left",
                        }}
                      >
                        “Biometric Authentication” means the identity
                        authentication function using biometric
                        credentials including fingerprint, facial
                        recognition or any other biometric data, as we
                        may permit from time to time.
                      </p>
                    </li>
                    <li data-list-text="(e)">
                      <p
                        style={{
                          paddingTop: "7pt",
                          paddingLeft: "20pt",
                          textIndent: "-12pt",
                          textAlign: "left",
                        }}
                      >
                        “Digital Assets” means Bitcoin, Ether, or
                        other crypto or digital assets or currencies.
                      </p>
                      <p
                        style={{
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(f)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "155%",
                          textAlign: "left",
                        }}
                      >
                        “Digital Platforms” refers to third-party
                        distribution platforms where mobile
                        applications or other software programs can be
                        accessed or downloaded, including, but not
                        limited to, the Apple App Store and Google
                        Play.
                      </p>
                    </li>
                    <li data-list-text="(g)">
                      <p
                        style={{
                          paddingTop: "9pt",
                          paddingLeft: "20pt",
                          textIndent: "-12pt",
                          textAlign: "left",
                        }}
                      >
                        “Governmental Authority” mean any nation or
                        government or any province or state or any
                      </p>
                      <p
                        style={{
                          paddingTop: "1pt",
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                      <p
                        style={{
                          paddingLeft: "6pt",
                          textIndent: "0pt",
                          lineHeight: "156%",
                          textAlign: "left",
                        }}
                      >
                        other political subdivision thereof, or any
                        entity, authority or body exercising
                        executive, legislative, judicial, regulatory
                        or administrative functions of or pertaining
                        to government, including any government
                        authority, agency, department, board,
                        commission or instrumentality or any political
                        subdivision thereof, any court, tribunal or
                        arbitrator, and any self-regulatory
                        organization.
                      </p>
                      <p
                        style={{
                          paddingTop: "4pt",
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(h)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "154%",
                          textAlign: "left",
                        }}
                      >
                        “Material” means any offering material, term
                        sheet, market data, research report, product
                        or service documentation or any other
                        information provided through the Platform.
                      </p>
                      <p
                        style={{
                          paddingTop: "4pt",
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(i)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "154%",
                          textAlign: "left",
                        }}
                      >
                        “Personal Information” refers to information
                        supplied by a User from which the identity of
                        such User may be directly or indirectly
                        ascertained.
                      </p>
                      <p
                        style={{
                          paddingTop: "4pt",
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(j)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "153%",
                          textAlign: "left",
                        }}
                      >
                        “Privacy Policy” means the additional terms
                        and conditions governing the collection, use
                        and disclosure of each User’s Personal
                        Information, as set out in our Privacy Policy.
                      </p>
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        Each User must read and agree to the Privacy
                        Policy in order to use the App or the Site
                      </p>
                      <p
                        style={{
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(k)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "156%",
                          textAlign: "left",
                        }}
                      >
                        “Service Notifications” are one-way
                        notifications from the Company (which may
                        include security-related notifications) via
                        text message or emails and, where applicable,
                        push notifications through the Site. These
                        notifications are sent to the User in respect
                        of certain information or events relating to
                        an account to which an User has access through
                        the Platform.
                      </p>
                    </li>
                    <li data-list-text="(l)">
                      <p
                        style={{
                          paddingTop: "3pt",
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "150%",
                          textAlign: "left",
                        }}
                      >
                        “Third-Party Financial Services Provider” is
                        any third party that offers a trading,
                        fiat-crypto exchange or other financial
                        services account that can be registered and
                        accessed through the Platform.
                      </p>
                      <p
                        style={{
                          paddingTop: "5pt",
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(m)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "146%",
                          textAlign: "left",
                        }}
                      >
                        “Third Party Account” means a separate
                        financial services account that a User
                        establishes with a Third-Party Services
                        Provider to conduct transactions.
                      </p>
                      <p
                        style={{
                          paddingTop: "6pt",
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(n)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "154%",
                          textAlign: "left",
                        }}
                      >
                        “User” means any person that has registered
                        with the Company to use the Site and access
                        the Platform and any Authorized Individual
                        acting on their behalf.
                      </p>
                      <p
                        style={{
                          paddingTop: "4pt",
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(o)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "157%",
                          textAlign: "left",
                        }}
                      >
                        “User Identification Policy” means the
                        know-your-client policy and procedures adopted
                        by the Company from time to time regarding the
                        User’s access to the Platform.
                      </p>
                      <p
                        style={{
                          paddingTop: "3pt",
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(p)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "156%",
                          textAlign: "left",
                        }}
                      >
                        “User Credentials” means the set of user
                        identification, password, personal
                        identification number, token and any other
                        information or device provided to an User to
                        access the Platform.
                      </p>
                    </li>
                  </ol>
                  <p
                    style={{
                      paddingTop: "3pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
              </ol>
            </li>
            <li data-list-text={2}>
              <p
                className="s1"
                style={{
                  paddingLeft: "25pt",
                  textIndent: "-17pt",
                  textAlign: "left",
                }}
              >
                Changes
              </p>
              <ol id="l4">
                <li data-list-text={2}>
                  <p
                    style={{
                      paddingTop: "18pt",
                      paddingLeft: "15pt",
                      textIndent: "-8pt",
                      textAlign: "left",
                    }}
                  >
                    Changes 2.1 We reserve the right at any time to:
                  </p>
                  <p
                    style={{
                      paddingTop: "10pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                  <ol id="l5">
                    <li data-list-text="(a)">
                      <p
                        style={{
                          paddingLeft: "20pt",
                          textIndent: "-12pt",
                          textAlign: "left",
                        }}
                      >
                        modify, update or change the terms and
                        conditions of this Agreement or our Privacy
                        Policy
                      </p>
                      <p
                        style={{
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(b)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "158%",
                          textAlign: "left",
                        }}
                      >
                        modify, update, or change the Site and
                        Platform, including eliminating or
                        discontinuing any content or feature of the
                        Site or Platform; or
                      </p>
                      <p
                        style={{
                          paddingTop: "3pt",
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(c)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "157%",
                          textAlign: "left",
                        }}
                      >
                        impose fees, charges or other conditions for
                        use of the Platform or parts thereof (with
                        reasonable notice) (all of the foregoing
                        referred to as “Changes”).
                      </p>
                    </li>
                  </ol>
                </li>
              </ol>
              <p
                style={{
                  paddingTop: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "156%",
                  textAlign: "left",
                }}
              >
                2.2 We may make such Changes at any time without prior
                notice (except as noted in subsection (c) above). Any
                Changes to this Agreement may be posted on our website
                or notified to you through push notifications through
                the Site or an email to the email address in your
                Account. For this reason, you should check our website
                regularly, allow the Site to receive such push
                notifications, and keep your email address and other
                contact information up to date in the Account. You
                accept any Changes if you continue to use the Site and
                Platform after such Changes are effected.
              </p>
            </li>
            <li data-list-text={3}>
              <p
                className="s1"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "25pt",
                  textIndent: "-17pt",
                  textAlign: "left",
                }}
              >
                Digital Platform Terms
              </p>
              <p
                style={{
                  paddingTop: "1pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <ol id="l6">
                <li data-list-text="3.1">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "156%",
                      textAlign: "left",
                    }}
                  >
                    The App may be available for download from one or
                    more Digital Platforms. Your download,
                    installation, access to or use of the App is also
                    bound by the terms and conditions and privacy
                    policies of the applicable Digital Platform (the
                    “Digital Platform Terms”). If there is any
                    conflict between these Terms and the Digital
                    Platform Terms, then these Terms will prevail.
                  </p>
                  <p
                    style={{
                      paddingTop: "3pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
                <li data-list-text="3.2">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "156%",
                      textAlign: "left",
                    }}
                  >
                    The App is independent of and is not associated,
                    affiliated, sponsored, endorsed or in any way
                    linked to any Digital Platform. You and we
                    acknowledge that this Agreement is entered into
                    between you and us only, and not with any Digital
                    Platform, and we, not the Digital Platform, are
                    solely responsible for the App and the content
                    thereof to the extent specified in this Agreement.
                  </p>
                  <p
                    style={{
                      paddingTop: "4pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
                <li data-list-text="3.3">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "156%",
                      textAlign: "left",
                    }}
                  >
                    You and we acknowledge and agree that the relevant
                    Digital Platform, and that Digital Platform’s
                    subsidiaries, are third-party beneficiaries of
                    these Terms, and that, upon your acceptance of
                    these Terms, that Digital Platform will have the
                    right (and will be deemed to have accepted the
                    right) to enforce these Terms against you as a
                    third-party beneficiary thereof.
                  </p>
                  <p
                    style={{
                      paddingTop: "2pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
              </ol>
            </li>
            <li data-list-text={4}>
              <p
                className="s1"
                style={{
                  paddingLeft: "26pt",
                  textIndent: "-18pt",
                  textAlign: "left",
                }}
              >
                Network Device and Carrier Requirements
              </p>
              <ol id="l7">
                <li data-list-text="4.1">
                  <p
                    style={{
                      paddingTop: "20pt",
                      paddingLeft: "22pt",
                      textIndent: "-15pt",
                      textAlign: "left",
                    }}
                  >
                    You acknowledge that your agreement with your
                    mobile and Internet network provider (the
                  </p>
                  <p style={{ textIndent: "0pt", textAlign: "left" }}>
                    <br />
                  </p>
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "-1pt",
                      lineHeight: "156%",
                      textAlign: "left",
                    }}
                  >
                    “Network Provider”) will apply to your use of the
                    Site. You acknowledge that you may be charged by
                    your Network Provider for data services while
                    using certain features of the Site or any other
                    third- party charges as may arise and you accept
                    sole responsibility for such charges. If you are
                    not the bill payer for the mobile/Internet device
                    being used to access the Site, you will be assumed
                    to have received permission from the bill payer
                    for using the Site. You must also
                  </p>
                  <p
                    style={{
                      paddingTop: "1pt",
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "154%",
                      textAlign: "left",
                    }}
                  >
                    ensure that your use of the Site is not in
                    violation of your mobile or Internet device
                    agreement or any wireless data service agreement.
                  </p>
                  <p
                    style={{
                      paddingTop: "2pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
              </ol>
            </li>
            <li data-list-text={5}>
              <p
                className="s1"
                style={{
                  paddingLeft: "25pt",
                  textIndent: "-18pt",
                  textAlign: "left",
                }}
              >
                Eligibility and Registration
              </p>
              <p
                style={{
                  paddingTop: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <ol id="l8">
                <li data-list-text="5.1">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "156%",
                      textAlign: "left",
                    }}
                  >
                    You must be at least 18 years of age to access and
                    use the Site and Platform. You further affirm that
                    you are fully able and competent to enter into the
                    terms, conditions, obligations, affirmations,
                    representations, and warranties set forth in these
                    Terms, and to abide by and comply with these
                    Terms. You must register with the Company to use
                    the Site and the Platform; you agree to provide
                    complete and accurate information when registering
                    to use the Site and the Platform, and to keep that
                    information updated.
                  </p>
                </li>
                <li data-list-text="5.2">
                  <p
                    style={{
                      paddingTop: "3pt",
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "154%",
                      textAlign: "left",
                    }}
                  >
                    We have the sole discretion to accept or reject
                    your registration with the Platform. Only Users
                    whose registration are approved by us will be our
                    customers.
                  </p>
                  <p
                    style={{
                      paddingTop: "2pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
              </ol>
            </li>
            <li data-list-text={6}>
              <p
                className="s1"
                style={{
                  paddingLeft: "25pt",
                  textIndent: "-18pt",
                  textAlign: "left",
                }}
              >
                Intellectual Property
              </p>
            </li>
          </ol>
          <p
            style={{
              paddingTop: "3pt",
              textIndent: "0pt",
              textAlign: "left",
            }}
          >
            <br />
          </p>
          <ol id="l9">
            <li data-list-text={6}>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "157%",
                  textAlign: "left",
                }}
              >
                1All title, ownership rights and intellectual property
                rights in or relating to the Site and Platform, any
                information transmitted by, to or over the Platform
                and information regarding use of the Platform will
                remain with the Company or its licensors. Nothing on
                the Platform will be construed as conferring on any
                User any license, save as expressly set out herein, of
                any of the Company’s
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "158%",
                  textAlign: "left",
                }}
              >
                or any third party’s title, ownership rights and/or
                intellectual property rights, whether by estoppel,
                implication or otherwise.
              </p>
              <ol id="l10">
                <li data-list-text="6.2">
                  <p
                    style={{
                      paddingTop: "9pt",
                      paddingLeft: "22pt",
                      textIndent: "-14pt",
                      textAlign: "left",
                    }}
                  >
                    The Platform and App may provide you access to
                    content, information, quote, videos, photos
                  </p>
                  <p style={{ textIndent: "0pt", textAlign: "left" }}>
                    <br />
                  </p>
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "159%",
                      textAlign: "left",
                    }}
                  >
                    or other materials (the “Third-Party Content”)
                    supplied by certain third parties (the
                    “Third-Party Content Providers”). The Company does
                    not endorse or recommend, and is not responsible
                    for verifying the accuracy, validity or
                    completeness of any Third-Party Content provided
                    through the Site or Platform. Your use or reliance
                    on such Third-Party Content is at your sole risk.
                    All title, ownership rights and intellectual
                    property rights in or relating to the Third-Party
                    Content will remain with the applicable
                    Third-Party Content Provider. Nothing on the
                    Platform will be construed as conferring on any
                    User any license, save as expressly set out
                    herein, of any Third- Party Content Provider’s
                    title, ownership rights and/or intellectual
                    property rights, whether by estoppel, implication
                    or otherwise.
                  </p>
                  <p
                    style={{
                      paddingTop: "2pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
                <li data-list-text="6.3">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "156%",
                      textAlign: "left",
                    }}
                  >
                    Provided you are in compliance with these Terms,
                    you can download and access the Site on a single
                    mobile device and access the Platform using
                    properly issued User Credentials. All other rights
                    in the Site are reserved by the Company. In the
                    event of your breach of these Terms, we will be
                    entitled to terminate your use and access to the
                    Site and Platform immediately.
                  </p>
                </li>
                <li data-list-text="6.4">
                  <p
                    style={{
                      paddingTop: "9pt",
                      paddingLeft: "21pt",
                      textIndent: "-14pt",
                      textAlign: "left",
                    }}
                  >
                    You agree not to:
                  </p>
                  <p style={{ textIndent: "0pt", textAlign: "left" }}>
                    <br />
                  </p>
                  <ol id="l11">
                    <li data-list-text="(a)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "157%",
                          textAlign: "left",
                        }}
                      >
                        modify, adapt, reproduce, translate or create
                        derivative works of the Site or Platform, or
                        any data or content (including the Third-Party
                        Content) provided through the Site or
                        Platform, or any portion thereof, or attempt
                        to reverse engineer, decompile, disassemble or
                        otherwise attempt to discover the source code
                        of the Site or Platform;
                      </p>
                      <p
                        style={{
                          paddingTop: "3pt",
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(b)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "158%",
                          textAlign: "left",
                        }}
                      >
                        remove any copyright notice, trademark,
                        legend, logo or product identification from
                        the Site or Platform;
                      </p>
                    </li>
                    <li data-list-text="(c)">
                      <p
                        style={{
                          paddingTop: "4pt",
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "147%",
                          textAlign: "left",
                        }}
                      >
                        misrepresent the other sites as the Company’s
                        Site by co-opting the visual “look and feel”
                        of or text from the Company’s Site or
                        otherwise violate the Company’s intellectual
                        property rights, including, without
                        limitation, “scraping” text or images from the
                        Company’s Site or the Company managed banners
                        and/or text links, search marketing or all
                        other online and offline campaigns,
                      </p>
                      <p
                        style={{
                          paddingTop: "8pt",
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(d)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "144%",
                          textAlign: "left",
                        }}
                      >
                        edit, modify, filter, truncate or change the
                        order of the information contained in any part
                        of the Company’s Sites, or remove, obscure, or
                        minimize any part of the Company’s Site in any
                        way without authorization of the Company; or
                      </p>
                      <p
                        style={{
                          paddingTop: "7pt",
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(e)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "154%",
                          textAlign: "left",
                        }}
                      >
                        make any commercial use of the Site or
                        Platform or the Company’s logo, trademark or
                        brand name in any way.
                      </p>
                    </li>
                  </ol>
                  <p
                    style={{
                      paddingTop: "4pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
                <li data-list-text="6.5">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "160%",
                      textAlign: "left",
                    }}
                  >
                    Each User authorizes the Company to use any
                    information or content provided by the User or
                    processed in connection with the use of the Site
                    and Platform (e.g. Personal Information,
                    geographic information, device information) in the
                    context and for the purpose of providing services
                    or products on the Platform and the secure use of
                    the Site and the Platform.
                  </p>
                  <p
                    style={{
                      paddingTop: "3pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
              </ol>
            </li>
            <li data-list-text={7}>
              <p
                className="s1"
                style={{
                  paddingLeft: "24pt",
                  textIndent: "-17pt",
                  textAlign: "left",
                }}
              >
                Account
              </p>
              <ol id="l12">
                <ol id="l13">
                  <li data-list-text="7.1">
                    <p
                      style={{
                        paddingTop: "17pt",
                        paddingLeft: "22pt",
                        textIndent: "-15pt",
                        textAlign: "left",
                      }}
                    >
                      In order to use the services on the Platform,
                      you must create an account with the Platform
                    </p>
                    <p
                      style={{
                        paddingTop: "1pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      (the “Account”). The Account will be used to
                      record various Digital Assets transferred by you
                      onto the Platform and conduct transactions on
                      the Platform. The Account may be registered by
                      any individual who is over 18 years old or an
                      institution by its duly authorized
                      representatives, provided such individual and
                      institution have read and understand the Risk
                      Disclosure
                    </p>
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "159%",
                        textAlign: "left",
                      }}
                    >
                      Statements , which is incorporated by reference
                      into, and shall be a part of this Agreement.
                      Each User shall only register one trading
                      Account on the Platform. Registration of
                      multiple trading Accounts would be a violation
                      of these Terms and may lead to immediate
                      termination of these Terms and the Accounts
                      involved.
                    </p>
                  </li>
                  <li data-list-text="7.2">
                    <p
                      style={{
                        paddingTop: "7pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      The Account is not a bank account and the
                      Digital Assets held in the Account are not
                      deposits or other financial products. Except as
                      otherwise permitted by the Platform, no interest
                      will be paid
                    </p>
                    <p
                      style={{
                        paddingTop: "6pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "156%",
                        textAlign: "left",
                      }}
                    >
                      on any funds or Digital Assets under your
                      Account, and all Digital Assets that are
                      directly held by us for your benefit are not
                      insured by any Governmental Authority.
                    </p>
                    <p
                      style={{
                        paddingTop: "4pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="7.3">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "156%",
                        textAlign: "left",
                      }}
                    >
                      You may fund the Account by transferring Digital
                      Assets from your accounts with third parties
                      into the Account. No fees are charged by the
                      Platform for funding the Account; however, third
                      parties, such as your bank, may charge
                      transaction and other fees. The Digital Assets
                      will be transferred to the Platform’s address
                      for omnibus user account. The Platform will then
                      credit your Account with such amount of Digital
                      Assets on the Platform’s ledger.
                    </p>
                  </li>
                  <li data-list-text="7.4">
                    <p
                      style={{
                        paddingTop: "3pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "155%",
                        textAlign: "left",
                      }}
                    >
                      You may withdraw all or some of the Digital
                      Assets under your name recorded on the
                      Platform’s ledger. There is no minimum amount of
                      Digital Assets required to maintain your status
                      as a User.
                    </p>
                  </li>
                </ol>
              </ol>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Digital assets will be transferred from the omnibus
                user account held by the Platform
              </p>
              <p
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "154%",
                  textAlign: "left",
                }}
              >
                to the specific Digital Assets address provided by
                you. Withdrawals may take up to three (3) days to
                complete, provided that larger withdrawals may take up
                to thirty (30) days to complete and that any
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "113%",
                  textAlign: "left",
                }}
              >
                withdrawal may be delayed as necessary to comply with
                Applicable Law and/or the Platform’s User
                Identification Policy.
              </p>
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </li>
            <li data-list-text={8}>
              <p
                className="s1"
                style={{
                  paddingLeft: "24pt",
                  textIndent: "-16pt",
                  textAlign: "left",
                }}
              >
                Trading
              </p>
              <p
                style={{
                  paddingTop: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "155%",
                  textAlign: "left",
                }}
              >
                8.1The Platform is a marketplace that allows you to
                place orders and facilitates the order matching and
                settlement of the purchase or sale of Digital Assets
                or its derivatives with other Users. The Platform
                simply matches purchase and sale orders put forth by
                Users and assists
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "112%",
                  textAlign: "left",
                }}
              >
                Users with carrying out their intent as expressed via
                the orders. Except as expressly specified otherwise in
                this Agreement, neither the Company nor the Platform
                is acting as a principle in or
              </p>
              <p
                style={{
                  paddingTop: "10pt",
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "153%",
                  textAlign: "left",
                }}
              >
                other participants in those transactions. Neither the
                Company nor the Platform is responsible for any
                disputes among or between Users regarding any
                transaction.
              </p>
              <p
                style={{
                  paddingTop: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "156%",
                  textAlign: "justify",
                }}
              >
                8 . 2 Matching Orders are automatically paired by the
                Platform through its proprietary software and models,
                and the Platform will notify the respective Users that
                the order has been executed. Once a match is made, the
                order is executed and cleared instantaneously. YOU
                SHOULD ONLY PLACE AN ORDER IF YOU FULLY INTEND TO
                COMPLETE THE TRANSACTION. You have the right to
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "157%",
                  textAlign: "left",
                }}
              >
                stop a preauthorized order by initiating procedures
                through your Account to effectuate closure of such
                open order.
              </p>
              <p
                style={{
                  paddingTop: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <ol id="l14">
                <ol id="l15">
                  <li data-list-text="8.3">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "159%",
                        textAlign: "left",
                      }}
                    >
                      Unless otherwise permitted by the Platform, you
                      may only sell such amount of Digital Assets as
                      does not exceed the total amount of Digital
                      Assets held in your Account and recorded in the
                      Platform ledger, plus the applicable Transaction
                      Fee (as defined below). Any attempt by you to
                      sell more Digital Assets than the Platform
                      records show exists in your Account after
                      deduction of the applicable Transaction Fee will
                      result in an unsuccessful trade and may be
                      grounds for termination of the Account.
                    </p>
                  </li>
                  <li data-list-text="8.4">
                    <p
                      style={{
                        paddingTop: "7pt",
                        paddingLeft: "22pt",
                        textIndent: "-15pt",
                        textAlign: "left",
                      }}
                    >
                      You acknowledge that you may not be possible in
                      all circumstances to cancel or modify an
                    </p>
                    <p
                      style={{
                        paddingTop: "1pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "154%",
                        textAlign: "left",
                      }}
                    >
                      order, even before the order is matched or
                      executed. We accept no responsibility for
                      ensuring that an order is modified or canceled
                      and you understand and agree that, if the order
                      cannot be
                    </p>
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "134%",
                        textAlign: "left",
                      }}
                    >
                      canceled or modified, you are bound by any
                      execution of the original order. You further
                      acknowledge that attempts to modify or cancel
                      and replace an order may result in
                      over-execution or the execution of duplicate
                      orders, and you shall be responsible for all
                      such executions.
                    </p>
                  </li>
                  <li data-list-text="8.5">
                    <p
                      style={{
                        paddingTop: "3pt",
                        paddingLeft: "25pt",
                        textIndent: "-18pt",
                        textAlign: "left",
                      }}
                    >
                      You shall be deemed to have given orders through
                      the Platform when we acknowledge such
                    </p>
                    <p
                      style={{
                        paddingTop: "1pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      orders through the Platform or by such other
                      means as we may determine (whether or not you
                      actually receive or become aware of such
                      acknowledgment). You understand that the
                      Platform provides the ability to show the
                      real-time status of all of your open orders and
                      pending instructions. You further understand
                      that it is your responsibility to monitor your
                      open orders and pending instructions in
                      real-time until the Platform acknowledges the
                      full execution, cancellation
                    </p>
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      or rejection of the orders or instructions and
                      that we assume no responsibility or liability if
                      you fail to do so. In the event that you fail to
                      immediately notify us of any error in the
                      real-time acknowledgment of the status of any of
                      your open orders or pending instructions,
                      including the Platform’s failure to promptly
                      acknowledge the receipt of an order after you
                      transmit such order, we reserve the right to
                      exercise in good faith discretion to require you
                      to accept the trade or to remove the trade from
                      your Account at your sole benefit or loss. We
                      may, in some cases, and at
                    </p>
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "153%",
                        textAlign: "left",
                      }}
                    >
                      our sole discretion, require secondary
                      electronic, verbal, written or other
                      confirmation before acting if your Account
                      activity is outside of its normal range of
                      activities.
                    </p>
                    <p
                      style={{
                        paddingTop: "4pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="8.6">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "156%",
                        textAlign: "left",
                      }}
                    >
                      Your orders shall be subject to trading limits
                      that we may establish, revise and communicate to
                      you from time to time.
                    </p>
                    <p
                      style={{
                        paddingTop: "3pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="8.7">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "164%",
                        textAlign: "left",
                      }}
                    >
                      Subject to Section 8.10, once an order has been
                      executed, the transaction may not be reversible.
                    </p>
                    <p
                      style={{
                        paddingTop: "2pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="8.8">
                    <p
                      style={{
                        paddingLeft: "22pt",
                        textIndent: "-15pt",
                        textAlign: "left",
                      }}
                    >
                      You acknowledge that, due to technical and other
                      restrictions, the price of Digital Assets
                    </p>
                    <p
                      style={{
                        paddingTop: "6pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "133%",
                        textAlign: "left",
                      }}
                    >
                      displayed on the Site may be delayed and
                      therefore not reflect the current, live market
                      value of such digital asset. Nonetheless, you
                      agree that the prices displayed on the Site
                      control the value of your Account and your use
                      of the Platform and Site.
                    </p>
                    <p
                      style={{ textIndent: "0pt", textAlign: "left" }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="8.9">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      You acknowledge and agree that the Platform
                      cannot and does not warrant or guarantee that
                      any Order placed through the Platform will be
                      executed at the best posted price.
                    </p>
                  </li>
                </ol>
              </ol>
              <ol id="l16">
                <li data-list-text={8}>
                  <p
                    style={{
                      paddingTop: "9pt",
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "166%",
                      textAlign: "left",
                    }}
                  >
                    10Absent mutual consent of parties involved, we
                    reserve the right to cancel or nullify trades in
                    the event that:
                  </p>
                  <p
                    style={{
                      paddingTop: "7pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                  <ol id="l17">
                    <li data-list-text="(a)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "154%",
                          textAlign: "left",
                        }}
                      >
                        the trade resulted from an identifiable
                        interruption or malfunction of execution,
                        settlement or communication system;
                      </p>
                      <p
                        style={{
                          paddingTop: "4pt",
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(b)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "155%",
                          textAlign: "left",
                        }}
                      >
                        the trade that the Company, in its sole
                        discretion, believes to be fraudulent,
                        manipulative or disruptive to other Users or
                        the Platform;
                      </p>
                    </li>
                    <li data-list-text="(c)">
                      <p
                        style={{
                          paddingTop: "3pt",
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "146%",
                          textAlign: "left",
                        }}
                      >
                        the trade was executed by any Account that has
                        been hacked by unauthorized users and we
                        determine in good faith that cancellation of
                        the trades shall be in the best interest of
                        Users or the Platform; or
                      </p>
                      <p
                        style={{
                          paddingTop: "7pt",
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(d)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "147%",
                          textAlign: "left",
                        }}
                      >
                        the Company believes in its sole discretion
                        that your Account or trading activities
                        therein violates these Terms.
                      </p>
                      <p
                        style={{
                          paddingTop: "5pt",
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
            <li data-list-text={9}>
              <p
                className="s1"
                style={{
                  paddingLeft: "25pt",
                  textIndent: "-17pt",
                  textAlign: "left",
                }}
              >
                Third-Party Accounts
              </p>
              <p
                style={{
                  paddingTop: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <ol id="l18">
                <ol id="l19">
                  <li data-list-text="9.1">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "156%",
                        textAlign: "left",
                      }}
                    >
                      You may be offered the ability to register and
                      establish a Third-Party Account with a Third-
                      Party Services Provider. Such Third-Party
                      Account shall be subject to terms and conditions
                      and policies established by Third-Party Services
                      Provider for such Third-Party Account
                      (“Third-Party Services Provider Terms”).
                    </p>
                    <p
                      style={{
                        paddingTop: "4pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="9.2">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "155%",
                        textAlign: "left",
                      }}
                    >
                      You should read the Third-Party Services
                      Provider Terms carefully before opening a Third-
                      Party Account with such Third-Party Services
                      Provider. If you do not agree to the Third-Party
                      Services Provider Terms, you should not register
                      and open the Third-Party Account with it. All
                    </p>
                  </li>
                </ol>
              </ol>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "113%",
                  textAlign: "left",
                }}
              >
                trades and other transactions conducted through the
                Third-Party Account will be subject to the Third-Party
                Services Provider Terms. In addition, you understand
                and agree that:
              </p>
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
              <ol id="l20">
                <li data-list-text="(a)">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "156%",
                      textAlign: "left",
                    }}
                  >
                    The Company will act solely as the platform
                    administrator and service provider for the Third-
                    Party Service Provider in terms of the Third-Party
                    Accounts. As such, the Company may collect your
                    Personal Information and other information on
                    behalf of the Third-Party Services Provider in the
                    process of opening the Third-Party Account and
                    providing the Platform for transactions conducted
                    through the Third-Party Account. Such Personal
                    Information will be processed by the Company in
                    accordance with its Privacy Policy and will be
                    shared with the Third-Party Services Provider,
                    which will process such Personal Information in
                    accordance with its own privacy policy.
                  </p>
                  <p
                    style={{
                      paddingTop: "4pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
                <li data-list-text="(b)">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "157%",
                      textAlign: "left",
                    }}
                  >
                    The Company is not offering such Third-Party
                    Account to you and has no responsibility or
                    liability for such Third-Party Account or any
                    transactions conducted through the Third-Party
                    Account, or for any acts or omissions of the
                    Third-Party Services Provider with respect to the
                    Third-Party Accounts, Third-Party Services
                    Provider Terms, or their processing of your
                    Personal Information. The Company shall not be
                    responsible for the transactions conducted by you
                    or your Authorized Individuals with respect to
                    your Third-Party Account. All inquiries and
                    questions regarding the trading activities or
                    other services with respect to the Third-Party
                    Accounts that you submit to us will be directed by
                    the Company to Third-Party Services Provider.
                  </p>
                </li>
              </ol>
            </li>
            <li data-list-text={10}>
              <p
                className="s1"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "35pt",
                  textIndent: "-26pt",
                  textAlign: "left",
                }}
              >
                Fees
              </p>
              <p
                style={{
                  paddingTop: "1pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <ol id="l21">
                <ol id="l22">
                  <li data-list-text="10.1">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "154%",
                        textAlign: "left",
                      }}
                    >
                      There is no charge to download the App and
                      register as a User, but we may charge for
                      certain in-app purchases and other features as
                      we may specify from time to time.
                    </p>
                    <p
                      style={{
                        paddingTop: "4pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="10.2">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      In exchange for access to the Platform and the
                      Services, you agree to pay a fee on each settled
                      transaction initiated by you (such fee, a
                      “Transaction Fee”). The current Transaction Fee
                      may be found on the Site after you log into your
                      Account. We reserve the right to change, modify
                      or increase the Transaction Fee at any time and
                      from time to time. Any such changes,
                      modifications or increases will be effective
                      upon posting such changes, modifications or
                      increases on the Site. If you do not agree to
                      the posted changes, modifications, or increases,
                      you
                    </p>
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "133%",
                        textAlign: "left",
                      }}
                    >
                      should stop using the Account as provided
                      herein. Your continued use of the Account
                      following the posting of the modified
                      Transaction Fee as posted on the Site will
                      constitute the acceptance
                    </p>
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      of all such changes or revisions.
                    </p>
                    <p
                      style={{ textIndent: "0pt", textAlign: "left" }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="10.3">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "1pt",
                        lineHeight: "156%",
                        textAlign: "left",
                      }}
                    >
                      Transaction Fees are paid by the trading parties
                      in any given transaction. The trading parties
                      will each be charged a fee in USDT/USDC or other
                      currencies from time to time approved by us. You
                      are responsible for any fees imposed by third
                      parties in connection with transferring Digital
                      Assets into your Account on the Platform. The
                      Platform charges a fee to transfer Digital
                      Assets from your Account.
                    </p>
                    <p
                      style={{
                        paddingTop: "4pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="10.4">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "156%",
                        textAlign: "left",
                      }}
                    >
                      If you believe that you have been erroneously
                      charged a Transaction Fee, you shall notify the
                      Platform immediately of such error, along with
                      any additional information concerning the
                      transaction. If you do not raise any question or
                      objection within thirty (30) days after such
                      alleged erroneous Transaction Fee first appears
                      on any Account statement, such fee will be
                      deemed acceptable by you for all purposes.
                    </p>
                    <p
                      style={{
                        paddingTop: "4pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="10.5">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "1pt",
                        lineHeight: "161%",
                        textAlign: "left",
                      }}
                    >
                      You may be charged transaction and other fees in
                      connection with your Third-Party Account. Any
                      such fees are specified in the Third-Party
                      Services Provider Terms. We have no
                      responsibility or liability for any fees or
                      other cost or charges you may incur in
                      connection with such Third-Party Account.
                    </p>
                  </li>
                </ol>
              </ol>
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </li>
            <li data-list-text={11}>
              <p
                className="s1"
                style={{
                  paddingLeft: "37pt",
                  textIndent: "-28pt",
                  textAlign: "left",
                }}
              >
                User Access Obligations
              </p>
              <p
                style={{
                  paddingTop: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <ol id="l23">
                <ol id="l24">
                  <li data-list-text="11.1">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "155%",
                        textAlign: "left",
                      }}
                    >
                      The Company will issue a set of unique User
                      Credentials to each User that is registered to
                      use the Site and Platform. Such User Credentials
                      only allow the User to access the Account. Each
                      User shall promptly provide acknowledgment of
                      receipt of such User Credentials to the Company.
                    </p>
                  </li>
                  <li data-list-text="11.2">
                    <p
                      style={{
                        paddingTop: "3pt",
                        paddingLeft: "6pt",
                        textIndent: "1pt",
                        lineHeight: "156%",
                        textAlign: "left",
                      }}
                    >
                      You understand and agree that the information
                      and services provided by the Platform are not
                      provided to, and may not be used by or for the
                      benefit of, any individual or entity institution
                      in any jurisdiction where the provision or use
                      thereof would be contrary to any applicable law,
                      or where we are not authorized to provide such
                      Platform or information and services. We also do
                    </p>
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "156%",
                        textAlign: "left",
                      }}
                    >
                      not offer services or products to Users in a few
                      excluded jurisdictions including the United
                      States, mainland China, Singapore, Quebec
                      (Canada), Ontario (Canada), North Korea, Cuba,
                      Iran, Russian-controlled regions of Ukraine
                      (currently including the Crimea, Donetsk, and
                      Luhansk regions)Sevastopol, Sudan, Syria, or any
                      other jurisdictions in which we may determine
                      from
                    </p>
                    <p
                      style={{
                        paddingLeft: "5pt",
                        textIndent: "1pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      time to time to terminate the services at our
                      sole discretion (the “Excluded Jurisdictions”).
                      You should inform us immediately if you become a
                      resident in any of the Excluded Jurisdictions or
                      are aware of any Clients based in any of the
                      Excluded Jurisdictions. You understand and
                      acknowledge that if it is determined that you
                      have given false representations of your
                      location or place of residence, the Company
                      reserves the right to take any appropriate
                      actions with in compliance with this restriction
                      or in compliance with the law of a relevant to
                      the local jurisdiction, including termination of
                      any Account immediately and liquidating any open
                      positions. We also do not offer services to
                      persons or entities on the U.S. Treasury
                      Department’s List of Specially Designated
                      Nationals or Blocked Persons, the EU’s
                      Consolidated Financial Sanctions List or the UK
                      Sanctions List, or other lists that we may add
                      from time to time in our sole discretion, or any
                      entity that is owned or controlled (50 percent
                      or greater) by a person or entity on such lists
                      (hereinafter “Prohibited Parties”), or offer
                      services that involve or otherwise benefit
                      Prohibited Parties. You understand that the
                      Company reserves the right to take any
                      appropriate actions in compliance with this
                      restriction or in compliance with the law of a
                      relevant jurisdiction, including termination of
                      any Account immediately and liquidating any open
                      positions.
                    </p>
                  </li>
                  <li data-list-text="11.3">
                    <p
                      style={{
                        paddingTop: "10pt",
                        paddingLeft: "27pt",
                        textIndent: "-19pt",
                        textAlign: "left",
                      }}
                    >
                      Each User shall:
                    </p>
                    <p
                      style={{ textIndent: "0pt", textAlign: "left" }}
                    >
                      <br />
                    </p>
                    <ol id="l25">
                      <li data-list-text="(a)">
                        <p
                          style={{
                            paddingLeft: "7pt",
                            textIndent: "0pt",
                            lineHeight: "156%",
                            textAlign: "left",
                          }}
                        >
                          keep their User Credentials strictly
                          confidential and not share them with any
                          other person for any purpose including, but
                          not limited to, initiating or executing any
                          payment transaction involving the Account.
                          Further, the User shall not disclose his/her
                          User Credentials in a recognizable way
                        </p>
                        <p
                          style={{
                            paddingLeft: "7pt",
                            textIndent: "0pt",
                            lineHeight: "156%",
                            textAlign: "left",
                          }}
                        >
                          to third parties on any device (for example,
                          by writing down or recording the User
                          Credentials without disguising them);
                        </p>
                        <p
                          style={{
                            paddingTop: "4pt",
                            textIndent: "0pt",
                            textAlign: "left",
                          }}
                        >
                          <br />
                        </p>
                      </li>
                      <li data-list-text="(b)">
                        <p
                          style={{
                            paddingLeft: "7pt",
                            textIndent: "0pt",
                            lineHeight: "154%",
                            textAlign: "left",
                          }}
                        >
                          take all reasonable efforts to secure all
                          records relating to his/her User
                          Credentials, including, but not limited to,
                          keeping such records in a secure or physical
                          location accessible or known only to the
                        </p>
                        <p
                          style={{
                            paddingLeft: "7pt",
                            textIndent: "0pt",
                            lineHeight: "113%",
                            textAlign: "left",
                          }}
                        >
                          User and keeping such records in a place
                          where the records are unlikely to be
                          accessed by a third party;
                        </p>
                      </li>
                      <li data-list-text="(c)">
                        <p
                          style={{
                            paddingTop: "3pt",
                            paddingLeft: "20pt",
                            textIndent: "-12pt",
                            textAlign: "left",
                          }}
                        >
                          take all reasonable measures to follow
                          security instructions provided by the
                          Company and
                        </p>
                        <p
                          style={{
                            paddingTop: "1pt",
                            textIndent: "0pt",
                            textAlign: "left",
                          }}
                        >
                          <br />
                        </p>
                        <p
                          style={{
                            paddingLeft: "7pt",
                            textIndent: "0pt",
                            lineHeight: "154%",
                            textAlign: "left",
                          }}
                        >
                          otherwise protect the security, prevent
                          tampering or use by any other person of the
                          User Credentials, Site or Platform,
                          including those security measures prescribed
                          in our Privacy Policy;
                        </p>
                      </li>
                      <li data-list-text="(d)">
                        <p
                          style={{
                            paddingTop: "9pt",
                            paddingLeft: "28pt",
                            textIndent: "-13pt",
                            textAlign: "left",
                          }}
                        >
                          notify the Company immediately through any
                          channel prescribed by the Company in the
                          event:
                        </p>
                      </li>
                    </ol>
                    <p
                      style={{
                        paddingTop: "10pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                    <ol id="l26">
                      <li data-list-text="(i)">
                        <p
                          style={{
                            paddingLeft: "16pt",
                            textIndent: "-9pt",
                            textAlign: "left",
                          }}
                        >
                          of loss of your User Credentials;
                        </p>
                        <p
                          style={{
                            paddingTop: "10pt",
                            textIndent: "0pt",
                            textAlign: "left",
                          }}
                        >
                          <br />
                        </p>
                      </li>
                      <li data-list-text="(ii)">
                        <p
                          style={{
                            paddingLeft: "19pt",
                            textIndent: "-11pt",
                            textAlign: "left",
                          }}
                        >
                          of your User Credentials having been
                          disclosed to third parties or otherwise
                          compromised;
                        </p>
                        <p
                          style={{
                            paddingTop: "9pt",
                            textIndent: "0pt",
                            textAlign: "left",
                          }}
                        >
                          <br />
                        </p>
                      </li>
                      <li data-list-text="(iii)">
                        <p
                          style={{
                            paddingLeft: "21pt",
                            textIndent: "-13pt",
                            textAlign: "left",
                          }}
                        >
                          that you reasonably suspect any unauthorized
                          use of your User Credentials;
                        </p>
                      </li>
                    </ol>
                    <p
                      style={{ textIndent: "0pt", textAlign: "left" }}
                    >
                      <br />
                    </p>
                    <ol id="l27">
                      <ol id="l28">
                        <li data-list-text="(e)">
                          <p
                            style={{
                              paddingLeft: "7pt",
                              textIndent: "0pt",
                              lineHeight: "157%",
                              textAlign: "left",
                            }}
                          >
                            create strong passwords (for example,
                            using a mixture of letters, numbers and
                            special characters, and not using easily
                            accessible personal information) and
                            strong PINs (for example, by not using
                            numbers that are consecutive or basing the
                            PIN on the User’s contract ID, birth date,
                            telephone number, identification number,
                            or any other easily accessible personal
                            information).
                          </p>
                        </li>
                      </ol>
                    </ol>
                    <p
                      style={{
                        paddingTop: "4pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="11.4">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "1pt",
                        lineHeight: "156%",
                        textAlign: "left",
                      }}
                    >
                      Where the Platform is accessed by correct entry
                      of User Credentials or through the App, the
                      relevant User shall be deemed to have accessed
                      the Platform. You shall be responsible and
                      liable for all actions through such access by an
                      Authorized Individual authorized to access the
                      Platform on your behalf. The Company shall not
                      be obliged in any manner to investigate or take
                      any other step to verify the identity of any
                      User or Authorized Individual. The Company shall
                      not be liable for any loss that you may incur as
                      a result of someone else using your User
                      Credentials
                    </p>
                    <p
                      style={{
                        paddingTop: "1pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "155%",
                        textAlign: "left",
                      }}
                    >
                      or Account, either with or without your
                      knowledge. Upon receipt of notification under
                      Section 11.3(d), the Company shall disable the
                      relevant User Credentials and block access to
                      the Platform or the Site as soon as reasonably
                      practicable.
                    </p>
                    <p
                      style={{
                        paddingTop: "4pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="11.5">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "156%",
                        textAlign: "left",
                      }}
                    >
                      Each User shall secure all of their devices or
                      systems used to access the Platform (for
                      example, the App), including, without
                      limitation, installing and regularly updating
                      browsers, security patches, antivirus,
                      anti-malware and other relevant software in the
                      devices or systems. Each User shall also comply
                      with all instructions, procedures and directions
                      relating to the Platform, the Site and User
                      Credentials as notified the Company from time to
                      time, including, but not limited to, the risk
                      management and other measures notified at the
                      Platform login page.
                    </p>
                  </li>
                </ol>
              </ol>
              <p
                style={{
                  paddingTop: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
            </li>
            <li data-list-text={12}>
              <p
                className="s1"
                style={{
                  paddingLeft: "37pt",
                  textIndent: "-27pt",
                  textAlign: "left",
                }}
              >
                Prohibited Uses
              </p>
              <p
                style={{
                  paddingTop: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <ol id="l29">
                <ol id="l30">
                  <li data-list-text="12.1">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "1pt",
                        lineHeight: "154%",
                        textAlign: "left",
                      }}
                    >
                      You shall use the Site or Platform solely in
                      compliance with these Terms, solely for your own
                      Account or your internal business purposes. You
                      shall not sell, lease or otherwise provide
                      access
                    </p>
                    <p
                      style={{
                        paddingTop: "3pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "154%",
                        textAlign: "left",
                      }}
                    >
                      to the Site or Platform to any third party, nor
                      act as a service bureau or otherwise use the
                      Site or Platform on behalf of any third party.
                    </p>
                  </li>
                  <li data-list-text="12.2">
                    <p
                      style={{
                        paddingTop: "9pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      You shall not use the Site or Platform in any
                      way, provide any information or content, or
                      engage in any conduct in using the Site or
                      Platform that:
                    </p>
                    <p
                      style={{
                        paddingTop: "3pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                    <ol id="l31">
                      <li data-list-text="(a)">
                        <p
                          style={{
                            paddingLeft: "20pt",
                            textIndent: "-12pt",
                            textAlign: "left",
                          }}
                        >
                          is unlawful, illegal or unauthorized;
                        </p>
                        <p
                          style={{
                            paddingTop: "10pt",
                            textIndent: "0pt",
                            textAlign: "left",
                          }}
                        >
                          <br />
                        </p>
                      </li>
                      <li data-list-text="(b)">
                        <p
                          style={{
                            paddingLeft: "20pt",
                            textIndent: "-12pt",
                            textAlign: "left",
                          }}
                        >
                          is defamatory of any other person;
                        </p>
                        <p
                          style={{
                            paddingTop: "10pt",
                            textIndent: "0pt",
                            textAlign: "left",
                          }}
                        >
                          <br />
                        </p>
                      </li>
                      <li data-list-text="(c)">
                        <p
                          style={{
                            paddingLeft: "7pt",
                            textIndent: "0pt",
                            lineHeight: "288%",
                            textAlign: "left",
                          }}
                        >
                          is obscene, sexually explicit or offensive;
                          (d)advertises or promotes any other product
                          or business;
                        </p>
                      </li>
                    </ol>
                    <ol id="l32">
                      <li data-list-text="(e)">
                        <p
                          style={{
                            paddingLeft: "20pt",
                            textIndent: "-12pt",
                            textAlign: "left",
                          }}
                        >
                          is likely to harass, upset, embarrass, alarm
                          or annoy any other person;
                        </p>
                        <p
                          style={{
                            textIndent: "0pt",
                            textAlign: "left",
                          }}
                        >
                          <br />
                        </p>
                      </li>
                      <li data-list-text="(f)">
                        <p
                          style={{
                            paddingLeft: "7pt",
                            textIndent: "0pt",
                            lineHeight: "154%",
                            textAlign: "left",
                          }}
                        >
                          is likely to disrupt the Platform in any
                          way; or promotes discrimination based on
                          race, sex, religion, nationality,
                          disability, sexual orientation or age;
                        </p>
                      </li>
                      <li data-list-text="(g)">
                        <p
                          style={{
                            paddingTop: "9pt",
                            paddingLeft: "28pt",
                            textIndent: "-12pt",
                            textAlign: "left",
                          }}
                        >
                          infringes any copyright, trademark, trade
                          secret, or other proprietary right of any
                          other person;
                        </p>
                        <p
                          style={{
                            textIndent: "0pt",
                            textAlign: "left",
                          }}
                        >
                          <br />
                        </p>
                      </li>
                      <li data-list-text="(h)">
                        <p
                          style={{
                            paddingLeft: "7pt",
                            textIndent: "0pt",
                            lineHeight: "154%",
                            textAlign: "left",
                          }}
                        >
                          restricts or inhibits any other person from
                          using the Platform, including, without
                          limitation, by means of “hacking” or
                          defacing any portion of the Platform;
                        </p>
                      </li>
                      <li data-list-text="(i)">
                        <p
                          style={{
                            paddingTop: "9pt",
                            paddingLeft: "7pt",
                            textIndent: "0pt",
                            lineHeight: "280%",
                            textAlign: "left",
                          }}
                        >
                          disables, damages or alters the functioning
                          or appearance of the Platform; (j)“frames”
                          or “mirrors” any part of the Platform
                          without our prior written authorization;
                        </p>
                      </li>
                    </ol>
                    <ol id="l33">
                      <li data-list-text="(k)">
                        <p
                          style={{
                            paddingTop: "8pt",
                            paddingLeft: "7pt",
                            textIndent: "0pt",
                            lineHeight: "155%",
                            textAlign: "left",
                          }}
                        >
                          uses any robot, spider, site
                          search/retrieval application, or other
                          manual or automatic device or process to
                          download, retrieve, index, “data mine”,
                          “scrape”, “harvest” or in any way reproduce
                          or circumvent the navigational structure or
                          presentation of the Platform or its
                          contents;
                        </p>
                      </li>
                      <li data-list-text="(l)">
                        <p
                          style={{
                            paddingTop: "9pt",
                            paddingLeft: "16pt",
                            textIndent: "-9pt",
                            textAlign: "left",
                          }}
                        >
                          harvests or collects information about other
                          Users without their express consent;
                        </p>
                        <p
                          style={{
                            textIndent: "0pt",
                            textAlign: "left",
                          }}
                        >
                          <br />
                        </p>
                      </li>
                      <li data-list-text="(m)">
                        <p
                          style={{
                            paddingLeft: "7pt",
                            textIndent: "0pt",
                            lineHeight: "142%",
                            textAlign: "left",
                          }}
                        >
                          sends unsolicited or unauthorized
                          advertisements, spam, or chain letter to
                          other Users of the Platform;
                        </p>
                        <p
                          style={{
                            textIndent: "0pt",
                            textAlign: "left",
                          }}
                        >
                          <br />
                        </p>
                      </li>
                      <li data-list-text="(n)">
                        <p
                          style={{
                            paddingLeft: "7pt",
                            textIndent: "0pt",
                            lineHeight: "157%",
                            textAlign: "left",
                          }}
                        >
                          except as otherwise permitted by the Company
                          in writing, open multiple accounts except as
                          otherwise explicitly permitted by the
                          Platform;
                        </p>
                      </li>
                      <li data-list-text="(o)">
                        <p
                          style={{
                            paddingTop: "3pt",
                            paddingLeft: "7pt",
                            textIndent: "0pt",
                            lineHeight: "154%",
                            textAlign: "left",
                          }}
                        >
                          conduct frequent, intensive trading with or
                          without software or trading tools that are
                          unauthorized by the Platform;
                        </p>
                      </li>
                      <li data-list-text="(p)">
                        <p
                          style={{
                            paddingTop: "9pt",
                            paddingLeft: "7pt",
                            textIndent: "0pt",
                            lineHeight: "157%",
                            textAlign: "left",
                          }}
                        >
                          transmits any content which contains
                          software viruses, or other harmful computer
                          code, files or programs; or
                        </p>
                        <p
                          style={{
                            paddingTop: "3pt",
                            textIndent: "0pt",
                            textAlign: "left",
                          }}
                        >
                          <br />
                        </p>
                      </li>
                      <li data-list-text="(q)">
                        <p
                          style={{
                            paddingLeft: "20pt",
                            textIndent: "-13pt",
                            textAlign: "left",
                          }}
                        >
                          advocates, promotes or assists any violence
                          or any unlawful act.
                        </p>
                      </li>
                    </ol>
                    <p
                      style={{ textIndent: "0pt", textAlign: "left" }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="12.3">
                    <p
                      style={{
                        paddingLeft: "6pt",
                        textIndent: "1pt",
                        lineHeight: "156%",
                        textAlign: "left",
                      }}
                    >
                      You understand and agree that the information
                      and services provided by the Platform are not
                      provided to, and may not be used by or for the
                      benefit of, any individual or entity institution
                      in any jurisdiction where the provision or use
                      thereof would be contrary to any applicable law,
                      or where we are not authorized to provide such
                      Platform or information and services. We also do
                    </p>
                    <p
                      style={{
                        paddingLeft: "5pt",
                        textIndent: "1pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      not offer services or products to Users in a few
                      excluded jurisdictions including the United
                      States, mainland China, Singapore, Quebec
                      (Canada), Ontario (Canada), North Korea, Cuba,
                      Iran, Russian-controlled regions of Ukraine
                      (currently including the Crimea, Donetsk, and
                      Luhansk regions)Sevastopol, Sudan, Syria, or any
                      other jurisdictions in which we may determine
                      from
                    </p>
                    <p
                      style={{
                        paddingLeft: "5pt",
                        textIndent: "0pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      time to time to terminate the services at our
                      sole discretion (the “Excluded Jurisdictions”).
                      You should inform us immediately if you become a
                      resident in any of the Excluded Jurisdictions or
                      are aware of any Clients based in any of the
                      Excluded Jurisdictions. You understand and
                      acknowledge that if it is determined that you
                      have given false representations of your
                      location or place of residence, the Company
                      reserves the right to take any appropriate
                      actions with in compliance with this restriction
                      or in compliance with the law of a relevant to
                      the local jurisdiction, including termination of
                      any Account immediately and liquidating any open
                      positions. We also do not offer services to
                      persons or entities on the U.S. Treasury
                      Department’s List of Specially Designated
                      Nationals or Blocked Persons, the EU’s
                      Consolidated Financial Sanctions List or the UK
                      Sanctions List, or other lists that we may add
                      from time to time in our sole discretion, or any
                      entity that is owned or controlled (50 percent
                      or greater) by a person or entity on such lists
                      (hereinafter “Prohibited Parties”), or offer
                      services that involve or otherwise benefit
                      Prohibited Parties. You understand that the
                      Company reserves the right to take any
                      appropriate actions in compliance with this
                      restriction or in compliance with the law of a
                      relevant jurisdiction, including termination of
                      any Account immediately and liquidating any open
                      positions.
                    </p>
                    <p
                      style={{
                        paddingTop: "4pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="12.4">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "153%",
                        textAlign: "left",
                      }}
                    >
                      We reserve the right, but do not have the
                      obligation, at our sole discretion to edit,
                      delete, remove or block any information that
                      violates these Terms.
                    </p>
                  </li>
                </ol>
              </ol>
              <p
                style={{
                  paddingTop: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
            </li>
            <li data-list-text={13}>
              <p
                className="s1"
                style={{
                  paddingLeft: "35pt",
                  textIndent: "-26pt",
                  textAlign: "left",
                }}
              >
                Security
              </p>
              <p
                style={{
                  paddingTop: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <ol id="l34">
                <ol id="l35">
                  <li data-list-text="13.1">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "153%",
                        textAlign: "left",
                      }}
                    >
                      We may use authentication or verification
                      technologies, services or measures as we deem
                      desirable or appropriate. Such measures may
                      include multi-factor authentication or use of
                    </p>
                    <p
                      style={{
                        paddingTop: "3pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      Biometric Information to access the App and the
                      Platform. There can be no assurance that such
                    </p>
                    <p
                      style={{
                        paddingTop: "6pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "134%",
                        textAlign: "left",
                      }}
                    >
                      authentication technologies, services or
                      measures will be completely secure, adequate or
                      successful to prevent unauthorized access to or
                      use of the Platform or your Long bridge Account
                      or Trading Account, or hacking or identity
                      theft.
                    </p>
                    <p
                      style={{
                        paddingTop: "7pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="13.2">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "1pt",
                        lineHeight: "155%",
                        textAlign: "left",
                      }}
                    >
                      We may offer access to the App and the Platform
                      using a mobile device by using Biometric
                      Authentication. The User acknowledges that by
                      enabling Biometric Authentication for the
                      Platform, unauthorized third parties can gain
                      access to the Platform without entering User
                      Credential and query banking information. The
                      User acknowledges and accepts the risks and
                    </p>
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      obligations associated with using the Platform
                      in conjunction with Biometric Authentication,
                      and, in particular, also the risk of third
                      parties querying their Trading Account
                      information. By choosing to use Biometric
                      Authentication on the User’s mobile device, the
                      User consents to the collection and use of such
                      Biometric Information in order to provide access
                      to App and the Platform in accordance with these
                      Terms and the Privacy Policy. The User further
                      is relying on the functionality provided by the
                      hardware and the operating system on the mobile
                      device. We shall not be liable for any
                      malfunction, error, inaccuracy or unauthorized
                      access to a User’s Biometric Information.
                    </p>
                    <p
                      style={{
                        paddingTop: "3pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="13.3">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      While we employ reasonable security measures to
                      protect the security and confidentiality of the
                      Platform and your Personal Information in
                      accordance with applicable law, we cannot
                      guarantee the security of all transmissions or
                      any network or system on which your Personal
                      Information or account or transaction
                      information is stored or processed. To the
                      extent required by law, we will notify you of an
                      unauthorized access, use or disclosure of your
                      Personal Information of which we become aware.
                      In the event you receive such notice, you are
                      responsible for following the instructions set
                      forth in the notice, including immediately
                      changing your User Credentials and other steps
                      to prevent unauthorized access to your account
                      or Personal Information.
                    </p>
                  </li>
                </ol>
              </ol>
              <p
                style={{
                  paddingTop: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
            </li>
            <li data-list-text={14}>
              <p
                className="s1"
                style={{
                  paddingLeft: "37pt",
                  textIndent: "-28pt",
                  textAlign: "left",
                }}
              >
                Authorized Individuals
              </p>
              <p
                style={{
                  paddingTop: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <ol id="l36">
                <ol id="l37">
                  <li data-list-text="14.1">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "1pt",
                        lineHeight: "156%",
                        textAlign: "left",
                      }}
                    >
                      Each User and Authorized Individual acknowledges
                      that they have received and accepted these
                      Terms. When applying for any Authorized
                      Individual to receive access to the Platform and
                      an Account on their behalf, the User
                      acknowledges and represents that the Authorized
                      Individual is duly authorized to (i) access and
                      use the Platform on the User’s behalf and, if
                      applicable, to exercise the same powers
                      conferred by the User upon the Authorized
                      Individual in accordance with any underlying
                      power of attorney to the same extent as is
                      technically feasible and that services offered
                      under the Platform are analogous to services
                      that the User may utilize through
                    </p>
                    <p
                      style={{
                        paddingTop: "3pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "153%",
                        textAlign: "left",
                      }}
                    >
                      other channels; (ii) accept any Changes to these
                      Terms on the User’s behalf; and (iii) apply or
                      subscribe to any of the Platform services that
                      require separate application or subscription.
                    </p>
                    <p
                      style={{
                        paddingTop: "4pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="14.2">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "1pt",
                        lineHeight: "156%",
                        textAlign: "left",
                      }}
                    >
                      Each User shall procure that each Authorized
                      Individual acting on their behalf is informed of
                      and agrees to and complies with these Terms and,
                      as applicable, the Third-Party Services Provider
                      Terms. You shall be fully liable for all acts or
                      omissions or non-compliance of your designated
                      Authorized Individual in the access and use of
                      the Platform and any transactions conducted
                      through your Account.
                    </p>
                    <p
                      style={{
                        paddingTop: "4pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="14.3">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "156%",
                        textAlign: "left",
                      }}
                    >
                      Each User fully indemnifies the Company, and its
                      affiliated subsidiaries and affiliates, officer,
                      directors, employees, agents and representatives
                      against any liabilities, costs, claims, losses,
                      expenses (including but not limited to legal
                      fees) and damages arising out of or relating to
                      (i) a breach of these Terms by their Authorized
                      Individual; and (ii) any claim or action by
                      their Authorized Individual against the Company.
                    </p>
                    <p
                      style={{
                        paddingTop: "4pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="14.4">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "1pt",
                        lineHeight: "155%",
                        textAlign: "left",
                      }}
                    >
                      You represent, undertake and confirm that the
                      you have procured the consent of your Authorized
                      Individuals to the collection, use, transfer,
                      disclosure and processing of the Personal
                      Information of such Authorized Individuals in
                      accordance with these Terms and the Privacy
                      Policy .
                    </p>
                  </li>
                </ol>
              </ol>
              <p
                style={{
                  paddingTop: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
            </li>
            <li data-list-text={15}>
              <p
                className="s1"
                style={{
                  paddingLeft: "38pt",
                  textIndent: "-29pt",
                  textAlign: "left",
                }}
              >
                Provision of Material and Information
              </p>
              <ol id="l38">
                <li data-list-text={15}>
                  <p
                    style={{
                      paddingTop: "18pt",
                      paddingLeft: "24pt",
                      textIndent: "-16pt",
                      textAlign: "left",
                    }}
                  >
                    1By choosing to use the Platform, each User
                    acknowledges that:
                  </p>
                  <p style={{ textIndent: "0pt", textAlign: "left" }}>
                    <br />
                  </p>
                  <ol id="l39">
                    <li data-list-text="(a)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "153%",
                          textAlign: "left",
                        }}
                      >
                        the Company is NOT under any obligation
                        whatsoever to accede to the User’s request to
                        provide Material on any products and/or
                        services; and
                      </p>
                      <p
                        style={{
                          paddingTop: "4pt",
                          textIndent: "0pt",
                          textAlign: "left",
                        }}
                      >
                        <br />
                      </p>
                    </li>
                    <li data-list-text="(b)">
                      <p
                        style={{
                          paddingLeft: "7pt",
                          textIndent: "0pt",
                          lineHeight: "154%",
                          textAlign: "left",
                        }}
                      >
                        any Material, where provided, was provided for
                        the User only and is not to be further
                        distributed without the written consent of the
                        Company.
                      </p>
                    </li>
                  </ol>
                </li>
              </ol>
              <p
                style={{
                  paddingTop: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <ol id="l40">
                <ol id="l41">
                  <li data-list-text="15.2">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "1pt",
                        lineHeight: "156%",
                        textAlign: "left",
                      }}
                    >
                      You acknowledge that neither the Company nor the
                      Platform is your investment adviser or
                      fiduciary. You further acknowledge that none of
                      the Materials we provide or made available on
                      the Platform constitutes our recommendation or
                      solicitation that you enter into any particular
                      transaction or that any particular transaction
                      is suitable or appropriate for you.
                    </p>
                    <p
                      style={{
                        paddingTop: "4pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="15.3">
                    <p
                      style={{
                        paddingLeft: "29pt",
                        textIndent: "-21pt",
                        textAlign: "left",
                      }}
                    >
                      You acknowledge that we have no duty or
                      obligation to verify, correct, complete or
                      update any
                    </p>
                    <p
                      style={{
                        paddingTop: "6pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "134%",
                        textAlign: "left",
                      }}
                    >
                      Material displayed on the Platform. Materials,
                      including without limitation, market data, price
                      quotations, news and research, may be prepared
                      by information providers that are independent of
                      us. We do not warrant that the Material will be
                      accurate, complete or refreshed in a timely
                    </p>
                    <p
                      style={{
                        paddingTop: "3pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "160%",
                        textAlign: "left",
                      }}
                    >
                      manner. You should conduct further research and
                      analysis or consult an investment advisor before
                      making investment decisions. Any use of or
                      reliance on materials by you is at your own
                      risk. We are not obligated to inform you of
                      technical difficulties experienced by us
                      concerning access to the Platform.
                    </p>
                    <p
                      style={{
                        paddingTop: "1pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="15.4">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      Information regarding your Digital Assets
                      balance and the status of the Account is
                      available to you in electronic format for
                      viewing anytime (subject to down times) at the
                      Site. You may review online all transactions,
                      including pending orders, positions, deposits
                      and withdrawals, that have taken place in the
                      previous one year or such other time as the
                      Company may determine from time to time. You
                      also have the right to receive a receipt, trade
                      ticket or other evidence of a transaction.
                      Nothing in the transaction history should be
                      treated as a valuation. You acknowledge that
                      errors may sometimes occur and such errors do
                      not impact the actual means and results of
                    </p>
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      a given transaction. Any transaction listed in
                      the statement or other communication with you
                      shall be deemed and treated as authorized and
                      correct, approved, and confirmed by you unless
                      we receive a written notice from you to the
                      contrary within three calendar days from the
                      date the communication was sent or posted on the
                      Site.
                    </p>
                    <p
                      style={{
                        paddingTop: "3pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="15.5">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "155%",
                        textAlign: "left",
                      }}
                    >
                      The content and information displayed through
                      the Platform relating to products and services
                      may not be eligible for sale or available to
                      residents of certain nations or certain
                      categories of investors due to regulatory
                      restrictions.
                    </p>
                  </li>
                </ol>
              </ol>
              <p
                style={{
                  paddingTop: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
            </li>
            <li data-list-text={16}>
              <p
                className="s1"
                style={{
                  paddingLeft: "37pt",
                  textIndent: "-28pt",
                  textAlign: "left",
                }}
              >
                Service and Other Notifications
              </p>
              <ol id="l42">
                <ol id="l43">
                  <li data-list-text="16.1">
                    <p
                      style={{
                        paddingTop: "18pt",
                        paddingLeft: "28pt",
                        textIndent: "-20pt",
                        textAlign: "left",
                      }}
                    >
                      The use of Service Notifications involves
                      communications through unsecured
                    </p>
                    <p
                      style={{
                        paddingTop: "1pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "159%",
                        textAlign: "left",
                      }}
                    >
                      communications networks. You shall provide us
                      with complete and accurate email address(es) or
                      phone number(s) to allow us to send Service
                      Notifications to you. To ensure that you receive
                      all
                    </p>
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "159%",
                        textAlign: "left",
                      }}
                    >
                      of the communications, you agree to keep your
                      email address up-to-date and immediately notify
                      us if there are any changes. Delivery of any
                      communication to the email address on record is
                      considered valid. If any email communication is
                      returned as undeliverable, we retain the right
                      to block your access to the Platform until you
                      provide and confirm a new and valid email
                      address.
                    </p>
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "159%",
                        textAlign: "left",
                      }}
                    >
                      Where you have provided multiple email
                      address(es) and phone number(s) to us, you shall
                      specify your preferred contact details for
                      receiving Service Notifications. Where your
                      account is a joint account, you shall inform us
                      whether Service Notifications should be sent to
                      a specific account holder or to all of them.
                    </p>
                    <p
                      style={{
                        paddingTop: "1pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="16.2">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "155%",
                        textAlign: "left",
                      }}
                    >
                      You agree to accept notifications regarding the
                      App, Platform, your Account and Terms through
                      Service Notifications. You agree that such
                      Service Notifications shall constitute effective
                      notice in lieu of written, mailed or other forms
                      of notice required by applicable law.
                    </p>
                    <p
                      style={{
                        paddingTop: "1pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="16.3">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "1pt",
                        lineHeight: "162%",
                        textAlign: "left",
                      }}
                    >
                      It is your sole responsibility to monitor the
                      applicable email account or phone number without
                      further reminders or repeat notifications from
                      the Company. You shall immediately report any
                      unauthorized use or access of the Platform.
                    </p>
                    <p
                      style={{
                        paddingTop: "1pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="16.4">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      You release the Company from any liability for
                      losses or damages resulting from the use of the
                      Service Notifications, to the extent permitted
                      by law. The Company provides no warranty or
                      accepts no liability that the information
                      provided through Service Notifications is
                      up-to-date, correct or complete.
                    </p>
                  </li>
                </ol>
              </ol>
              <p
                style={{
                  paddingTop: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
            </li>
            <li data-list-text={17}>
              <p
                className="s1"
                style={{
                  paddingLeft: "37pt",
                  textIndent: "-28pt",
                  textAlign: "left",
                }}
              >
                Personal Information
              </p>
            </li>
          </ol>
          <p
            style={{
              paddingTop: "1pt",
              textIndent: "0pt",
              textAlign: "left",
            }}
          >
            <br />
          </p>
          <ol id="l44">
            <li data-list-text={17}>
              <p
                style={{
                  paddingLeft: "25pt",
                  textIndent: "-17pt",
                  textAlign: "left",
                }}
              >
                1As part of the Platform, Personal Information of the
                User may be collected, used, transferred,
              </p>
              <p
                style={{
                  paddingTop: "6pt",
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "133%",
                  textAlign: "left",
                }}
              >
                disclosed or otherwise processed by the Company in
                accordance with the Privacy Policy. You should read
                the Privacy Policycarefully before registering for and
                using the Site and Platform.
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "11pt",
                  textAlign: "left",
                }}
              >
                You consent to the collection, use and disclosure of
                your Personal Information in accordance
              </p>
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "139%",
                  textAlign: "left",
                }}
              >
                with these Terms and the Privacy Policy, including
                without limitation, disclosure to the Third-Party
                Services Provider for purposes of providing services
                and conducting transactions in regards to the Account.
              </p>
              <p
                style={{
                  paddingTop: "9pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <ol id="l45">
                <li data-list-text="17.2">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "155%",
                      textAlign: "justify",
                    }}
                  >
                    You agree to provide true, accurate, current and
                    complete Personal Information. You further agree
                    to maintain and promptly update the Personal
                    Information to keep it true, accurate, current and
                    complete at all times during the term of this
                    Agreement.
                  </p>
                  <p
                    style={{
                      paddingTop: "4pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
                <li data-list-text="17.3">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "156%",
                      textAlign: "left",
                    }}
                  >
                    You must promptly inform us of all changes,
                    including, but not limited to, changes in the
                    Personal Information in connection with the
                    Platform. If you provide any information that is
                    untrue, inaccurate, not current or incomplete, or
                    if we or any of our authorized agents have
                    reasonable grounds to suspect that such
                    information is untrue, inaccurate, not current or
                    incomplete, we
                  </p>
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "159%",
                      textAlign: "left",
                    }}
                  >
                    have the right to suspend or terminate the Account
                    and refuse any and all current or future use of
                    the Platform and Site by you, as well as subject
                    you to civil liability or refer you to the
                    appropriate law enforcement authorities for
                    criminal prosecution. We shall not be liable to
                    make any compensation, monetary or otherwise,
                    following such suspension, termination or
                    inability for you to use the Platform or the Site.
                  </p>
                  <p
                    style={{
                      paddingTop: "2pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
                <li data-list-text="17.4">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "1pt",
                      lineHeight: "157%",
                      textAlign: "left",
                    }}
                  >
                    You shall comply with any reasonable requests by
                    us for information, documents and agreements
                    related to any transaction or your use of the Site
                    or Platform. You understand that
                  </p>
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "156%",
                      textAlign: "left",
                    }}
                  >
                    we may report such information to such regulatory
                    authorities as we deem necessary pursuant to the
                    Privacy Policy.
                  </p>
                </li>
                <li data-list-text="17.5">
                  <p
                    style={{
                      paddingTop: "3pt",
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "157%",
                      textAlign: "left",
                    }}
                  >
                    Please note that we may collect information using
                    tracking technologies regarding your device, such
                    as IP address, network provider, mobile carrier,
                    mobile browser type, timestamp, time zone,
                    information about the speed, bearing, orientation,
                    and altitude of a device, or other device-
                    identifying information. The User consents to such
                    use of tracking technologies and acknowledges that
                    the information obtained, including Personal
                    Information, may be matched to public or private
                    information accessible to the Company or any
                    Third-Party Services Provider. The User also
                    consents to such information being shared with the
                    Company’s and Third-Party Services Provider’s
                    service providers for the purposes of providing
                    and maintaining the tracking technologies and
                    related services. We may also collect precise
                    geolocation data from or about your device, which
                    may be expressed by latitude-longitude coordinates
                    obtained through GPS tools, WiFi data, cell tower
                    triangulation or other techniques. Our use of such
                    information is described in our Privacy Policy.
                  </p>
                  <p
                    style={{
                      paddingTop: "3pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
              </ol>
            </li>
            <li data-list-text={18}>
              <p
                className="s1"
                style={{
                  paddingLeft: "37pt",
                  textIndent: "-28pt",
                  textAlign: "left",
                }}
              >
                Market Makers
              </p>
              <p
                style={{
                  paddingTop: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "157%",
                  textAlign: "justify",
                }}
              >
                18.1We may engage one or more market makers, who may
                also be affiliated with us, to act as liquidity
                providers on the Platform. You understand and agree
                that such market makers may be entitled to terms or
                rates that are preferential to you due to the services
                they offer.
              </p>
            </li>
            <li data-list-text={19}>
              <p
                className="s1"
                style={{
                  paddingTop: "6pt",
                  paddingLeft: "37pt",
                  textIndent: "-28pt",
                  textAlign: "justify",
                }}
              >
                Insurance Fund; Auto-Deleverage (ADL)
              </p>
              <p
                style={{
                  paddingTop: "10pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <ol id="l46">
                <ol id="l47">
                  <li data-list-text="19.1">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "156%",
                        textAlign: "left",
                      }}
                    >
                      The Company maintains an insurance fund to cover
                      the excessive losses caused by liquidated
                      positions that are closed at worse than
                      bankruptcy prices. The insurance fund is
                      collected from the residual margin of liquidated
                      positions that are closed at better than
                      bankruptcy prices. The current balance of the
                      insurance fund will be displayed on the
                      Platform’s “Daily Insurance Fund Balance” page.
                    </p>
                    <p
                      style={{
                        paddingTop: "4pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="19.2">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      In extreme market conditions, however, if a
                      position loss during a certain period of time
                      has depleted the insurance fund, you agree that
                      the Platform shall automatically deleverage the
                      opposing position from the Users with the
                      highest ADL ranking at the bankruptcy price of
                      the liquidated order. In such circumstances,
                      Users with the highest ADL ranking will get
                      their winning positions partially or fully
                      closed, depending on the size of the liquidated
                      position, to cover for other Users’ margin
                      deficit. You may be able to find your ADL
                      ranking on the Platform. The ADL ranking is
                      assigned by the Platform based on your leverage
                      and your positions’ profit ratio.
                    </p>
                  </li>
                </ol>
              </ol>
            </li>
            <li data-list-text={20}>
              <p
                className="s1"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "37pt",
                  textIndent: "-29pt",
                  textAlign: "left",
                }}
              >
                Disclaimer and Risks of Use of Platform
              </p>
              <p
                style={{
                  paddingTop: "1pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <ol id="l48">
                <ol id="l49">
                  <li data-list-text="20.1">
                    <p
                      style={{
                        paddingLeft: "27pt",
                        textIndent: "-20pt",
                        textAlign: "left",
                      }}
                    >
                      The Platform and Site, including all content
                      (including Third-Party Content), features and
                      any
                    </p>
                    <p
                      style={{
                        paddingTop: "6pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "133%",
                        textAlign: "left",
                      }}
                    >
                      related services are provided on an “As Is” and
                      “As Available” basis at the User’s sole risk and
                      without any representations or warranties. We do
                      not guarantee that all or any part of the
                      Platform or the App will be available or
                      accessible by the User at all times.
                    </p>
                    <p
                      style={{
                        paddingTop: "8pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="20.2">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "133%",
                        textAlign: "left",
                      }}
                    >
                      The use of the Platform, due to the download,
                      installation or use of the Site and the
                      associated reference points with third parties
                      (for example, distribution platform providers,
                      network providers, device manufacturers)
                      involves risks, in particular:
                    </p>
                    <p
                      style={{ textIndent: "0pt", textAlign: "left" }}
                    >
                      <br />
                    </p>
                    <ol id="l50">
                      <li data-list-text="(a)">
                        <p
                          style={{
                            paddingLeft: "7pt",
                            textIndent: "0pt",
                            lineHeight: "156%",
                            textAlign: "left",
                          }}
                        >
                          disclosure of your Personal Information or
                          other information and the existence of your
                          relationship with the Third-Party Services
                          Provider to third parties;
                        </p>
                        <p
                          style={{
                            paddingTop: "3pt",
                            textIndent: "0pt",
                            textAlign: "left",
                          }}
                        >
                          <br />
                        </p>
                      </li>
                      <li data-list-text="(b)">
                        <p
                          style={{
                            paddingLeft: "7pt",
                            textIndent: "0pt",
                            lineHeight: "160%",
                            textAlign: "left",
                          }}
                        >
                          system outages, security-related
                          restrictions and unauthorized removal of use
                          restrictions on the end device, and other
                          disturbances which may make use impossible;
                          and (c)misuse due to manipulation by malware
                          or unauthorized use, including in the event
                          the User’s device used to access the Site or
                          the Platform is lost or stolen.
                        </p>
                      </li>
                    </ol>
                    <p
                      style={{
                        paddingTop: "7pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      In addition, you have received, read and
                      understood any Risk Disclosure Statements and
                      are fully aware of the potential risks
                      associated with the access to or use of the
                      Platform and conduct of trading using the
                      Account.
                    </p>
                    <p
                      style={{
                        paddingTop: "9pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="20.3">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "159%",
                        textAlign: "left",
                      }}
                    >
                      We are entitled to block or disable the use of
                      the Site on end devices if the security features
                      devised by the operating system or manufacturer
                      of such device on which the Site is installed
                      have been modified at any time (for example, a
                      device that has been “jailbroken”). Accordingly,
                      we do not guarantee the functioning and
                      operation of the App on end devices which have
                      been modified in this way or on older end
                      devices that no longer meet the technical
                      requirements for the use of the Site or access
                      to the Platform.
                    </p>
                    <p
                      style={{
                        paddingTop: "2pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="20.4">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "159%",
                        textAlign: "left",
                      }}
                    >
                      ALL WARRANTIES, CONDITIONS OR TERMS (WHETHER
                      EXPRESS, IMPLIED, STATUTORY OR OTHERWISE)
                      INCLUDING WITHOUT LIMITATION RELATING TO
                      QUALITY, MERCHANTABILITY, FITNESS FOR PURPOSE,
                      OR UNINTERRUPTED, ERROR-FREE ACCESS ARE
                      EXPRESSLY EXCLUDED FOR THE SITE AND PLATFORM TO
                      THE FULLEST EXTENT PERMITTED BY LAW.
                    </p>
                    <p
                      style={{
                        paddingTop: "2pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="20.5">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "155%",
                        textAlign: "left",
                      }}
                    >
                      No representation or warranty, express or
                      implied, can be given as to the accuracy or
                      completeness of the information provided in the
                      Platform.
                    </p>
                  </li>
                  <li data-list-text="20.6">
                    <p
                      style={{
                        paddingTop: "3pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "156%",
                        textAlign: "left",
                      }}
                    >
                      Each User acknowledges and accepts the risks
                      that may arise from Internet transactions
                      conducted via open systems accessible to anyone
                      and acknowledges that despite the encryption of
                      data, the connection from the User’s personal
                      computer or electronic mobile device to the
                      Platform over the Internet may be observable. We
                      may also use servers and other computer hardware
                      situated in any jurisdiction worldwide for the
                      provision of any portion of the Platform.
                    </p>
                    <p
                      style={{
                        paddingTop: "4pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="20.7">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "155%",
                        textAlign: "left",
                      }}
                    >
                      We exclude any and all liability for loss or
                      damage caused by transmission errors, technical
                      faults, breakdowns, business interruptions or
                      illegal interventions into transmission
                      networks, IT systems/computers of the User or of
                      any third party (including systems in the public
                      domain).
                    </p>
                  </li>
                </ol>
              </ol>
              <p
                style={{
                  paddingTop: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
            </li>
            <li data-list-text={21}>
              <p
                className="s1"
                style={{
                  paddingLeft: "35pt",
                  textIndent: "-28pt",
                  textAlign: "left",
                }}
              >
                Release
              </p>
              <p
                style={{
                  paddingTop: "18pt",
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "157%",
                  textAlign: "left",
                }}
              >
                21.1To the maximum extent permitted by applicable law,
                you hereby discharge, acquit, and otherwise release
                us, our parent company, affiliates and subsidiaries
                and each of their respective
              </p>
              <p
                style={{
                  paddingTop: "6pt",
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "152%",
                  textAlign: "left",
                }}
              >
                officers, directors, shareholders, members, partners,
                attorneys, employees, independent contractors,
                telecommunication providers, and agents (collectively,
                the “Indemnified Parties”), from any and all{" "}
                <span className="s2">
                  allegations, counts, charges, debts, causes of
                  action, claims and losses, relating in any way to
                  the use of, or activities relating to the use of the
                  Site, Platform, any Account and
                </span>
              </p>
              <p
                className="s3"
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                }}
              >
                any services or Third- Party Content provided through
                the Site, Platform or any Account, including,
              </p>
              <p
                style={{
                  paddingTop: "1pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "156%",
                  textAlign: "left",
                }}
              >
                but not limited to, claims relating to the following:
                negligence, gross negligence, intentional interference
                with contract or advantageous business relationship,
                defamation, privacy, publicity, misrepresentation,
                false identities, fraudulent acts by others, invasion
                of privacy, release of Personal Information, failed
                transactions, purchases or functionality of the
                Platform, unavailability
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "157%",
                  textAlign: "left",
                }}
              >
                of the Site, the Platform, Third-Party Content or any
                Account, their functions and any other technical
                failure that may result in inaccessibility to the
                Site, the Platform, Third-Party Content or any
                Account, or any claim based on vicarious liability for
                torts committed by you encountered or transacted with
                through the Site, Platform, Third-Party Content and
                any Account, including, but not limited to, fraud,
                computer hacking, theft or misuse of Personal
                Information, assault, battery, stalking, rape,
                cheating, perjury, manslaughter, or murder. The above
                list is intended to be illustrative only, and not
                exhaustive of the types or categories of claims
                released by us. This release is intended by the
                parties to be interpreted broadly in favor of us, and
                thus any ambiguity shall be interpreted in a manner
                providing release of the broadest claims. This release
                is
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "154%",
                  textAlign: "left",
                }}
              >
                intended to be a full release of claims, and the
                parties acknowledge the legally binding nature of this
                provision, and the nature of the rights given up in
                connection therewith.
              </p>
            </li>
            <li data-list-text={22}>
              <p
                className="s1"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "37pt",
                  textIndent: "-30pt",
                  textAlign: "left",
                }}
              >
                Indemnification and Limitation of Liability
              </p>
              <p
                style={{
                  paddingTop: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "156%",
                  textAlign: "left",
                }}
              >
                22.1To the maximum extent permitted by applicable law,
                you agree to defend, indemnify, and hold harmless the
                Indemnified Parties, from and against any and all
                claims (including third-party claims), actions, loss,
                liabilities, expenses, costs, or demands, including,
                without limitation, legal and accounting fees,
                directly or indirectly, resulting from or by reason of
                (i) your (or if you are under
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "114%",
                  textAlign: "left",
                }}
              >
                another person’s authority, including, without
                limitation, Governmental Authorities, such other
                person’s) use, misuse, or inability to use the Site,
                the Platform, any Account on the
              </p>
              <p
                style={{
                  paddingTop: "10pt",
                  paddingLeft: "6pt",
                  textIndent: "0pt",
                  lineHeight: "159%",
                  textAlign: "justify",
                }}
              >
                Platform, or any of the content, including Third-
                Party Content contained therein or any content or
                information that you provided to the Platform; or (
                ii) your breach of this these Terms or the Third-
                Party Services Provider Terms, including those
                documents that are expressly incorporated into these
                Terms or the Third- Party Services Provider Terms by
                reference and form a part of these Terms or the
                Third-Party Services Provider Terms.
              </p>
              <p
                style={{
                  paddingTop: "1pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "160%",
                  textAlign: "justify",
                }}
              >
                2 2 . 2We shall notify you by email, mail, or other
                appropriate means, of any such claim or suit, and
                reasonably cooperate (at your expense) in the defense
                of such claim or suit. We reserve the right to
                participate in the defense of such claim or choose our
                own legal counsel, but are not obligated to do so.
              </p>
              <p
                style={{
                  paddingTop: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <ol id="l51">
                <ol id="l52">
                  <li data-list-text="22.3">
                    <p
                      style={{
                        paddingLeft: "6pt",
                        textIndent: "0pt",
                        lineHeight: "155%",
                        textAlign: "left",
                      }}
                    >
                      UNDER NO CIRCUMSTANCES AND UNDER NO THEORY OF
                      LAW (TORT, CONTRACT, STRICT LIABILITY OR
                      OTHERWISE), SHALL WE OR ANY OF THE INDEMNITEES
                      BE LIABLE TO YOU OR ANY OTHER PERSON FOR ANY
                      DAMAGES ARISING FROM THE USE OR MISUSE OF, OR
                      INABILITY TO USE, THE PLATFORM, THE SITE,
                      THIRD-PARTY CONTENT OR ANY ACCOUNT, REGARDLESS
                      OF WHETHER SUCH DAMAGES ARE DIRECT,
                    </p>
                    <p
                      style={{
                        paddingTop: "1pt",
                        paddingLeft: "6pt",
                        textIndent: "0pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      INDIRECT, SPECIAL, INCIDENTAL OR CONSEQUENTIAL
                      DAMAGES OF ANY CHARACTER, INCLUDING DAMAGES FOR
                      TRADING LOSSES, LOSS OF INFORMATION, BUSINESS
                      INTERRUPTION OR LOST PROFITS, LOST SAVINGS, OR
                      LOSS OF DATA, OR LIABILITIES UNDER ANY CONTRACT,
                      NEGLIGENCE, STRICT LIABILITY, OR OTHER THEORY
                      ARISING OUT OF OR RELATING IN ANY MANNER TO THE
                      SITE, THE PLATFORM, THIRD-PARTY CONTENT OR ANY
                      ACCOUNT OR FOR ANY CLAIM OR DEMAND BY ANY THIRD
                      PARTY, EVEN IF WE KNEW OR HAD REASON TO KNOW OF
                      THE POSSIBILITY OF SUCH DAMAGES, CLAIM OR DEMAND
                      IF THE FOREGOING DISCLAIMER AND WAIVER OF
                      LIABILITY SHOULD BE DEEMED INVALID OR
                      INEFFECTIVE. SOME JURISDICTIONS DO NOT ALLOW THE
                      EXCLUSION OR LIMITATION OF CERTAIN WARRANTIES
                      AND/OR LIABILITIES, SO CERTAIN OF THE ABOVE
                      LIMITATIONS OR EXCLUSIONS MAY NOT APPLY TO YOU.
                    </p>
                  </li>
                  <li data-list-text="22.4">
                    <p
                      style={{
                        paddingTop: "3pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "156%",
                        textAlign: "left",
                      }}
                    >
                      IN NO EVENT SHALL OUR LIABILITY, REGARDLESS OF
                      THE FORM OF ACTION AND DAMAGES SUFFERED BY YOU,
                      EXCEED THE HIGHEST AGGREGATE FEES PAID BY YOU TO
                      US IN CONNECTION WITH THE PLATFORM, OR THE SITE,
                      OR 10,000 U.S. DOLLARS, WHICHEVER IS GREATER.
                    </p>
                    <p
                      style={{ textIndent: "0pt", textAlign: "left" }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="22.5">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      We will not be liable for our failure to perform
                      any obligations under these Terms due to events
                      beyond our control, and the time provided for
                      performing such obligations shall be extended by
                      a period of time equal to the duration of such
                      events. Events beyond our control include,
                      without limitation, acts of God, war, riot,
                      arson, embargoes, civil commotion, strikes,
                      labor disputes, equipment failures, bank
                      failures, virtual currency market collapse or
                      fluctuations, credit or debit card transaction
                      processing failures, strikes, fire, flood,
                      earthquake, hurricanes, tropical storms or other
                      natural disaster or casualty, shortages of labor
                      or material, shortage of transportation,
                      facilities, fuel, energy, government regulation
                      or restriction, acts of civil or military
                      authority or terrorism, fiber cuts, weather
                      conditions, breaches or failures to perform by
                      third parties, technical problems, including
                      hardware and software crashes and other
                      malfunctions, failure of the telecommunications
                      or information services infrastructure, hacking,
                      SPAM or failure
                    </p>
                  </li>
                </ol>
              </ol>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "161%",
                  textAlign: "left",
                }}
              >
                of any computer, server or software disruptions on
                account of or caused by vandalism, theft, phone
                service outages, power outage, Internet disruptions,
                viruses, and mechanical, power or communications
                failures.
              </p>
              <p
                style={{
                  paddingTop: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
            </li>
            <li data-list-text={23}>
              <p
                className="s1"
                style={{
                  paddingLeft: "36pt",
                  textIndent: "-29pt",
                  textAlign: "left",
                }}
              >
                Suspicion or Termination in Whole or in Part
              </p>
            </li>
          </ol>
          <p
            style={{
              paddingTop: "2pt",
              textIndent: "0pt",
              textAlign: "left",
            }}
          >
            <br />
          </p>
          <ol id="l53">
            <li data-list-text={23}>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "158%",
                  textAlign: "left",
                }}
              >
                1Access to the Platform may be suspended or terminated
                in whole or in part at any time either by the User or
                by us in accordance with the Terms. In addition, we
                reserve the right at our sole discretion to suspend or
                terminate immediately and without notice any User’s
                access to or use of the Site and the Platform if they
                violate any provision of these Terms or otherwise
                according to Section
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "158%",
                  textAlign: "left",
                }}
              >
                23.2. Your access to the Platform will be
                automatically terminated upon termination of your
                Account. Sections 1 , 2 , 3 , 6 , 10- 17, and 20-26
                and any claims for breach of these Terms shall survive
                such termination.
              </p>
              <p
                style={{
                  paddingTop: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                23.2We may, at any time and at our sole discretion,
                limit, suspend or terminate, or issue a
              </p>
              <p
                style={{
                  paddingTop: "6pt",
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "134%",
                  textAlign: "left",
                }}
              >
                warning to you regarding, the Platform or the Account,
                including terminating the Account (or certain
                functionalities thereof such as uploading, receiving,
                sending and/or withdrawing Digital Assets), inter
                alia, if:
              </p>
              <p
                style={{
                  paddingTop: "6pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <ol id="l54">
                <li data-list-text="(a)">
                  <p
                    style={{
                      paddingLeft: "20pt",
                      textIndent: "-13pt",
                      textAlign: "left",
                    }}
                  >
                    we believe it is necessary or desirable to protect
                    the security of the Account;
                  </p>
                  <p
                    style={{
                      paddingTop: "9pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
                <li data-list-text="(b)">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "157%",
                      textAlign: "left",
                    }}
                  >
                    if any transactions are made which we in our sole
                    discretion deems to be (a) made in breach of this
                    Agreement or in breach of the security
                    requirements of the Account; or (b) suspicious,
                  </p>
                  <p
                    style={{
                      paddingTop: "3pt",
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "154%",
                      textAlign: "left",
                    }}
                  >
                    unauthorized or fraudulent, including without
                    limitation in relation to money laundering,
                    terrorism financing, fraud or other illegal
                    activities;
                  </p>
                  <p
                    style={{
                      paddingTop: "3pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
                <li data-list-text="(c)">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "139%",
                      textAlign: "left",
                    }}
                  >
                    if we become aware or suspect that any Digital
                    Assets or funds held in your Account may be
                    associated with criminal proceeds or otherwise are
                    not lawfully possessed by you;
                  </p>
                  <p
                    style={{
                      paddingTop: "7pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
                <li data-list-text="(d)">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "155%",
                      textAlign: "left",
                    }}
                  >
                    upon the insolvency, liquidation, winding up,
                    bankruptcy, administration, receivership or
                    dissolution of User, or where we reasonably
                    consider that there is a threat of the same in
                    relation to you;
                  </p>
                </li>
                <li data-list-text="(e)">
                  <p
                    style={{
                      paddingTop: "9pt",
                      paddingLeft: "20pt",
                      textIndent: "-12pt",
                      textAlign: "left",
                    }}
                  >
                    we are unable to verify or authenticate any
                    information you provided;
                  </p>
                  <p style={{ textIndent: "0pt", textAlign: "left" }}>
                    <br />
                  </p>
                </li>
                <li data-list-text="(f)">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "156%",
                      textAlign: "left",
                    }}
                  >
                    we believe, in our sole and absolute discretion,
                    that your actions may cause legal liability for
                    you, the Platform or other Users of the Platform;
                  </p>
                  <p
                    style={{
                      paddingTop: "4pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
                <li data-list-text="(g)">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "155%",
                      textAlign: "left",
                    }}
                  >
                    we decide to cease operations or to otherwise
                    discontinue any services or options provided by
                    the Platform, or parts thereof;
                  </p>
                  <p
                    style={{
                      paddingTop: "3pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
                <li data-list-text="(h)">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "157%",
                      textAlign: "left",
                    }}
                  >
                    there is a change in your circumstances (including
                    a deterioration in or change to your financial
                    position) which we consider, in our sole
                    discretion, material to the continuation of the
                    Account;
                  </p>
                </li>
                <li data-list-text="(i)">
                  <p
                    style={{
                      paddingTop: "9pt",
                      paddingLeft: "17pt",
                      textIndent: "-9pt",
                      textAlign: "left",
                    }}
                  >
                    we are directed as such by any Governmental
                    Authority;
                  </p>
                  <p
                    style={{
                      paddingTop: "10pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
                <li data-list-text="(j)">
                  <p
                    style={{
                      paddingLeft: "16pt",
                      textIndent: "-9pt",
                      textAlign: "left",
                    }}
                  >
                    we are otherwise required to do so by applicable
                    law;
                  </p>
                  <p style={{ textIndent: "0pt", textAlign: "left" }}>
                    <br />
                  </p>
                </li>
                <li data-list-text="(k)">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "155%",
                      textAlign: "left",
                    }}
                  >
                    there is a disruptive market event that triggers a
                    trade halt; or (l)we otherwise decide in our sole
                    discretion that termination or suspension of the
                    Account, the Platform or the Terms is necessary.
                  </p>
                </li>
              </ol>
              <p
                style={{
                  paddingTop: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <p
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  lineHeight: "157%",
                  textAlign: "justify",
                }}
              >
                2 3 . 3 We have no obligation to inform you of the
                ground or basis for suspending, terminating or
                freezing your Account or any digital assets in your
                Account or other actions we take regarding the Site,
                the Account, or the Platform.
              </p>
              <p
                style={{
                  paddingTop: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <ol id="l55">
                <ol id="l56">
                  <li data-list-text="23.4">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "155%",
                        textAlign: "left",
                      }}
                    >
                      Neither the Company, the Platform nor any third
                      party acting on their behalf shall be liable to
                      you for any suspension, limitation or
                      termination of your Account or your access to
                      any part of the Platform in accordance with this
                      Agreement.
                    </p>
                    <p
                      style={{
                        paddingTop: "4pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="23.5">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "154%",
                        textAlign: "left",
                      }}
                    >
                      You shall not attempt to regain access to the
                      Platform if your access is terminated by us,
                      whether using the same or different username,
                      without our prior written consent.
                    </p>
                  </li>
                  <li data-list-text="23.6">
                    <p
                      style={{
                        paddingTop: "4pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "161%",
                        textAlign: "left",
                      }}
                    >
                      If there is any ongoing transaction on the
                      Account that is subject to the termination
                      procedures, the Company shall have the right to
                      notify your counterparty of the proposed
                      termination.
                    </p>
                    <p
                      style={{
                        paddingTop: "2pt",
                        textIndent: "0pt",
                        textAlign: "left",
                      }}
                    >
                      <br />
                    </p>
                  </li>
                  <li data-list-text="23.7">
                    <p
                      style={{
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        lineHeight: "157%",
                        textAlign: "left",
                      }}
                    >
                      The Company maintains full custody of the
                      assets, funds and user data/information which
                      may be turned over to Governmental Authorities
                      in the event of your Account’s suspension or
                      termination arising from fraud investigations,
                      investigations of violation of law or violation
                      of these Terms. We will not be liable to you,
                      your Authorized Individuals and/or any third
                      party for loss or damage suffered due to delay,
                      transmission errors, technical faults or
                      defects, breakdowns and illegal intrusion or
                      intervention in the information provided and
                      services offered, or any failures or delays in
                      completing any orders or transactions using any
                      Account. Similarly, we will not be liable for
                      any loss or damage
                    </p>
                  </li>
                </ol>
              </ol>
              <p
                className="s4"
                style={{
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                suffered due to delays, technical faults or
                interruptions in the availability
              </p>
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                of the Site, the Platform, or any Account ( including
                maintenance work required by our systems) .
              </p>
              <p
                style={{
                  paddingTop: "6pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
            </li>
            <li data-list-text={24}>
              <p
                className="s1"
                style={{
                  paddingLeft: "37pt",
                  textIndent: "-29pt",
                  textAlign: "left",
                }}
              >
                Records Conclusive
              </p>
              <p
                style={{
                  paddingTop: "12pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <ol id="l57">
                <li data-list-text="24.1">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "158%",
                      textAlign: "left",
                    }}
                  >
                    The calculation and records in the Company’s
                    system in relation to the Platform and any
                    Account, including, but not limited to, the
                    transaction history and balance on any of your
                    Accounts, will be final and conclusive and be
                    binding on each User for all purposes. Each User
                    agrees that such records are admissible in
                    evidence and further undertakes to waive any
                    rights to challenge or dispute the admissibility,
                    reliability, accuracy or the authenticity of the
                    contents of such records merely on the basis that
                    such records were produced by or were the output
                    of a computer system or are set out in electronic
                    form.
                  </p>
                  <p
                    style={{
                      paddingTop: "2pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
              </ol>
            </li>
            <li data-list-text={25}>
              <p
                className="s1"
                style={{
                  paddingLeft: "35pt",
                  textIndent: "-28pt",
                  textAlign: "left",
                }}
              >
                General
              </p>
              <p
                style={{
                  paddingTop: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                <br />
              </p>
              <ol id="l58">
                <li data-list-text="25.1">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "157%",
                      textAlign: "justify",
                    }}
                  >
                    These Terms, including the Privacy Policy and
                    other policies incorporated herein, constitute the
                    entire and only agreement between you and the
                    Company with respect to the subject matter
                  </p>
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "156%",
                      textAlign: "justify",
                    }}
                  >
                    of these Terms, and supersede any and all prior or
                    contemporaneous agreements, representations,
                    warranties and understandings, written or oral,
                    with respect to the subject matter
                  </p>
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "157%",
                      textAlign: "justify",
                    }}
                  >
                    of these Terms. If any provision of these Terms is
                    found to be unlawful, void or for any reason
                    unenforceable, then that provision shall be deemed
                    severable from these Terms and shall not affect
                    the validity and enforceability of any remaining
                    provisions. These Terms may not be changed, waived
                    or modified except by the Company as provided
                    herein. Neither these Terms nor any right,
                    obligation or remedy hereunder is assignable,
                    transferable, delegable or sublicensable by you
                    except with our prior written consent, and any
                    attempted assignment, transfer, delegation or
                    sublicense shall be null and void. No waiver by
                    any party of any breach or default hereunder shall
                    be deemed to be a waiver of any preceding or
                    subsequent breach or
                  </p>
                  <p
                    style={{
                      paddingTop: "3pt",
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "154%",
                      textAlign: "left",
                    }}
                  >
                    default. Any heading, caption or section title
                    contained in these Terms is inserted only as a
                    matter of convenience and in no way defines or
                    explains any section or provision hereof.
                  </p>
                  <p
                    style={{
                      paddingTop: "2pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
              </ol>
            </li>
            <li data-list-text={26}>
              <p
                className="s1"
                style={{
                  paddingLeft: "37pt",
                  textIndent: "-29pt",
                  textAlign: "left",
                }}
              >
                Governing Law and Dispute Resolution
              </p>
              <ol id="l59">
                <li data-list-text="26.1">
                  <p
                    style={{
                      paddingTop: "20pt",
                      paddingLeft: "27pt",
                      textIndent: "-20pt",
                      textAlign: "left",
                    }}
                  >
                    These Terms shall be governed by the laws of
                    Singapore.
                  </p>
                  <p style={{ textIndent: "0pt", textAlign: "left" }}>
                    <br />
                  </p>
                </li>
                <li data-list-text="26.2">
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "157%",
                      textAlign: "left",
                    }}
                  >
                    Any dispute arising out of or in connection with
                    these Terms or the Platform, including any
                    question regarding its existence, validity or
                    termination, shall be referred to and finally
                    resolved by arbitration in Singapore in accordance
                    with the Arbitration Rules of the Singapore
                    International
                  </p>
                  <p
                    style={{
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      lineHeight: "156%",
                      textAlign: "left",
                    }}
                  >
                    Arbitration Centre for the time being in force,
                    which rules are deemed to be incorporated by
                    reference in this clause. The Tribunal shall
                    consist of one (1) arbitrator. The language of the
                    arbitration shall be English. The seat of the
                    arbitration shall be Singapore. Any award is final
                    and may be enforced in any court of competent
                    jurisdiction. The parties shall duly and
                    punctually perform their obligations hereunder
                    pending issuance of the arbitral award.
                  </p>
                  <p
                    style={{
                      paddingTop: "4pt",
                      textIndent: "0pt",
                      textAlign: "left",
                    }}
                  >
                    <br />
                  </p>
                </li>
              </ol>
            </li>
            <li data-list-text={27}>
              <p
                className="s1"
                style={{
                  paddingLeft: "36pt",
                  textIndent: "-29pt",
                  textAlign: "left",
                }}
              >
                Contacting Us
              </p>
            </li>
          </ol>
          <p
            style={{
              paddingTop: "2pt",
              textIndent: "0pt",
              textAlign: "left",
            }}
          >
            <br />
          </p>
          <p
            style={{
              paddingLeft: "7pt",
              textIndent: "0pt",
              lineHeight: "154%",
              textAlign: "left",
            }}
          >
            <a
              href="mailto:support@omtrade.com"
              className="a"
              target="_blank"
              rel="noreferrer"
            >
              You may contact the Company regarding these Terms, the
              Site or the Platform as follows:{" "}
            </a>
            <a
              href="mailto:support@omtrade.com"
              target="_blank"
              rel="noreferrer"
            >
              support@omtrade.com
            </a>
          </p>
        </Box>
      </Container>
    </>
  );
}
