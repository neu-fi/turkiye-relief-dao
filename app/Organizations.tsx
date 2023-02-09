'use client'

import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { ClipboardIcon } from '@heroicons/react/20/solid'
import { LinkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from 'flowbite-react'

// All the cryptocurrency networks must be listed here
const NETWORKS = ["Bitcoin", "Ethereum", "Avalanche", "Binance", "Polygon", "Solana", "Cosmos", "Polkadot", "Tron", "Mina", "Cardano", "VeChain", "Waves", "Tezos",];

type Network = typeof NETWORKS[number];

const OPTION_TYPES = [
  'cryptocurrency',
  'bank',
  'btcturk',
  'card',
  'nft',
];

type OptionType = typeof OPTION_TYPES[number];

interface Option {
  type: OptionType,
  name: string,
  address?: string,
  sourceUrls?: string[],
  linkName?: string,
  linkUrl?: string,
  info?: string,
  warning?: string,
}

const categoryDetails: {[index: string]:any} = {
  governmental: {
    name: 'Governmental',
    classes: 'bg-gray-100 text-gray-800',
  },
  ngo: {
    name: 'NGO',
    classes: 'bg-green-100 text-green-800',
  },
  individual: {
    name: 'Individual',
    classes: 'bg-amber-100 text-amber-800',
  },
  turkish: {
    name: 'Turkish',
    classes: 'bg-red-100 text-red-800',
  },
  international: {
    name: 'International',
    classes: 'bg-blue-100 text-blue-800',
  },
}

// All of the icons should be SVGs
// Click "raw" and copy the url from the list at https://github.com/spothq/cryptocurrency-icons/tree/master/svg/color
// All option types except "cryptocurrency" and "nft" must have an icon in this map.
// All "cryptocurrency" and "nft" types must have exact names in their respective maps.
const icons: {[index: string]:any} = {
  cryptocurrencies: {
    'Bitcoin': 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/btc.svg',
    'Ethereum': 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/eth.svg',
    'Avalanche': 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/avax.svg',
    'Binance': 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/bnb.svg',
    'Polygon': 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/matic.svg',
    'Solana': 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/sol.svg',
    'Cosmos': 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/atom.svg',
    'Polkadot': 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/dot.svg',
    'Tron': 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/trx.svg',
    'Mina': "https://cryptologos.cc/logos/mina-mina-logo.svg",
    'Cardano': "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/ada.svg",
    'VeChain': "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/vet.svg",
    'Waves': "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/waves.svg",
    'Tezos': "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/xtz.svg",
  },
  bank: './icons/bank.svg',
  btcturk: './icons/btcturk.svg',
  card: './icons/card.svg',
  nft: './icons/nft.svg',
};

// All entries must have the following: name, description, logoUrl, websiteUrl, twitterUrl, popularity, endorsementUrls, categories, options
// Categories must include:
//   * One of: governmental, ngo, individual
//   * One of: turkish, international
// All options must have the following: type, name
//   * If an option has "cryptocurrency" type, it must include: address, sourceUrls
//   * If an option has another type, it must include: linkName, linkUrl
//   * Options could have the following: info, warning
const organizations: {[index: string]:any} = [
  {
    name: 'AFAD',
    description: 'Disaster and Emergency Management Authority, an institution working to prevent disasters and minimize disaster-related damages, plan and coordinate post-disaster response, and promote cooperation among various government agencies.',
    logoUrl: './icons/organizations/afad.svg',
    websiteUrl: 'https://en.afad.gov.tr/',
    twitterUrl: 'https://twitter.com/AFADTurkiye',
    popularity: 6,
    endorsementUrls: [],
    categories: ['turkish', 'governmental'],
    options: [
      {
        type: 'cryptocurrency',
        name: 'Bitcoin',
        address: 'bc1q30uv6s9gwyzq2fd5hhc06v7xge3zzg3qa99vuv0w5dfmxgq8vnws97dpcl',
        sourceUrls: ['https://donation.btcturk.com/', 'https://twitter.com/btcturkpro/status/1623344419976929282'],
      },
      {
        type: 'cryptocurrency',
        name: 'Ethereum',
        address: '0x64A994CC850a56e87331d880A23A69b16dbFC8ea',
        sourceUrls: ['https://donation.btcturk.com/', 'https://twitter.com/btcturkpro/status/1623344419976929282'],
        warning: 'Only send ETH or USDT as this is an exchange wallet',
      },
      {
        type: 'bank',
        name: 'Bank Accounts',
        linkName: 'The list of AFAD bank accounts on their official website',
        linkUrl: 'https://en.afad.gov.tr/earthquake-donation-accounts',
      },
      {
        type: 'btcturk',
        name: 'BtcTurk',
        linkName: 'Instructions for donating Turkish Lira from BtcTurk',
        linkUrl: 'https://pro.btcturk.com/deprem-bagis',
        info: 'Matched 1:1 by BtcTurk',
        warning: 'Only Turkish citizens can register to BtcTurk',
      },
    ],
  },
  {
    name: 'Ahbap',
    description: 'A Turkey based non-profit organization established on the principles of solidarity and cooperation, founded by the Turkish musician and philanthropist, Haluk Levent.',
    logoUrl: './icons/organizations/ahbap.png',
    websiteUrl: 'https://ahbap.org/',
    twitterUrl: 'https://twitter.com/ahbap',
    popularity: 10,
    endorsementUrls: ['https://twitter.com/avalancheavax/status/1622975707528962049'],
    categories: ['turkish', 'ngo'],
    options: [
      {
        type: 'cryptocurrency',
        name: 'Ethereum',
        address: '0xe1935271D1993434A1a59fE08f24891Dc5F398Cd',
        sourceUrls: ['https://twitter.com/ahbap/status/1622963311514996739'],
      },
      {
        type: 'cryptocurrency',
        name: 'Avalanche',
        address: '0x868D27c361682462536DfE361f2e20B3A6f4dDD8',
        sourceUrls: ['https://twitter.com/ahbap/status/1622963311514996739'],
      },
      {
        type: 'cryptocurrency',
        name: 'Binance',
        address: '0xB67705398fEd380a1CE02e77095fed64f8aCe463',
        sourceUrls: ['https://twitter.com/ahbap/status/1622963311514996739'],
      },
      {
        type: 'bank',
        name: 'Bank Accounts',
        linkName: 'The list of Ahbap bank accounts on their official website',
        linkUrl: 'https://ahbap.org/disasters-turkey',
      },
    ],
  },
  {
    name: 'Needs Map (İhtiyaç Haritası)',
    description: 'An online social platform cooperative based in Türkiye, where individuals and organizations wishing to support those in need can connect',
    logoUrl: './icons/organizations/needsmap.png',
    websiteUrl: 'https://www.needsmap.coop/',
    twitterUrl: 'https://twitter.com/ihtiyacharitasi',
    popularity: 1,
    endorsementUrls: ['https://twitter.com/iksv_istanbul/status/1622936410704560129'], // Turkish
    categories: ['turkish', 'ngo'],
    options: [
      {
        type: 'cryptocurrency',
        name: 'Ethereum',
        address: '0xbe4cde5eeeed1f0a97a9457f6ef5b71eae108652',
        sourceUrls: ['https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/'], // Turkish
        warning: 'Only send ETH, USDC, USDT or TRYC as this is an exchange wallet',
      },
      {
        type: 'cryptocurrency',
        name: 'Bitcoin',
        address: '3PkihQfm6doGW41uZ5Q9GFNw6XpEK5g9Vk',
        sourceUrls: ['https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/'], // Turkish
      },
      {
        type: 'cryptocurrency',
        name: 'Polygon',
        address: '0xbe4cde5eeeed1f0a97a9457f6ef5b71eae108652',
        sourceUrls: ['https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/'], // Turkish
        warning: 'Only send MATIC as this is an exchange wallet',
      },
      {
        type: 'cryptocurrency',
        name: 'Solana',
        address: 'Fjo5AeFMbUD6gjoWKbVuMXRcPsjpXKksjKLxPFuXQhaK',
        sourceUrls: ['https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/'], // Turkish
        warning: 'Only send SOL as this is an exchange wallet',
      },
      {
        type: 'cryptocurrency',
        name: 'Cosmos',
        address: 'cosmos1dm68mx9jcsyqkyzp3up7gmnu3ku84v8gf6v75u',
        sourceUrls: ['https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/'], // Turkish
        warning: 'Only send ATOM with MEMO: 624143',
      },
      {
        type: 'cryptocurrency',
        name: 'Polkadot',
        address: '1haY6iHgLopw2WWmPhcdCy2jwzL2jthbNL515rUyJtnmhUt',
        sourceUrls: ['https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/'], // Turkish
        warning: 'Only send DOT as this is an exchange wallet'
      },
      {
        type: 'cryptocurrency',
        name: 'Tron',
        address: 'TUAum5Q3GWZvzsS1yQaDdjkDAzp3HbvKTT',
        sourceUrls: ['https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/'], // Turkish
        warning: 'Only send TRX as this is an exchange wallet',
      },
      {
        type: 'cryptocurrency',
        name: 'Mina',
        address: 'B62qkRvhLCRoZikpAKicKnMmQ9vSX8FYq5owXn5P7yPbDHDigya7zsS',
        sourceUrls: ['https://twitter.com/o1_labs/status/1623410090249183232', 'https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/'], // Turkish
        info: 'Matched 1:1 by BtcTurk',
        warning: 'Only send Mina as this is an exchange wallet',
      },
      {
        type: 'card',
        name: 'Credit Card',
        linkName: 'Option of Credit Card on their official website',
        linkUrl: 'https://fonzip.com/ihtiyacharitasi/onlineimece',
      },
    ],
  },
  {
    name: 'Community Volunteers Foundation',
    description: 'The Community Volunteer Foundation is a Turkish organization that helps young people uncover their potential through education and project development, while also addressing their housing, scholarship, and cultural needs.',
    logoUrl: './icons/organizations/tog.svg',
    websiteUrl: 'https://www.tog.org.tr/',
    twitterUrl: 'https://twitter.com/TOGVakfi',
    popularity: 4,
    endorsementUrls: ['https://www.tog.org.tr/destekcilerimiz/kurumsal-destekcilerimiz/'], // Turkish
    categories: ['turkish', 'ngo'],
    options: [
      {
        type: 'cryptocurrency',
        name: 'Ethereum',
        address: '0x9b40f98ccc326beaa0bfb94cfa8bfc6383a267e5',
        sourceUrls: ['https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/'], // Turkish
        warning: 'Only send ETH as this is an exchange wallet',
      },
      {
        type: 'cryptocurrency',
        name: 'Tron',
        address: 'TCJ2qvKJsXE4XZD2VcyeppDWmZUGfLShMm',
        sourceUrls: ['https://www.paribu.com/blog/haberler/afet-destek-planimiz-ve-kripto-para-ile-bagis-organizasyonu-hakkinda/'], // Turkish
        warning: 'Only send TRX as this is an exchange wallet'
      },
      {
        type: 'card',
        name: 'Credit Card',
        linkName: 'Option of Credit Card on their official website',
        linkUrl: 'https://www.tog.org.tr/bagisci-ol/#tek-seferlik-bagis',
      },
      {
        type: 'bank',
        name: 'Bank Accounts',
        linkName: 'The list of bank accounts on the official website',
        linkUrl: 'https://www.tog.org.tr/bagisci-ol/#1630673115839-aeef1bfb-85a7',
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
    endorseMentUrls: [],
    categories: ["turkish", "ngo"],
    options: [
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address: "bc1qrc6ujsk7eeex44e4h2hqpxxvshrr8nqfzq4uqgcq309en99nvmjsxh50n7",
        sourceUrls: ["https://donation.btcturk.com/"],
      },
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address: "3KiXAfrSRH2yrcNGTy6TDrW4WyHdiRAeU5",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
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
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send ETH or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Solana",
        address: "GgVMLWkTa2RCfyYAvuWvJKtK4br328hsM9ZTuvYTh39V",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send SOL as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Avalanche",
        address: "X-avax19ct5xw2ft6zka0u6rapzce60j2pztt92dntz2z",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        info: "X-Chain adress",
        warning: "Only send Avax as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tron",
        address: "TFw4MPc55BadD5uaGu2Fgs7P5r2YbJ7mWb",
        sourceUrls: ["https://donation.btcturk.com/"], // Turkish
        warning: "Only send TRX or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tron",
        address: "TD9BcpkuG5sqGHCn45WEkB3w9pbQrceHg7",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send TRX or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Polkadot",
        address: "15fNaFrochwskFaaRkUf4rmqtRSSuhAk8AYvs1B64S5yET3S",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send DOT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Cosmos",
        address: "cosmos1dm68mx9jcsyqkyzp3up7gmnu3ku84v8gf6v75u",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send ATOM with MEMO: 927971",
      },
      {
        type: "cryptocurrency",
        name: "Tezos",
        address: "tz1hJamAyDpbFNF4puTBfmHAbhjY7z6S5DVj",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send XTZ as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Cardano",
        address: "DdzFFzCqrht4CaZRfFTHiuqmfSM11SA2uXkQGq65JoszmS2qBEr5VAPmhzq7LqNdBCYgC9cXJdHgmgbfHRYU6ZQ6khAdAHzUT7B3YTV9",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send ADA as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Mina",
        address: "B62qrkTWva5KF5y3gTA48niq5nB62K9rsxRt7un4NC53b2CC4r4Jvdd",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send Mina as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Waves",
        address: "3PN2xHEUCzHR9bE2RQfBsQzwqgdbvqPRojV",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send Waves as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "VeChain",
        address: "0x3660bde41fb6f596e57a24dc89354b0556b62549",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send VET as this is an exchange wallet",
      },
      {
        type: "card",
        name: "Credit Card",
        linkName: "Option of Credit Card on their official website",
        linkUrl: "https://www.supporttolife.org/donate/",
      },
      {
        type: "bank",
        name: "Bank Accounts",
        linkName: "The list of bank accounts on the official website",
        linkUrl: "https://www.supporttolife.org/support-us/donate-by-money-transfer/",
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
    endorseMentUrls: ['https://twitter.com/btcturkpro/status/1623198411263557635?s=20&t=XtLgxLwHQYPw_2M03jmf1g'],
    categories: ["turkish", "ngo"],
    options: [
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address: "bc1qv5h603jjzhahtlyvarnkxcldjh0r852q8hpzr2j0wf9eemt43kfsasz7p9",
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
        name: "Credit Card",
        linkName: "Option of Credit Card on their official website",
        linkUrl: "https://www.tider.org/eng/donate",
      },
    ],
  },
  {
    name: "Turkish Red Crescent (Kızılay)",
    description: "Kızılay is a Turkish humanitarian organization that provides disaster relief, organizes blood drives, and provides other services.",
    logoUrl: "./icons/organizations/kizilay.svg",
    websiteUrl: "https://www.kizilay.org.tr/",
    twitterUrl: "https://twitter.com/kizilay",
    popularity: 2,
    endorseMentUrls: ['https://twitter.com/anadoluajansi/status/1623621477017997314?s=20&t=-6BowcezBT_2LEnCLIYo4Q'], // Turkish
    categories: ["turkish", "ngo"],
    options: [
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address: "bc1qe5vk78kmzq3v9xry3c9w7u09g0q9fvhsvuvsq5t6lvzfzatsdygs2whz3u",
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
        sourceUrls: ["https://www.kizilay.org.tr/donation-methods/crypto-donation-accountwallet-informations"],
        warning: "Only send Avax, USDT or USDC as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Polkadot",
        address: "14FzHs6ESUbBdynBXMd26VSF9yZV6SGX1nWfffBh9MWAfL2KPo",
        sourceUrls: ["https://www.kizilay.org.tr/donation-methods/crypto-donation-accountwallet-informations"],
        warning: "Only send DOT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Cosmos",
        address: "cosmos1xlp4k2yz6zhhqxlp0hwdfqlpsz9k9gru3ezese",
        sourceUrls: ["https://www.kizilay.org.tr/donation-methods/crypto-donation-accountwallet-informations"],
        warning: "Only send ATOM with MEMO: 6719295726938",
      },
      {
        type: "card",
        name: "Credit Card",
        linkName: "Option of Credit Card on their official website",
        linkUrl: "https://www.kizilay.org.tr/Bagis/BagisYap/43/general-donation",
      },
      {
        type: "bank",
        name: "Bank Accounts",
        linkName: "The list of bank accounts on the official website",
        linkUrl: "https://www.kizilay.org.tr/donation-methods/bank-account-numbers",
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
    endorseMentUrls: ['https://www.akut.org.tr/destekci-listesi'],
    categories: ["turkish", "ngo"],
    options: [
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address: "bc1qd7lw5ntzme45ej2y3wetr8zzaqpe68fj9t3trtpurwh9g3qrs0as4lw6lg",
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
        name: "Credit Card",
        linkName: "Option of Credit Card on their official website",
        linkUrl: "https://www.akut.org.tr/bagis-yap",
      },
      {
        type: "bank",
        name: "Bank Accounts",
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
    endorseMentUrls: ['https://www.nefvakfi.org/projeler.php?page=kentsel_vizyon#tab-two'],
    categories: ["turkish", "ngo"],
    options: [
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address: "bc1q7vyykxcdfgjn2r4t839rzsn6wqxlh6shxvlhpkjaxxrtdvc77qqq62fwf0",
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
        sourceUrls: ["https://donation.btcturk.com/"], // Turkish
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
    endorseMentUrls: ['https://twitter.com/unicefturk/status/1623032942762110976'],
    categories: ["international", "ngo"],
    options: [
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address: "36h4o3mqLfm5xD6f92qEeXvxUbuYG1VnaT",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
      },
      {
        type: "cryptocurrency",
        name: "Ethereum",
        address: "0x93d9ef15f0b410abcbb599d2e6acc1afad97363f",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send ETH, USDC, USDT or TRYC as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tron",
        address: "TWdMUR43UnZ29NGowVMi6qK4NxussAi2RZ",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
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
    endorseMentUrls: ['https://www.kedv.org.tr/basinda-kedv'], // Turkish
    categories: ["turkish", "ngo"],
    options: [
      {
        type: "cryptocurrency",
        name: "Bitcoin",
        address: "38gamXVGr7CqHKedeLu3fdTtmPzA2kgNtM",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
      },
      {
        type: "cryptocurrency",
        name: "Ethereum",
        address: "0x307efd869e7c6ce8308ff2f8b999e17b64f27b4c",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send ETH, USDC, USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Avalanche",
        address: "X-avax1uch76pculzajk7np64h23ckslwdfa4lrc80nct ",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        info: "X-Chain adress",
        warning: "Only send AVAX as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Solana",
        address: "56zuaUkveguQfwKYiaj1qHkBpPwcApo8YR9asG96xbEb",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send SOL as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Polkadot",
        address: "13J8D6edr5mZcVkvJkmeQJPv1MqamYXugBUmH74g3jzeFJ4u",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send DOT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tron",
        address: "TYofnJGV7jjVLff65x3147D5wenMcibQRN",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send TRX or USDT as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Cardano",
        address: "DdzFFzCqrht2Fdp1rgYFX6NE6A3uVdwTFvPN15YLUcktzMfqPfXjZcGXbKRJBywFi2sheB5kpRTN2R497S6wVre1bD1QxHK475nuNusy",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send ADA as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "VeChain",
        address: "0xfe059318c58b083b550bdb315e6927bf6e84b9b4",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send VET as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Waves",
        address: "3PBQ5xjeDu7FvX2j8bR95LoC2t4dGRcxwLZ",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send WAVES as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Cosmos",
        address: "cosmos1dm68mx9jcsyqkyzp3up7gmnu3ku84v8gf6v75u",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        warning: "Only send ATOM with MEMO: 816209",
      },
      {
        type: "cryptocurrency",
        name: "Mina",
        address: "B62qoDBa6AkhBM8FodMbWfbDJoDBvf2gqxEVHFJ3X6agqwuZ6q6yNxZ",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        info: "https://twitter.com/o1_labs/status/1623410090249183232",
        warning: "Only send MINA as this is an exchange wallet",
      },
      {
        type: "cryptocurrency",
        name: "Tezos",
        address: "tz1bi4cYzyfS899XqTcR62wGJP8HwJ89JaA7",
        sourceUrls: ["https://www.paribu.com/blog/en/news/about-our-disaster-support-plan-and-the-cryptocurrency-donation-system/"],
        info: "https://twitter.com/o1_labs/status/1623410090249183232",
        warning: "Only send XTZ as this is an exchange wallet",
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
    endorsementUrls: ["https://twitter.com/jackbutcher/status/1622696145741877277"],
    categories: ["international", "individual"],
    options: [
      {
        type: "nft",
        name: "Humanity Check",
        linkName: "Humanity Check NFTs",
        linkUrl: "https://app.manifold.xyz/c/humanitycheck",
      },
    ],
  },
  {
    name: 'Earthquake Türkiye 2023 by Murat Pak',
    description: 'Distinguished Turkish NFT artist Pak has built an NFT platform for raising funds for the relief effort. All donations are promised to be channelled to Ahbap.',
    logoUrl: './icons/organizations/cause.svg',
    websiteUrl: 'https://cause.quest/',
    twitterUrl: 'https://twitter.com/muratpak',
    popularity: 2,
    endorsementUrls: ['https://twitter.com/beeple/status/1623107218567581697'],
    categories: ['turkish', 'individual'],
    options: [
      {
        type: 'nft',
        name: 'Cause #1',
        linkName: 'Mint Earthquake Türkiye 2023 NFTs',
        linkUrl: 'https://cause.quest',
        warning: 'Non-transferable',
      },
    ],
  },
];

const initialSortOptions = [
  { name: 'Suggested', current: true },
  { name: 'Most Popular', current: false },
]
type FilterOption = {id:string,label:string,checked:boolean};
type Filter = {id:string,name:string,options:FilterOption[]};
const initialFilters: Filter[]  = [
  {
    id: 'types',
    name: 'Donation Types',
    options: [
      { id: 'cryptocurrency', label: 'Cryptocurrencies', checked: true },
      { id: 'nft', label: 'NFTs', checked: true },
      { id: 'card', label: 'Credit Cards', checked: true },
      { id: 'bank', label: 'Bank Transfers', checked: true },
      { id: 'btcturk', label: 'Other', checked: true },
    ],
  },
  {
    id: 'cryptocurrencies',
    name: 'Cryptocurrency Networks',
    options: [
      { id: 'Bitcoin', label: 'Bitcoin', checked: true },
      { id: 'Ethereum', label: 'Ethereum', checked: true },
      { id: 'Avalanche', label: 'Avalanche', checked: true },
      { id: 'Binance', label: 'Binance', checked: true },
      { id: 'Polygon', label: 'Polygon', checked: true },
      { id: 'Solana', label: 'Solana', checked: true },
      { id: 'Cosmos', label: 'Cosmos', checked: true },
      { id: 'Polkadot', label: 'Polkadot', checked: true },
      { id: 'Tron', label: 'Tron', checked: true },
      { id: 'Mina', label: 'Mina', checked: true },
      { id: 'Cardano', label: 'Cardano', checked: true },
      { id: 'VeChain', label: 'VeChain', checked: true },
      { id: 'Waves', label: 'Waves', checked: true },
      { id: 'Tezos', label: 'Tezos', checked: true },
    ],
  },
  {
    id: 'categories',
    name: 'Categories',
    options: [
      { id: 'governmental', label: 'Governmental', checked: true },
      { id: 'ngo', label: 'NGO', checked: true },
      { id: 'individual', label: 'Individual', checked: true },
      { id: 'turkish', label: 'Turkish', checked: true },
      { id: 'international', label: 'International', checked: true },
    ],
  },
];


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Organizations() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sortOptions, setSortOptions] = useState(initialSortOptions);
  const [filters, setFilters] = useState(initialFilters);
  const cryptoFilter = filters[0].options[0].checked;
  const optionToIconUrl = (option: Option ) => (option.type === 'cryptocurrency')
                                             ? icons.cryptocurrencies[option.name]
                                             : icons[option.type];

  const checkboxChangeHandler = ({target}: any) => {
    const {checked, id} = target;
    setFilters(prev => {
      const idParts = id.split("-");
      const clickedCategory = prev.find(item => item.id.toString() === idParts[1]);
      if (!clickedCategory) {
        return [...prev];
      }
      const clickedOption = clickedCategory?.options.find(item => item.id.toString() === idParts[2]);
      if (!clickedOption) {
        return [...prev];
      }
      clickedOption.checked = checked;
      return [...prev];
    });
  }

  const changeSortHandler = ({target}: any) => {
    setSortOptions(prev => {
      const currentOption = prev.find(item => item.current === true);
      if (!currentOption) {
        return [...prev];
      }
      currentOption.current = false;
      const clickedOption = prev.find(item => item.name.toString() === target.innerText);
      if (!clickedOption) {
        return [...prev];
      }
      clickedOption.current = true;
      return [...prev];
    });
  }

  const isOrganizationFiltered = (organization: any) => {
    const categoryFilters = filters.find(item => item?.id.toString() === 'categories');
    if (categoryFilters === undefined) {
      alert("Assertion failed A");
      return false;
    }
    for (var category of organization.categories) {
      var categoryFilterOption = categoryFilters.options.find(item => item.id === category)
      if (categoryFilterOption === undefined) {
        alert("Assertion failed B");
        return false;
      }
      if (categoryFilterOption.checked === false) {
        return false;
      }
    }
    // Look for a filtered option
    for (var option of organization.options) {
      if (isOptionFiltered(option)) {
        return true;
      }
    }
    // The organization doesn't have any filtered options
    return false;
  }

  const isOptionFiltered = (option: any) => {
    const typeFilters = filters.find(item => item?.id.toString() === 'types');
    if (typeFilters === undefined) {
      alert("Assertion failed C");
      return false;
    }
    var typeFilter = typeFilters.options.find(item => item.id === option.type);
    if (typeFilter === undefined) {
      alert("Assertion failed D " + option.type);
      return false;
    }
    if (option.type === "cryptocurrency" && typeFilter.checked) {
      var cryptocurrencyFilters = filters.find(item => item?.id.toString() === 'cryptocurrencies');
      if (cryptocurrencyFilters === undefined) {
        alert("Assertion failed E");
        return false;
      }
      var cryptocurrencyFilter = cryptocurrencyFilters.options.find(item => item.id === option.name);
      if (cryptocurrencyFilter === undefined) {
        alert("Assertion failed F " + option.name);
        return false;
      }
      return cryptocurrencyFilter.checked;
    } else {
      return typeFilter.checked;
    }
  }

  return (
    <div className="bg-white px-6 lg:px-8">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>

                    {filters.map((section) => (
                      (section.id != 'cryptocurrencies' || cryptoFilter) ?
                        <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">{section.name}</span>
                                  <span className="ml-2 flex items-center">
                                    {open ? (
                                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option) => (
                                    <div key={option.id} className="flex items-center">
                                      <input
                                        id={`filter-${section.id}-${option.id}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.id}
                                        type="checkbox"
                                        defaultChecked={option.checked}

                                        onChange={checkboxChangeHandler}
                                        className="h-4 w-4 rounded border-gray-300 text-red-600"
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${option.id}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      : <></>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b border-gray-200 pt-24 pb-6">
            <div className="font-bold tracking-tight">
              <h2 className="text-base font-semibold text-red-600">You Can Make a Difference</h2>
              <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                Donate Now
              </p>
            </div>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              onClick={changeSortHandler}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900 cursor-default' : 'text-gray-500 cursor-pointer',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="group inline-flex -m-2 ml-4 p-2 text-gray-700 hover:text-gray-900 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <p className='text-sm font-medium'>
                  Filters
                </p>
                <FunnelIcon className="text-gray-400 group-hover:text-gray-500 h-5 w-5 ml-1" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  (section.id != 'cryptocurrencies' || cryptoFilter) ?
                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-2 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option) => (
                                <div key={option.id} className="flex items-center">
                                  <input
                                    id={`filter-${section.id}-${option.id}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.id}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    onChange={checkboxChangeHandler}
                                    className="h-4 w-4 rounded border-gray-300 text-red-600"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${option.id}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  : <></>
                ))}
              </form>

              {/* Contents */}
              <div className="lg:col-span-3">
                {organizations.map((organization: any) => (
                  isOrganizationFiltered(organization) &&
                  <div data-type="organization" className="bg-gray-50 mb-8 sm:rounded-lg border-solid border-4 border-gray-100 shadow ring-1 ring-black ring-opacity-5">
                    <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                      <div className="-ml-4 -mt-4 flex flex-wrap items-center sm:flex-nowrap grow justify-center">
                        <div className="ml-4 mt-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <img
                                className="h-16 w-16 mix-blend-multiply"
                                src={organization.logoUrl}
                              />
                            </div>
                            <div className="ml-4">
                              <h3 className="text-lg font-semibold ml-1 leading-6 text-gray-900">
                                {organization.name}
                              </h3>
                              <div className='space-x-2'>
                                {organization.categories.map((category: any) => (
                                  <span className={classNames(
                                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                    categoryDetails[category].classes
                                  )}>
                                    {categoryDetails[category].name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex grow justify-center sm:justify-end">
                          <Link href={organization.twitterUrl}>
                            <button
                              type="button"
                              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                            >
                              <div className="-ml-1 mr-2 h-5 w-5 text-gray-400 fill-current" aria-hidden="true">
                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                              </div>
                              <span>Twitter</span>
                            </button>
                          </Link>
                          <Link href={organization.websiteUrl}>
                            <button
                              type="button"
                              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                            >
                              <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                              <span>Website</span>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                
                    <div className="px-4 sm:px-6 lg:px-8">
                      <p className="mt-4 text-sm text-gray-700">
                        {organization.description}
                      </p>
                      <div className="mt-6 flex flex-col">
                        <div className="-mt-2 -mx-4 overflow-x-auto sm:mb-4 sm:-mx-6 lg:-mx-8 border-gray-200 border-t sm:border-none">
                          <div className="min-w-full align-middle sm:py-2 md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                              <table className="flex flex-col divide-y divide-gray-300">
                                <tbody className="divide-y divide-gray-200 bg-white">
                                  {organization.options.map((option: Option) => (
                                    isOptionFiltered(option) &&
                                    <tr key={option.name} className="flex justify-items-end w-full place-items-center">
                                      <td className="py-2 pl-3 pr-3 text-sm sm:pl-6 sm:py-5">
                                        <div className="flex w-36 items-center">
                                          <div className="h-6 w-6 flex-shrink-0">
                                            <img className="h-6 w-6" src={optionToIconUrl(option)} alt="" />
                                          </div>
                                          <div className="ml-2">
                                            <div className="font-medium text-gray-600">
                                              {option.name}
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="truncate py-3 sm:py-5 text-sm text-gray-500 ">
                                        {option.type === 'cryptocurrency'
                                          ? <div>
                                              <p className="truncate">{option.address}</p>
                                              <div className='space-x-2 mt-0.5'>
                                                {option.sourceUrls?.map((sourceUrl: string) => (
                                                  <Link href={sourceUrl} passHref={true}>
                                                    <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-900">
                                                      Source
                                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 ml-1">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                      </svg>
                                                    </span>
                                                  </Link>
                                                  ))}
                                              </div>
                                            </div>
                                          : option.linkUrl
                                            ?<Link className="truncate" href={option.linkUrl}>{option.linkName}</Link>
                                            :<p>{option.linkName}</p>
                                        }
                                      </td>
                                      <td className="px-3 py-3 text-sm text-gray-400 grow space-x-2 inline-flex place-items-center justify-end">
                                        {
                                          option.info &&
                                            <Tooltip content={option.info} className="align-center" placement="right">
                                              <div className='flex items-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                                </svg>
                                              </div>
                                            </Tooltip>
                                        }
                                        {
                                          option.warning &&
                                            <Tooltip content={option.warning} className="align-center" placement="right">
                                              <div className='flex items-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                                                </svg>
                                              </div>
                                            </Tooltip>
                                        }
                                        <button
                                          type="button"
                                          className={
                                            classNames(
                                              "relative l-5 inline-flex items-center rounded-md sm:border border-gray-300 bg-white sm:px-4 sm:py-2 font-medium text-gray-700 sm:shadow-sm hover:bg-gray-50 float-right",
                                              option.address ? "block" : "hidden"
                                            )
                                          }
                                          onClick={() => {
                                            if (option.address) {
                                              toast(
                                                <div className='inline-flex items-center'>
                                                  <ClipboardIcon className="h-8 w-8 sm:h-8 sm:w-8 text-gray-200 mr-5" aria-hidden="true" />
                                                  <p>Copied {option.name} address of {organization.name}"</p>
                                                </div>
                                                , {
                                                position: "bottom-center",
                                                autoClose: 5000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: false,
                                                theme: "dark",
                                                });
                                              navigator.clipboard.writeText(option.address);
                                            }
                                          }}
                                        >
                                          <ClipboardIcon className="-ml-0.5 h-6 w-6 sm:h-4 sm:w-4 text-gray-400" aria-hidden="true" />
                                          <p className='hidden md:block ml-2'>Copy</p>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <ToastContainer pauseOnFocusLoss={false}/>
    </div>
  )
}
