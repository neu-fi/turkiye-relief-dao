export type Network =
  | 'Bitcoin'
  | 'Ethereum'
  | 'Avalanche'
  | 'Binance'
  | 'Polygon'
  | 'Solana'
  | 'Cosmos'
  | 'Polkadot'
  | 'Tron'
  | 'Mina'
  | 'Cardano'
  | 'VeChain'
  | 'Waves'
  | 'Tezos'
  | 'Celo'
  | 'Gnosis'
  | 'Aptos'
  | 'Optimism'

export type OrganizationName =
  | 'Ahbap'
  | 'Needs Map (İhtiyaç Haritası)'
  | 'Anka Relief DAO'
  | 'Community Volunteers Foundation'
  | 'Support To Life'
  | 'AFAD'
  | 'Basic Needs Association (TIDER)'
  | 'Turkish Red Crescent (Kızılay)'
  | 'AKUT'
  | 'Nef Foundation'
  | 'UNICEF in Turkiye'
  | 'Foundation For The Support of Women’s Work'
  | 'Visualize Value'
  | 'Earthquake Türkiye 2023 by Murat Pak'

export type OptionType = 'cryptocurrency' | 'bank' | 'btcturk' | 'card' | 'nft'

export type FilterOption = { id: string; label: string; checked: boolean }

export type Filter = { id: string; name: string; options: FilterOption[] }

export interface Option {
  type: OptionType
  name: string
  address?: string
  sourceUrls?: string[]
  linkName?: string
  linkUrl?: string
  info?: string
  warning?: string
}

export interface Organization {
  name: OrganizationName
  description: string
  logoUrl?: string
  websiteUrl: string
  twitterUrl: string
  popularity?: number
  endorsementUrls?: string[]
  categories: string[]
  options: Option[]
}
