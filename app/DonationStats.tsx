import Link from 'next/link'

const stats = [
  { name: 'Unique Addresses', stat: '2,163' },
  { name: 'Contributions', stat: '8,684' },
  { name: 'Total Donations', stat: '$3,947,085' },
]
  
export default function DonationStats() {
  return (
    <div className="relative bg-red-900">
      <div className="absolute bottom-0 h-80 w-full xl:inset-0 xl:h-full">
        <div className="h-full w-full xl:grid xl:grid-cols-2">
          <div className="h-full xl:relative xl:col-start-1">
            <img
              className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
              src="./help.jpg"
              alt="People working on laptops"
            />
            <div
              aria-hidden="true"
              className="absolute top-0 h-32 bg-gradient-to-b from-red-900 xl:inset-y-0 xl:right-0 xl:h-full xl:w-32 xl:bg-gradient-to-l"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-flow-col-dense xl:grid-cols-2 xl:gap-x-8">
        <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-2 xl:pb-24">
          <h2 className="text-base font-semibold text-white">Asking for Help</h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-rose-200">
            The International Response
          </p>
          <p className="mt-5 text-lg text-gray-200">
            We've quickly formed our DAO to push for policy change on cryptocurrency donations, assist organizations
            handle cryptocurrencies, and appeal to the global crypto community for support. Our efforts has started to
            make impact. We're grateful for the primarily international donations channelled to the relief efforts.
          </p>
          <Link href="https://dune.com/davy42/turkiye-earthquake-donations" passHref={true}>
            <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-900">
              Source
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </span>
          </Link>
          <div className="relative">
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {stats.map((item) => (
              <div key={item.name} className="overflow-hidden rounded-lg text-center bg-gray-200 py-5 shadow sm:py-6">
                <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
              </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
  