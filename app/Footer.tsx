const navigation = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/TurkeyReliefDAO',
    icon: './icons/social/twitter.svg',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/neu-fi/turkiye-relief-dao',
    icon: './icons/social/github.svg',
  },

  {
    name: 'Dune',
    href: 'https://dune.com/davy42/turkiye-earthquake-donations',
    icon: './icons/social/dune.svg',
  },
]

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl py-12 px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
            >
              <img
                className="h-8 w-8 mix-blend-multiply text-gray-400"
                src={item.icon}
              />
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center leading-5 text-gray-500">
            &copy; Türkiye Relief DAO. Made in Türkiye with 😢
          </p>
        </div>
      </div>
    </footer>
  )
}
