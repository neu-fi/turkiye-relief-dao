import Link from 'next/link'

const metrics = [
  { stat: '7.8 and 7.5 Mww ', emphasis: 'Magnitudes', rest: 'of the mainshock and the largest aftershock.' , source: 'https://en.wikipedia.org/wiki/2023_Turkey%E2%80%93Syria_earthquake'},
  { stat: '31,643', emphasis: 'Death toll', rest: 'from the latest official figures.' , source: 'https://edition.cnn.com/2023/02/12/middleeast/deaths-turkey-syria-earthquake-intl/index.html'},
  { stat: '12,000', emphasis: 'Collapsed', rest: 'or seriously damaged buildings.' , source: 'https://www.washingtonpost.com/world/death-toll-rises-rescues-dwindle-in-earthquake-aftermath/2023/02/10/280d13ba-a905-11ed-b2a3-edb05ee0e313_story.html'},
  { stat: '23 million', emphasis: 'People affected', rest: 'from the earthquakes.' , source: 'https://abcnews.go.com/International/live-updates/turkey-earthquake/?id=96913081#96947062'},
]

export default function DamageStats() {
  return (
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
          <h2 className="text-base font-semibold text-white">The Earthquakes</h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-rose-200">
            An International Emergency
          </p>
          <p className="mt-5 text-lg text-gray-300">
            On 6 February 2023, two violent earthquakes southest Turkey. The country declared emergency state and
            asking for help from the international community.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            {metrics.map((item) => (
              <p key={item.emphasis}>
                <span className="block text-2xl font-bold text-white">{item.stat}</span>
                <span className="mt-1 block text-base text-gray-300">
                  <span className="font-medium text-white">{item.emphasis}</span> {item.rest}
                </span>
                <Link href={item.source} passHref={true}>
                  <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-900">
                    Source
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </span>
                </Link>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
