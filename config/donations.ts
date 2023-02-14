import type { Network, Filter, Organization, SortOption } from "../app/types";

// All the cryptocurrency networks must be listed here
const NETWORKS: Network[] = [
  "Bitcoin",
  "Ethereum",
  "Avalanche",
  "Binance",
  "Polygon",
  "Solana",
  "Cosmos",
  "Polkadot",
  "Tron",
  "Mina",
  "Cardano",
  "VeChain",
  "Waves",
  "Tezos",
  "Celo",
  "Gnosis",
  "Aptos",
  "Optimism",
  "Arbitrum",
];

const categoryDetails: Record<string, { name: string; classes: string }> = {
  governmental: {
    name: "Governmental",
    classes: "bg-gray-100 text-gray-800",
  },
  ngo: {
    name: "NGO",
    classes: "bg-green-100 text-green-800",
  },
  dao: {
    name: "DAO",
    classes: "bg-purple-100 text-purple-800",
  },
  individual: {
    name: "Individual",
    classes: "bg-amber-100 text-amber-800",
  },
  turkish: {
    name: "Turkish",
    classes: "bg-red-100 text-red-800",
  },
  international: {
    name: "International",
    classes: "bg-blue-100 text-blue-800",
  },
};

// All of the icons should be SVGs
// Click "raw" and copy the url from the list at https://github.com/spothq/cryptocurrency-icons/tree/master/svg/color
// All option types except "cryptocurrency" and "nft" must have an icon in this map.
// All "cryptocurrency" and "nft" types must have exact names in their respective maps.
const icons: Record<string, any> = {
  cryptocurrencies: {
    Bitcoin: "./icons/options/btc.svg",
    Ethereum: "./icons/options/eth.svg",
    Avalanche: "./icons/options/avax.svg",
    Binance: "./icons/options/bnb.svg",
    Polygon: "./icons/options/matic.svg",
    Solana: "./icons/options/sol.svg",
    Cosmos: "./icons/options/atom.svg",
    Polkadot: "./icons/options/dot.svg",
    Tron: "./icons/options/trx.svg",
    Mina: "./icons/options/mina.jpg",
    Cardano: "./icons/options/ada.svg",
    VeChain: "./icons/options/vet.svg",
    Waves: "./icons/options/waves.svg",
    Tezos: "./icons/options/xtz.svg",
    Celo: "./icons/options/celo.svg",
    Gnosis: "./icons/options/gnosis.svg",
    Aptos: "./icons/options/aptos.svg",
    Optimism: "./icons/options/optimism.svg",
    Arbitrum: "./icons/options/arbitrum.svg",
  },
  bank: "./icons/options/bank.svg",
  btcturk: "./icons/options/btcturk.svg",
  card: "./icons/options/card.svg",
  nft: "./icons/options/nft.svg",
  giveth: "./icons/options/giveth.svg",
};

// All entries must have the following: name, description, logoUrl, websiteUrl, twitterUrl, popularity, endorsementUrls, categories, options
// Categories must include:
//   * One of: governmental, ngo, individual
//   * One of: turkish, international
// All options must have the following: type, name
//   * If an option has "cryptocurrency" type, it must include: address, sourceUrls
//   * If an option has another type, it must include: linkName, linkUrl
//   * Options could have the following: info, warning
const organizations: Organization[] = [
  {
    name: "Ahbap",
    description:
      "A Turkey based non-profit organization established on the principles of solidarity and cooperation, founded by the Turkish musician and philanthropist, Haluk Levent.",
    logoUrl: "./icons/organizations/ahbap.png",
    websiteUrl: "https://ahbap.org/",
    twitterUrl: "https://twitter.com/ahbap",
    popularity: 10,
    endorsementUrls: [
      "https://twitter.com/avalancheavax/status/1622975707528962049",
    ],
    categories: ["turkish", "ngo"],
    options: [
      {
        type: "cryptocurrency",
        name: "Ethereum",
        address: "0xe1935271D1993434A1a59fE08f24891Dc5F398Cd",
        sourceUrls: ["https://twitter.com/ahbap/status/1622963311514996739"],
      },
      {
        type: "cryptocurrency",
        name: "Avalanche",
        address: "0x868D27c361682462536DfE361f2e20B3A6f4dDD8",
        sourceUrls: ["https://twitter.com/ahbap/status/1622963311514996739"],
      },
      {
        type: "cryptocurrency",
        name: "Binance",
        address: "0xB67705398fEd380a1CE02e77095fed64f8aCe463",
        sourceUrls: ["https://twitter.com/ahbap/status/1622963311514996739"],
      },
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address:
          "bc1q0qk6088ysn5d3573wqky37xtlhaw3lta8eaqdslgz4840lrtefssxsp0p5",
        sourceUrls: ["https://donation.btcturk.com/"],
      },
      {
        type: "cryptocurrency",
        name: "Ethereum",
        address: "0x05F4510501B11388c71d657044b7Bf52e2637FaC",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send ETH or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Arbitrum",
        address: "0x8888759373137b84e9f0ef13ecb13e321c251ee3",
        sourceUrls: [
          "https://twitter.com/ConnextNetwork/status/1624413515611009024",
        ],
        info: "Bridged through a trustless and audited contract",
      },
      {
        type: "cryptocurrency",
        name: "Optimism",
        address: "0x8888759373137b84e9f0ef13ecb13e321c251ee3",
        sourceUrls: [
          "https://twitter.com/ConnextNetwork/status/1624413515611009024",
        ],
        info: "Bridged through a trustless and audited contract",
      },
      {
        type: "cryptocurrency",
        name: "Tron",
        address: "TYgthAAfSjkEb8FUsQRJXsf7xoFyAZVmQN",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Polkadot",
        address: "153N7YvYpv9KgViCUSRm1j2MXEgcqX24tk7jno6V1oqudHhQ",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send DOT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Cosmos",
        address: "cosmos1xlp4k2yz6zhhqxlp0hwdfqlpsz9k9gru3ezese",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send ATOM with MEMO: 1142115728209",
      },
      {
        type: "cryptocurrency",
        name: "Avalanche",
        address: "0x05F4510501B11388c71d657044b7Bf52e2637FaC",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send AVAX or USDT as this is an exchange wallet",
      },
      {
        type: "bank",
        name: "Bank Wire",
        linkName: "The list of Ahbap bank accounts on their official website",
        linkUrl: "https://ahbap.org/disasters-turkey",
      },
    ],
  },
  {
    name: "Needs Map (İhtiyaç Haritası)",
    description:
      "An online social platform cooperative based in Türkiye, where individuals and organizations wishing to support those in need can connect",
    logoUrl: "./icons/organizations/needsmap.png",
    websiteUrl: "https://www.needsmap.coop/",
    twitterUrl: "https://twitter.com/ihtiyacharitasi",
    popularity: 1,
    endorsementUrls: [
      "https://twitter.com/iksv_istanbul/status/1622936410704560129",
    ], // Turkish
    categories: ["turkish", "ngo"],
    options: [
      {
        type: "cryptocurrency",
        name: "Ethereum",
        address: "0xbe4cde5eeeed1f0a97a9457f6ef5b71eae108652",
        sourceUrls: [
          "https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/",
        ], // Turkish
        warning:
          "Only send ETH, USDC, USDT or TRYC as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address: "3PkihQfm6doGW41uZ5Q9GFNw6XpEK5g9Vk",
        sourceUrls: [
          "https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/",
        ], // Turkish
      },
      {
        type: "cryptocurrency",
        name: "Polygon",
        address: "0xbe4cde5eeeed1f0a97a9457f6ef5b71eae108652",
        sourceUrls: [
          "https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/",
        ], // Turkish
        warning: "Only send MATIC as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Solana",
        address: "Fjo5AeFMbUD6gjoWKbVuMXRcPsjpXKksjKLxPFuXQhaK",
        sourceUrls: [
          "https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/",
        ], // Turkish
        warning: "Only send SOL as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Cosmos",
        address: "cosmos1dm68mx9jcsyqkyzp3up7gmnu3ku84v8gf6v75u",
        sourceUrls: [
          "https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/",
        ], // Turkish
        warning: "Only send ATOM with MEMO: 624143",
      },
      {
        type: "cryptocurrency",
        name: "Polkadot",
        address: "1haY6iHgLopw2WWmPhcdCy2jwzL2jthbNL515rUyJtnmhUt",
        sourceUrls: [
          "https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/",
        ], // Turkish
        warning: "Only send DOT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tron",
        address: "TUAum5Q3GWZvzsS1yQaDdjkDAzp3HbvKTT",
        sourceUrls: [
          "https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/",
        ], // Turkish
        warning: "Only send TRX as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Mina",
        address: "B62qkRvhLCRoZikpAKicKnMmQ9vSX8FYq5owXn5P7yPbDHDigya7zsS",
        sourceUrls: [
          "https://twitter.com/o1_labs/status/1623410090249183232",
          "https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/",
        ], // Turkish
        info: "Matched 1:1 by BtcTurk",
        warning: "Only send Mina as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Aptos",
        address:
          "0x9de5a9b2b213de4c4de3f110d78d0d4e8097c64dd6cc82a547e9859bdac91d47",
        sourceUrls: [
          "https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/",
        ],
      },
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address:
          "bc1q8f498j7ph7n2gumfzlxg9tjg8hx3gu94vhwe95zh8dw047dk52pqmus3dl",
        sourceUrls: ["https://donation.btcturk.com/"],
      },
      {
        type: "cryptocurrency",
        name: "Ethereum",
        address: "0x68e0150f1C36751b8edb9310Dbc9eDEb72FF9194",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send ETH or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Avalanche",
        address: "0x68e0150f1C36751b8edb9310Dbc9eDEb72FF9194",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send AVAX or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Avalanche",
        address: "X-avax19gqcmy3l5rynsp5xcnndzpgstcpmvshwqmasj6",
        sourceUrls: ["https://donation.btcturk.com/"],
        info: "X-Chain adress",
        warning: "Only send Avax as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Polkadot",
        address: "14kfH529He4hRJHda7n1ZAes3mMtiKu7Ua4RV4qR1D6ytCkg",
        sourceUrls: ["https://donation.btcturk.com/"], // Turkish
        warning: "Only send DOT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tron",
        address: "TEP5etbKtdZdQZJn4tnYMK6faL6K4TPtQ3",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Cosmos",
        address: "cosmos1xlp4k2yz6zhhqxlp0hwdfqlpsz9k9gru3ezese",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send ATOM with MEMO: 5740025727779",
      },
      {
        type: "card",
        name: "Card",
        linkName: "Option of Credit Card on their official website",
        linkUrl: "https://fonzip.com/ihtiyacharitasi/onlineimece",
      },
    ],
  },
  {
    name: "Anka Relief DAO",
    description:
      "Multi-sig crypto relief fund operated by industry leaders to support the people of Türkiye after the disastrous earthquakes that hit the region.",
    logoUrl: "./icons/organizations/anka.png",
    websiteUrl: "https://ankarelief.org",
    twitterUrl: "https://twitter.com/ankarelief",
    popularity: 5,
    endorsementUrls: [],
    categories: ["international", "dao"],
    options: [
      {
        type: "cryptocurrency",
        name: "Ethereum",
        address: "0xCE4d5B5933B369e9c937ffCfBB9e3aeb3d2c265B",
        sourceUrls: ["https://ankarelief.org"],
      },
      {
        type: "cryptocurrency",
        name: "Avalanche",
        address: "0xEFC8e3472c782E74b64212191F17C1463645cc4A",
        sourceUrls: ["https://ankarelief.org"],
      },
      {
        type: "cryptocurrency",
        name: "Binance",
        address: "0x0aC81b9737E44b748B5498D05CFE43CEfB2F55d2",
        sourceUrls: ["https://ankarelief.org"],
      },
      {
        type: "cryptocurrency",
        name: "Celo",
        address: "0x5e9E52e9789F670F80A7de6e438cC491878981B8",
        sourceUrls: ["https://ankarelief.org"],
      },
      {
        type: "cryptocurrency",
        name: "Gnosis",
        address: "0xc1460588cA2BcAEB28c80327413e91655505A784",
        sourceUrls: ["https://ankarelief.org"],
      },
      {
        type: "cryptocurrency",
        name: "Polygon",
        address: "0x6aAb7738A646ED1E355a838807b7B7F1B2e60bE4",
        sourceUrls: ["https://ankarelief.org"],
      },
      {
        type: "cryptocurrency",
        name: "Optimism",
        address: "0xb88A1deaE6a5dA84B15BBD272E550bd9e87b8a5B",
        sourceUrls: ["https://ankarelief.org"],
      },
    ],
  },
  {
    name: "Community Volunteers Foundation",
    description:
      "The Community Volunteer Foundation is a Turkish organization that helps young people uncover their potential through education and project development, while also addressing their housing, scholarship, and cultural needs.",
    logoUrl: "./icons/organizations/tog.svg",
    websiteUrl: "https://www.tog.org.tr/",
    twitterUrl: "https://twitter.com/TOGVakfi",
    popularity: 4,
    endorsementUrls: [
      "https://www.tog.org.tr/destekcilerimiz/kurumsal-destekcilerimiz/",
    ], // Turkish
    categories: ["turkish", "ngo"],
    options: [
      {
        type: "cryptocurrency",
        name: "Ethereum",
        address: "0x9b40f98ccc326beaa0bfb94cfa8bfc6383a267e5",
        sourceUrls: [
          "https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/",
        ], // Turkish
        warning: "Only send ETH as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tron",
        address: "TCJ2qvKJsXE4XZD2VcyeppDWmZUGfLShMm",
        sourceUrls: [
          "https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/",
        ], // Turkish
        warning: "Only send TRX as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Aptos",
        address:
          "0x2ac53451cc6ffa5f0e4237413d73e6c5ed522c6e1ebfc9692a995cfde259e292",
        sourceUrls: [
          "https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/",
        ],
      },
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address:
          "bc1qs55dek82kzej5grqf73sd03hhpyyjdjf4zshnljwukuf72q6uekqhwznrg",
        sourceUrls: ["https://donation.btcturk.com/"],
      },
      {
        type: "cryptocurrency",
        name: "Ethereum",
        address: "0x321C6e791Aa2Ebb6fc09C2035EA7BcC4c5eaaf8B",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send ETH or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tron",
        address: "TVTAdysqTQTpw36mLbUeaHM1zUkuuByXKZ",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send USDT as this is an exchange wallet",
      },
      {
        type: "card",
        name: "Card",
        linkName: "Option of Credit Card on their official website",
        linkUrl: "https://www.tog.org.tr/bagisci-ol/#tek-seferlik-bagis",
      },
      {
        type: "bank",
        name: "Bank Wire",
        linkName: "The list of bank accounts on the official website",
        linkUrl:
          "https://www.tog.org.tr/bagisci-ol/#1630673115839-aeef1bfb-85a7",
      },
    ],
  },
  {
    name: "Support To Life",
    description:
      "Support to Life is an independent humanitarian organization founded with the principle aim of helping disaster affected communities meet their basic needs and rights.",
    logoUrl: "./icons/organizations/support-to-life.jpg",
    websiteUrl: "https://www.supporttolife.org/",
    twitterUrl: "https://twitter.com/Support2Life",
    popularity: 2,
    endorsementUrls: [],
    categories: ["turkish", "ngo"],
    options: [
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address:
          "bc1qrc6ujsk7eeex44e4h2hqpxxvshrr8nqfzq4uqgcq309en99nvmjsxh50n7",
        sourceUrls: ["https://donation.btcturk.com/"],
      },
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address: "3KiXAfrSRH2yrcNGTy6TDrW4WyHdiRAeU5",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
      },
      {
        type: "cryptocurrency",
        name: "Ethereum",
        address: "0x17517d7e79543750983735B0Fe3Ec6aff8eFD55f",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send ETH or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Ethereum",
        address: "0x9842453c14f3d0eda2073259a258ee2bdee827a8",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send ETH or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Solana",
        address: "GgVMLWkTa2RCfyYAvuWvJKtK4br328hsM9ZTuvYTh39V",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send SOL as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Avalanche",
        address: "X-avax19ct5xw2ft6zka0u6rapzce60j2pztt92dntz2z",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        info: "X-Chain adress",
        warning: "Only send Avax as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tron",
        address: "TFw4MPc55BadD5uaGu2Fgs7P5r2YbJ7mWb",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send TRX or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tron",
        address: "TD9BcpkuG5sqGHCn45WEkB3w9pbQrceHg7",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send TRX or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Polkadot",
        address: "15fNaFrochwskFaaRkUf4rmqtRSSuhAk8AYvs1B64S5yET3S",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send DOT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Cosmos",
        address: "cosmos1dm68mx9jcsyqkyzp3up7gmnu3ku84v8gf6v75u",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send ATOM with MEMO: 927971",
      },
      {
        type: "cryptocurrency",
        name: "Tezos",
        address: "tz1hJamAyDpbFNF4puTBfmHAbhjY7z6S5DVj",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send XTZ as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Cardano",
        address:
          "DdzFFzCqrht4CaZRfFTHiuqmfSM11SA2uXkQGq65JoszmS2qBEr5VAPmhzq7LqNdBCYgC9cXJdHgmgbfHRYU6ZQ6khAdAHzUT7B3YTV9",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send ADA as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Mina",
        address: "B62qrkTWva5KF5y3gTA48niq5nB62K9rsxRt7un4NC53b2CC4r4Jvdd",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send Mina as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Waves",
        address: "3PN2xHEUCzHR9bE2RQfBsQzwqgdbvqPRojV",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send Waves as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "VeChain",
        address: "0x3660bde41fb6f596e57a24dc89354b0556b62549",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send VET as this is an exchange wallet",
      },
      {
        type: "card",
        name: "Card",
        linkName: "Option of Credit Card on their official website",
        linkUrl: "https://www.supporttolife.org/donate/",
      },
      {
        type: "bank",
        name: "Bank Wire",
        linkName: "The list of bank accounts on the official website",
        linkUrl:
          "https://www.supporttolife.org/support-us/donate-by-money-transfer/",
      },
    ],
  },
  {
    name: "AFAD",
    description:
      "Disaster and Emergency Management Authority, an institution working to prevent disasters and minimize disaster-related damages, plan and coordinate post-disaster response, and promote cooperation among various government agencies.",
    logoUrl: "./icons/organizations/afad.svg",
    websiteUrl: "https://en.afad.gov.tr/",
    twitterUrl: "https://twitter.com/AFADTurkiye",
    popularity: 6,
    endorsementUrls: [],
    categories: ["turkish", "governmental"],
    options: [
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address:
          "bc1q30uv6s9gwyzq2fd5hhc06v7xge3zzg3qa99vuv0w5dfmxgq8vnws97dpcl",
        sourceUrls: [
          "https://donation.btcturk.com/",
          "https://twitter.com/btcturkpro/status/1623344419976929282",
        ],
      },
      {
        type: "cryptocurrency",
        name: "Ethereum",
        address: "0x64A994CC850a56e87331d880A23A69b16dbFC8ea",
        sourceUrls: [
          "https://donation.btcturk.com/",
          "https://twitter.com/btcturkpro/status/1623344419976929282",
        ],
        warning: "Only send ETH or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Aptos",
        address:
          "0x6f2851b551dd92f1743ad85cdf904a09141231b184446edab9ad0d603d4c461b",
        sourceUrls: [
          "https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/",
        ],
      },
      {
        type: "cryptocurrency",
        name: "Avalanche",
        address: "0x64A994CC850a56e87331d880A23A69b16dbFC8ea",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send AVAX or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Avalanche",
        address: "X-avax10vy5l9ze8e40vfdtpvg8rd6rnzunxqy5j58ugw",
        sourceUrls: ["https://donation.btcturk.com/"],
        info: "X-Chain adress",
        warning: "Only send Avax as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tron",
        address: "TTLfZCo1hnsiviBns2ZsWig1dHWJsG5ct8",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Cosmos",
        address: "cosmos1xlp4k2yz6zhhqxlp0hwdfqlpsz9k9gru3ezese",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send ATOM with MEMO: 6905415726807",
      },
      {
        type: "bank",
        name: "Bank Wire",
        linkName: "The list of AFAD bank accounts on their official website",
        linkUrl: "https://en.afad.gov.tr/earthquake-donation-accounts",
      },
      {
        type: "btcturk",
        name: "BtcTurk",
        linkName: "Instructions for donating Turkish Lira from BtcTurk",
        linkUrl: "https://pro.btcturk.com/deprem-bagis",
        info: "Matched 1:1 by BtcTurk",
        warning: "Only Turkish citizens can register to BtcTurk",
      },
    ],
  },
  {
    name: "Basic Needs Association (TIDER)",
    description:
      "TIDER is a non-governmental organization which strives to serve as a solution for one of the planet’s biggest problems by reducing waste, on the one hand, while undertaking activities to ensure people’s access to basic needs in a fair and equal manner, on the other.",
    logoUrl: "./icons/organizations/tider.png",
    websiteUrl: "https://www.tider.org",
    twitterUrl: "https://twitter.com/Tidersosyal",
    popularity: 2,
    endorsementUrls: [
      "https://twitter.com/btcturkpro/status/1623198411263557635?s=20&t=XtLgxLwHQYPw_2M03jmf1g",
    ],
    categories: ["turkish", "ngo"],
    options: [
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address:
          "bc1qv5h603jjzhahtlyvarnkxcldjh0r852q8hpzr2j0wf9eemt43kfsasz7p9",
        sourceUrls: ["https://donation.btcturk.com/"],
      },
      {
        type: "cryptocurrency",
        name: "Ethereum",
        address: "0xf4016873Cca7c516CE2e5659Ccbb55b2E7AC58c9",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send ETH or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tron",
        address: "TWQjebuyZD5o1HhJEuAUijbj152KQCzXrA",
        sourceUrls: ["https://donation.btcturk.com/"], // Turkish
        warning: "Only send TRX or USDT as this is an exchange wallet",
      },
      {
        type: "card",
        name: "Card",
        linkName: "Option of Credit Card on their official website",
        linkUrl: "https://www.tider.org/eng/donate",
      },
    ],
  },
  {
    name: "Turkish Red Crescent (Kızılay)",
    description:
      "Kızılay is a Turkish humanitarian organization that provides disaster relief, organizes blood drives, and provides other services.",
    logoUrl: "./icons/organizations/kizilay.svg",
    websiteUrl: "https://www.kizilay.org.tr/",
    twitterUrl: "https://twitter.com/kizilay",
    popularity: 2,
    endorsementUrls: [
      "https://twitter.com/anadoluajansi/status/1623621477017997314?s=20&t=-6BowcezBT_2LEnCLIYo4Q",
    ], // Turkish
    categories: ["turkish", "ngo"],
    options: [
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address:
          "bc1qe5vk78kmzq3v9xry3c9w7u09g0q9fvhsvuvsq5t6lvzfzatsdygs2whz3u",
        sourceUrls: ["https://donation.btcturk.com/"],
      },
      {
        type: "cryptocurrency",
        name: "Ethereum",
        address: "0x1fc82b7a62c0414163A332693Ec66EC91f4cd1dE",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send ETH or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tron",
        address: "TWyAHQNttueddv5Hp9B1dAnBVrDNqBjrCo",
        sourceUrls: ["https://donation.btcturk.com/"], // Turkish
        warning: "Only send TRX or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Avalanche",
        address: "0x1fc82b7a62c0414163A332693Ec66EC91f4cd1dE",
        sourceUrls: [
          "https://www.kizilay.org.tr/donation-methods/crypto-donation-accountwallet-informations",
        ],
        warning: "Only send Avax, USDT or USDC as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Polkadot",
        address: "14FzHs6ESUbBdynBXMd26VSF9yZV6SGX1nWfffBh9MWAfL2KPo",
        sourceUrls: [
          "https://www.kizilay.org.tr/donation-methods/crypto-donation-accountwallet-informations",
        ],
        warning: "Only send DOT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Cosmos",
        address: "cosmos1xlp4k2yz6zhhqxlp0hwdfqlpsz9k9gru3ezese",
        sourceUrls: [
          "https://www.kizilay.org.tr/donation-methods/crypto-donation-accountwallet-informations",
        ],
        warning: "Only send ATOM with MEMO: 6719295726938",
      },
      {
        type: "cryptocurrency",
        name: "Avalanche",
        address: "X-avax1a4w3ld27ga4flznmkt5hpvm4karc0njfl85lws",
        sourceUrls: ["https://donation.btcturk.com/"],
        info: "X-Chain adress",
        warning: "Only send AVAX as this is an exchange wallet",
      },
      {
        type: "card",
        name: "Card",
        linkName: "Option of Credit Card on their official website",
        linkUrl:
          "https://www.kizilay.org.tr/Bagis/BagisYap/43/general-donation",
      },
      {
        type: "bank",
        name: "Bank Wire",
        linkName: "The list of bank accounts on the official website",
        linkUrl:
          "https://www.kizilay.org.tr/donation-methods/bank-account-numbers",
      },
    ],
  },
  {
    name: "AKUT",
    description:
      "AKUT (Research & Rescue Association) is entirely a voluntary, non-governmental organization involved in searching, assisting and rescuing all who require aid within its authority and means, in mountain or other nature-related accidents, natural disasters and all other emergency conditions by means of trained, disciplined, high-standard personnel and equipment, passing on knowledge to society with no political affiliation.",
    logoUrl: "./icons/organizations/akut.png",
    websiteUrl: "https://www.akut.org.tr/",
    twitterUrl: "https://twitter.com/akut_dernegi",
    popularity: 2,
    endorsementUrls: ["https://www.akut.org.tr/destekci-listesi"],
    categories: ["turkish", "ngo"],
    options: [
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address:
          "bc1qd7lw5ntzme45ej2y3wetr8zzaqpe68fj9t3trtpurwh9g3qrs0as4lw6lg",
        sourceUrls: ["https://donation.btcturk.com/"],
      },
      {
        type: "cryptocurrency",
        name: "Ethereum",
        address: "0x3b816b03B9b6b46376D5423C62aFBb311ff9218F",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send ETH or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tron",
        address: "TGuzb2kjX9kNgCuay6qNpV49W8mawmeGBs",
        sourceUrls: ["https://donation.btcturk.com/"], // Turkish
        warning: "Only send USDT or TRX as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Avalanche",
        address: "0x3b816b03B9b6b46376D5423C62aFBb311ff9218F",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send AVAX or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Avalanche",
        address: "X-avax1u60cj9cugua39kfysng98ht4la20qs4ke8au20",
        sourceUrls: ["https://donation.btcturk.com/"],
        info: "X-Chain adress",
        warning: "Only send AVAX as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Cosmos",
        address: "cosmos1xlp4k2yz6zhhqxlp0hwdfqlpsz9k9gru3ezese",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send ATOM with MEMO: 6638455727116",
      },
      {
        type: "card",
        name: "Card",
        linkName: "Option of Credit Card on their official website",
        linkUrl: "https://www.akut.org.tr/bagis-yap",
      },
      {
        type: "bank",
        name: "Bank Wire",
        linkName: "The list of bank accounts on the official website",
        linkUrl: "https://www.akut.org.tr/en/donation",
      },
    ],
  },
  {
    name: "Nef Foundation",
    description:
      "Nef Foundation started working in 2015 under the umbrella of NEF to create a difference and awareness in people's lives; it touches on creating original, innovative, and permanent values ​​to develop social potential and pass on the understanding of social sensitivity to future generations. Dealing with people's problems and adding value to their lives requires taking action rather than showing directions.",
    logoUrl: "./icons/organizations/nef.jpg",
    websiteUrl: "https://nefvakfi.org/",
    twitterUrl: "https://twitter.com/nefvakfi",
    popularity: 2,
    endorsementUrls: [
      "https://www.nefvakfi.org/projeler.php?page=kentsel_vizyon#tab-two",
    ],
    categories: ["turkish", "ngo"],
    options: [
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address:
          "bc1q7vyykxcdfgjn2r4t839rzsn6wqxlh6shxvlhpkjaxxrtdvc77qqq62fwf0",
        sourceUrls: ["https://donation.btcturk.com/"],
      },
      {
        type: "cryptocurrency",
        name: "Ethereum",
        address: "0x25d1A1F25aF8340Ab45dB7f1686F5A225BF9e07E",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send ETH or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tron",
        address: "TUSnyKAjXnhPJw7fNM7MFBnTN63x2q2jvs",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send TRX or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Avalanche",
        address: "0x25d1A1F25aF8340Ab45dB7f1686F5A225BF9e07E",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send AVAX or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Avalanche",
        address: "X-avax1w26qa49grznfed5sfg8gkydmzc85xaapkjsaux",
        sourceUrls: ["https://donation.btcturk.com/"],
        info: "X-Chain adress",
        warning: "Only send AVAX as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Polkadot",
        address: "13YAwQZ91CeENyBPE8iBRxRhGgefFznVWnUvNYYuhhrYEh35",
        sourceUrls: ["https://donation.btcturk.com/"], // Turkish
        warning: "Only send DOT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Cosmos",
        address: "cosmos1xlp4k2yz6zhhqxlp0hwdfqlpsz9k9gru3ezese",
        sourceUrls: ["https://donation.btcturk.com/"],
        warning: "Only send ATOM with MEMO: 2840455727144",
      },
    ],
  },
  {
    name: "UNICEF in Turkiye",
    description:
      "UNICEF is committed to supporting the development of adolescents and to support them to form and express their opinions on issues that concern them.",
    logoUrl: "./icons/organizations/unicef.svg",
    websiteUrl: "https://www.unicef.org/turkiye/",
    twitterUrl: "https://twitter.com/unicefturk",
    popularity: 2,
    endorsementUrls: [
      "https://twitter.com/unicefturk/status/1623032942762110976",
    ],
    categories: ["international", "ngo"],
    options: [
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address: "36h4o3mqLfm5xD6f92qEeXvxUbuYG1VnaT",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
      },
      {
        type: "cryptocurrency",
        name: "Ethereum",
        address: "0x93d9ef15f0b410abcbb599d2e6acc1afad97363f",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning:
          "Only send ETH, USDC, USDT or TRYC as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tron",
        address: "TWdMUR43UnZ29NGowVMi6qK4NxussAi2RZ",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send TRX or USDT as this is an exchange wallet",
      },
    ],
  },
  {
    name: "Foundation For The Support of Women’s Work",
    description:
      "The Foundation for the Evaluation of Women's Work was established in 1986 to improve the economic situation and quality of life of women.",
    logoUrl: "./icons/organizations/kedv.png",
    websiteUrl: "https://www.kedv.org.tr/",
    twitterUrl: "https://twitter.com/KedvTurkiye/",
    popularity: 2,
    endorsementUrls: ["https://www.kedv.org.tr/basinda-kedv"], // Turkish
    categories: ["turkish", "ngo"],
    options: [
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address: "38gamXVGr7CqHKedeLu3fdTtmPzA2kgNtM",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
      },
      {
        type: "cryptocurrency",
        name: "Ethereum",
        address: "0x307efd869e7c6ce8308ff2f8b999e17b64f27b4c",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send ETH, USDC, USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Avalanche",
        address: "X-avax1uch76pculzajk7np64h23ckslwdfa4lrc80nct ",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        info: "X-Chain adress",
        warning: "Only send AVAX as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Solana",
        address: "56zuaUkveguQfwKYiaj1qHkBpPwcApo8YR9asG96xbEb",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send SOL as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Polkadot",
        address: "13J8D6edr5mZcVkvJkmeQJPv1MqamYXugBUmH74g3jzeFJ4u",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send DOT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tron",
        address: "TYofnJGV7jjVLff65x3147D5wenMcibQRN",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send TRX or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Cardano",
        address:
          "DdzFFzCqrht2Fdp1rgYFX6NE6A3uVdwTFvPN15YLUcktzMfqPfXjZcGXbKRJBywFi2sheB5kpRTN2R497S6wVre1bD1QxHK475nuNusy",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send ADA as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "VeChain",
        address: "0xfe059318c58b083b550bdb315e6927bf6e84b9b4",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send VET as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Waves",
        address: "3PBQ5xjeDu7FvX2j8bR95LoC2t4dGRcxwLZ",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send WAVES as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Cosmos",
        address: "cosmos1dm68mx9jcsyqkyzp3up7gmnu3ku84v8gf6v75u",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        warning: "Only send ATOM with MEMO: 816209",
      },
      {
        type: "cryptocurrency",
        name: "Mina",
        address: "B62qoDBa6AkhBM8FodMbWfbDJoDBvf2gqxEVHFJ3X6agqwuZ6q6yNxZ",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        info: "https://twitter.com/o1_labs/status/1623410090249183232",
        warning: "Only send MINA as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tezos",
        address: "tz1bi4cYzyfS899XqTcR62wGJP8HwJ89JaA7",
        sourceUrls: [
          "https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/",
        ],
        info: "https://twitter.com/o1_labs/status/1623410090249183232",
        warning: "Only send XTZ as this is an exchange wallet",
      },
    ],
  },
  {
    name: "Gnosis DAO",
    description:
      "Team of experts within Gnosis Chain and its ecosystem and currently contributing in the Community, Communication and Marketing team.",
    logoUrl: "./icons/organizations/gnosis.svg",
    websiteUrl: "https://www.gnosis.io/gnosisdao",
    twitterUrl: "https://twitter.com/GnosisDAO",
    popularity: 1,
    endorsementUrls: [
      "https://twitter.com/Givethio/status/1623493391395815428?s=20&t=hTSxUyujyIj_o4ucioeNNA",
    ],
    categories: ["international", "dao"],
    options: [
      {
        type: "giveth",
        name: "Giveth",
        linkName: "Donate crypto with Giveth",
        linkUrl: "https://giveth.io/donate/gnosisdao-earthquake-relief",
        sourceUrls: [
          "https://twitter.com/Givethio/status/1623493391395815428?s=20&t=hTSxUyujyIj_o4ucioeNNA",
        ],
      },
    ],
  },
  {
    name: "Bankless DAO",
    description:
      "BanklessDAO is a decentralized community with one mission: Help the world.",
    logoUrl: "./icons/organizations/bankless.svg",
    websiteUrl: "https://www.bankless.community/",
    twitterUrl: "https://twitter.com/banklessDAO",
    popularity: 1,
    endorsementUrls: [
      "https://twitter.com/Givethio/status/1623493672149843969?s=20",
    ],
    categories: ["international", "dao"],
    options: [
      {
        type: "giveth",
        name: "Giveth",
        linkName: "Donate crypto with Giveth",
        linkUrl:
          "https://giveth.io/donate/banklessdao-turkey-disaster-relief-fund",
        sourceUrls: [
          "https://twitter.com/Givethio/status/1623493672149843969?s=20",
        ],
      },
    ],
  },
  {
    name: "Visualize Value",
    description:
      "Funds routed directly to Doctors Without Borders via The Giving Block for crisis relief in the wake of the 7.8 magnitude earthquake in Turkey and Syria.",
    logoUrl: "./icons/organizations/humanity-check.png",
    websiteUrl: "https://app.manifold.xyz/c/humanitycheck",
    twitterUrl: "https://twitter.com/visualizevalue",
    popularity: 2,
    endorsementUrls: [
      "https://twitter.com/jackbutcher/status/1622696145741877277",
    ],
    categories: ["international", "individual"],
    options: [
      {
        type: "nft",
        name: "NFT",
        linkName: "Mint Humanity Check NFTs",
        linkUrl: "https://app.manifold.xyz/c/humanitycheck",
      },
    ],
  },
  {
    name: "Earthquake Türkiye 2023 by Murat Pak",
    description:
      "Distinguished Turkish NFT artist Pak has built an NFT platform for raising funds for the relief effort. All donations are promised to be channelled to Ahbap.",
    logoUrl: "./icons/organizations/cause.svg",
    websiteUrl: "https://cause.quest/",
    twitterUrl: "https://twitter.com/muratpak",
    popularity: 2,
    endorsementUrls: ["https://twitter.com/beeple/status/1623107218567581697"],
    categories: ["turkish", "individual"],
    options: [
      {
        type: "nft",
        name: "NFT",
        linkName: "Mint Earthquake Türkiye 2023 NFTs",
        linkUrl: "https://cause.quest",
        warning: "Non-transferable",
      },
    ],
  },
];

const sortOptions: SortOption[] = ["Suggested", "Most Popular"];

const initialFilters: Filter[] = [
  {
    id: "types",
    name: "Donation Types",
    options: [
      { id: "cryptocurrency", label: "Cryptocurrencies", checked: true },
      { id: "nft", label: "NFTs", checked: true },
      { id: "card", label: "Card", checked: true },
      { id: "bank", label: "Bank Wire", checked: true },
      { id: "giveth", label: "Giveth", checked: true },
      { id: "btcturk", label: "Other", checked: true },
    ],
  },
  {
    id: "cryptocurrencies",
    name: "Cryptocurrency Networks",
    options: [
      { id: "Bitcoin", label: "Bitcoin", checked: true },
      { id: "Ethereum", label: "Ethereum", checked: true },
      { id: "Avalanche", label: "Avalanche", checked: true },
      { id: "Binance", label: "Binance", checked: true },
      { id: "Polygon", label: "Polygon", checked: true },
      { id: "Solana", label: "Solana", checked: true },
      { id: "Cosmos", label: "Cosmos", checked: true },
      { id: "Polkadot", label: "Polkadot", checked: true },
      { id: "Tron", label: "Tron", checked: true },
      { id: "Mina", label: "Mina", checked: true },
      { id: "Cardano", label: "Cardano", checked: true },
      { id: "VeChain", label: "VeChain", checked: true },
      { id: "Waves", label: "Waves", checked: true },
      { id: "Tezos", label: "Tezos", checked: true },
      { id: "Celo", label: "Celo", checked: true },
      { id: "Gnosis", label: "Gnosis", checked: true },
      { id: "Aptos", label: "Aptos", checked: true },
      { id: "Optimism", label: "Optimism", checked: true },
      { id: "Arbitrum", label: "Arbitrum", checked: true },
    ],
  },
  {
    id: "categories",
    name: "Categories",
    options: [
      { id: "governmental", label: "Governmental", checked: true },
      { id: "ngo", label: "NGO", checked: true },
      { id: "dao", label: "DAO", checked: true },
      { id: "individual", label: "Individual", checked: true },
      { id: "turkish", label: "Turkish", checked: true },
      { id: "international", label: "International", checked: true },
    ],
  },
];

const explorers: Record<string, string> = {
  Bitcoin: "https://www.blockchain.com/explorer/addresses/btc/",
  Ethereum: "https://etherscan.io/address/",
  Avalanche: "https://snowtrace.io/address/",
  Binance: "https://bscscan.com/address/",
  Polygon: "https://polygonscan.com/address/",
  Solana: "https://solscan.io/account/",
  Cosmos: "https://www.mintscan.io/cosmos/account/",
  Polkadot: "https://explorer.polkascan.io/polkadot/account/",
  Tron: "https://tronscan.org/#/address/",
  Mina: "https://minascan.io/mainnet/account/",
  Cardano: "https://cardanoscan.io/address/",
  VeChain: "https://explore.vechain.org/accounts//",
  Waves: "https://wavesexplorer.com/addresses/",
  Tezos: "https://tzstats.com/",
  Celo: "https://celoscan.io/address/",
  Gnosis: "https://gnosisscan.io/address/",
  Aptos: "https://explorer.aptoslabs.com/account/",
  Optimism: "https://optimistic.etherscan.io/address/",
  Arbitrum: "https://arbiscan.io/address/",
};

export {
  categoryDetails,
  icons,
  organizations,
  sortOptions,
  initialFilters,
  explorers,
  NETWORKS,
};
