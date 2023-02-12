import DamageStats from './DamageStats';
import DonationStats from './DonationStats';
import Donations from './Donations';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <div className="relative isolate overflow-hidden bg-gray-900 h-screen flex items-center justify-center">
        <img
          src="/background.jpg"
          className="absolute inset-0 -z-10 h-full w-full object-cover filter brightness-50"
        />
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-5xl font-bold tracking-tight text-gray-200 sm:text-6xl">
                Türkiye Relief DAO
              </h1>
              <p className="mt-2 mb-10 text-lg leading-8 text-gray-300">
                The international crypto forefront DAO helping the victims of earthquake disaster for aid & communication through legitimate organizations.
              </p>
              <a href="#donate" className="rounded-md px-8 py-3 text-base font-semibold leading-7 text-white shadow-sm border border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
                Donate
              </a>

            </div>
          </div>
        </div>
        <div className="absolute bottom-4">
          <a href="#help" className="text-lg leading-7 text-white flex">
            Learn more <ChevronDownIcon className="mt-1 ml-2 h-6 w-6" aria-hidden="true" />
          </a>
        </div>
      </div>
      <div id="help">
        <DamageStats />
      </div>
      <DonationStats />
      <div id="donate">
        <Donations />
      </div>
    </>
  )
}
