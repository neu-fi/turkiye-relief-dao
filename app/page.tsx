export default function Home() {
  const metrics = [
    { stat: '7.8 and 7.5 Mww ', emphasis: 'Magnitudes', rest: 'of the mainshock and the largest aftershock.' , source: 'https://en.wikipedia.org/wiki/2023_Turkey%E2%80%93Syria_earthquake'},
    { stat: '11,700+', emphasis: 'Death toll', rest: 'from the latest official figures.' , source: 'https://www.nytimes.com/live/2023/02/08/world/turkey-syria-earthquake'},
    { stat: '3,450+', emphasis: 'Collapsed buildings', rest: 'on people trapped in the ruble.' , source: 'https://www.nytimes.com/2023/02/05/world/europe/turkey-earthquake-rescue.html'},
    { stat: '23 million', emphasis: 'people affected', rest: 'from the earthquakes.' , source: 'https://abcnews.go.com/International/live-updates/turkey-earthquake/?id=96913081#96947062'},
  ]
  
  // All the cryptocurrency networks must be listed here
  const networks = [
    'Bitcoin',
    'Ethereum',
  ];

  // All of the icons should be SVGs
  // Click "raw" and copy the url from the list at https://github.com/spothq/cryptocurrency-icons/tree/master/svg/color
  // All option types except "cryptocurrency" and "nft" must have an icon in this map.
  // All "cryptocurrency" and "nft" types must have exact names in their respective maps.
  const icons = {
    cryptocurrencies: {
      'Bitcoin': 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/btc.svg',
      'Ethereum': 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/eth.svg',
    },
    nfts: {
      'Cause #1': './icons/cause.svg',
    },
    bank: './icons/bank.svg',
    btcturk: './icons/btcturk.svg',
  };

  // All entries must have the following: name, description, websiteUrl, endorsementUrls, options
  // All options must have the following: type, name
  // If an option has "cryptocurrency" type, it must include: address, sourceUrls
  // If an option has another type, it must include: linkName, linkUrl
  // Options could have the following: info, warning
  const organizations = [
    {
      name: 'AFAD (Republic Of Turkey Ministry Of Interior Disaster And Emergency Management Presidency)',
      description: 'Disaster and Emergency Management Authority, an institution working to prevent disasters and minimize disaster-related damages, plan and coordinate post-disaster response, and promote cooperation among various government agencies.',
      websiteUrl: 'https://en.afad.gov.tr/',
      endorsementUrls: [],
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
          name: 'Bank accounts',
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
      name: 'Earthquake Türkiye 2023 by Murat Pak',
      description: 'Distinguished Turkish NFT artist Pak has built an NFT platform for raising funds for the relief effort. All donations are promised to be channelled to Ahbap.',
      websiteUrl: 'https://cause.quest/',
      endorsementUrls: ['https://twitter.com/beeple/status/1623107218567581697'],
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

  return (
    <>
    {/* Hero */}
    <div className="relative isolate overflow-hidden bg-gray-900">
      <img
        src="/background.jpeg"
        className="absolute inset-0 -z-10 h-full w-full object-cover filter brightness-50"
      />
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Turkey Relief DAO
            </h1>
            <p className="mt-6 text-lg leading-8 text-white">
              The international crypto forefront DAO helping the victims of earthquake disaster for aid & communication through legitimate organizations.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-red-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Donate
              </a>
              <a href="#" className="text-base font-semibold leading-7 text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Metrics */}
    <div className="relative bg-gray-900">
      <div className="absolute bottom-0 h-80 w-full xl:inset-0 xl:h-full">
        <div className="h-full w-full xl:grid xl:grid-cols-2">
          <div className="h-full xl:relative xl:col-start-2">
            <img
              className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
              src="./tragedy.jpeg"
              alt="People working on laptops"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-flow-col-dense xl:grid-cols-2 xl:gap-x-8">
        <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
          <h2 className="text-base font-semibold text-red-400">The earthquakes</h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white">
            An ongoing international crisis
          </p>
          <p className="mt-5 text-lg text-gray-300">
            On 6 February 2023, two violent earthquakes southest Turkey. The country declared emergency state and
            asking for from the international community help.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            {metrics.map((item) => (
              <p key={item.emphasis}>
                <span className="block text-2xl font-bold text-white">{item.stat}</span>
                <span className="mt-1 block text-base text-gray-300">
                  <span className="font-medium text-white">{item.emphasis}</span> {item.rest}
                </span>
                <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                  Source
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
