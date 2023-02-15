"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  ClipboardIcon,
  FunnelIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  organizations,
  sortOptions,
  initialFilters,
  NETWORKS,
} from "../config/donations";
import { classNames } from "./utils";
import OrganizationCard from "./OrganizationCard";
import type { Network, Organization, SortOption, Filter } from "./types";
import { Option } from "./types";
import Loader from "./Loader";

export default function Organizations() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [canReset, setCanReset] = useState(false);
  // `suggested` as default
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(
    sortOptions[0]
  );
  
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filter[]>(initialFilters);
  const cryptoFilter = filters[0].options[0].checked;

  useEffect(() => {
    const fetchLocalStorage = async () => {
      const localStorageValue = localStorage.getItem("filters");
      const initialFilterFromLocalStorage: Filter[] = localStorageValue ? JSON.parse(localStorageValue) : [];
      if (initialFilterFromLocalStorage.length) {
        setFilters(initialFilterFromLocalStorage);
      } else {
        localStorage.setItem("filters", JSON.stringify(initialFilters));
      }
    };
    fetchLocalStorage().then(() => setLoading(false));
  }, [])

  const applyQueryToFilter = (id: string, newFilters: string[]) => {
    setFilters((prev) =>
      prev.map((section) => {
        if (section.id === id) {
          section.options = section.options.map((option) => {
            option.checked = newFilters.includes(option.id);
            return option;
          });
        }
        return section;
      })
    );
  };

  const applyQueryToFilters = () => {
    const typesQueryMatch = document.location.href.match(/types=([^&#]*)/);
    if (typesQueryMatch && typesQueryMatch?.length > 0) {
      applyQueryToFilter("types", typesQueryMatch[1].split(","));
    }

    const cryptocurrenciesQueryMatch = document.location.href.match(
      /cryptocurrencies=([^&#]*)/
    );
    if (cryptocurrenciesQueryMatch && cryptocurrenciesQueryMatch?.length > 0) {
      applyQueryToFilter(
        "cryptocurrencies",
        cryptocurrenciesQueryMatch[1].split(",")
      );
    }

    const categoriesQueryMatch =
      document.location.href.match(/categories=([^&#]*)/);
    if (categoriesQueryMatch && categoriesQueryMatch?.length > 0) {
      applyQueryToFilter("categories", categoriesQueryMatch[1].split(","));
    }
  };

  const applyFiltersToQuery = (): string => {
    let location = `${document.location.protocol}//${document.location.host}${document.location.pathname}?filtered=true`;

    const generateQueryForFilter = (id: string) => {
      if (
        (filters
          .find((section) => section.id === id)
          ?.options.filter((option) => option.checked === false)
          .length as number) !== 0
      ) {
        location += `&${id}=${filters
          .find((section) => section.id === id)
          ?.options.filter((option) => option.checked)
          .map((option) => option.id)
          .join(",")}`;
      } else {
        location.replaceAll(new RegExp(`/${id}=([^&#]*)/`, "g"), "");
      }
    };

    generateQueryForFilter("types");
    generateQueryForFilter("cryptocurrencies");
    generateQueryForFilter("categories");

    return location;
  };

  const checkboxChangeHandler = ({ target }: any) => {
    const { checked, id } = target;
    setFilters((prev) => {
      const idParts = id.split("-");
      const clickedCategory = prev.find(
        (item) => item.id.toString() === idParts[1]
      );
      if (!clickedCategory) {
        return [...prev];
      }
      const clickedOption = clickedCategory?.options.find(
        (item) => item.id.toString() === idParts[2]
      );
      if (!clickedOption) {
        return [...prev];
      }
      clickedOption.checked = checked;
      localStorage.setItem("filters", JSON.stringify(prev));
      return [...prev];
    });
  };

  const isOrganizationFiltered = (organization: any) => {
    const categoryFilters = filters.find(
      (item) => item?.id.toString() === "categories"
    );
    if (categoryFilters === undefined) {
      alert("Assertion failed A");
      return false;
    }
    for (var category of organization.categories) {
      var categoryFilterOption = categoryFilters.options.find(
        (item) => item.id === category
      );
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
  };

  const isOptionFiltered = (option: any) => {
    const typeFilters = filters.find((item) => item?.id.toString() === "types");
    if (typeFilters === undefined) {
      alert("Assertion failed C");
      return false;
    }
    var typeFilter = typeFilters.options.find(
      (item) => item.id === option.type
    );
    if (typeFilter === undefined) {
      alert("Assertion failed D " + option.type);
      return false;
    }
    if (option.type === "cryptocurrency" && typeFilter.checked) {
      var cryptocurrencyFilters = filters.find(
        (item) => item?.id.toString() === "cryptocurrencies"
      );
      if (cryptocurrencyFilters === undefined) {
        alert("Assertion failed E");
        return false;
      }
      var cryptocurrencyFilter = cryptocurrencyFilters.options.find(
        (item) => item.id === option.name
      );
      if (cryptocurrencyFilter === undefined) {
        alert("Assertion failed F " + option.name);
        return false;
      }
      return cryptocurrencyFilter.checked;
    } else {
      return typeFilter.checked;
    }
  };

  const createFilterElement = (section: any, className?: string) => {
    return section.id != "cryptocurrencies" || cryptoFilter ? (
      <Disclosure
        defaultOpen={section.id === "types"}
        as="div"
        key={section.id}
        className={`border-b border-gray-200 py-6 ${className}`}
      >
        {({ open }) => (
          <>
            <h3 className="flow-root -my-3">
              <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500">
                <span className="font-medium text-gray-900">
                  {section.name}
                </span>
                <span
                  className={`${
                    open ? "rotate-180" : ""
                  } flex items-center transition-all duration-300`}
                >
                  <ChevronDownIcon className="w-5 h-5" />
                </span>
              </Disclosure.Button>
            </h3>

            <Transition
              show={open}
              className="overflow-hidden transition-all duration-500"
              entered="overflow-auto"
              enterFrom="transform scale-95 opacity-0 max-h-0"
              enterTo="transform scale-100 opacity-100 max-h-[1000px]"
              leaveFrom="transform scale-100 opacity-100 max-h-[1000px]"
              leaveTo="transform scale-95 opacity-0 max-h-0"
            >
              <Disclosure.Panel className="p-2 pt-6">
                <div className="space-y-4">
                  {section.options.map((option: any) => (
                    <div key={option.id} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${option.id}`}
                        name={`${section.id}[]`}
                        defaultValue={option.id}
                        type="checkbox"
                        checked={option.checked}
                        onClick={checkboxChangeHandler}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded"
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
            </Transition>
          </>
        )}
      </Disclosure>
    ) : null;
  };

  const resetFilter = () => {
    setFilters((prev) =>
      prev.map((section) => {
        section.options = section.options.map((option) => {
          option.checked = true;
          return option;
        });
        return section;
      })
    );
    localStorage.setItem("filters", JSON.stringify(initialFilters));
  };

  useEffect(() => {
    applyQueryToFilters();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    history.pushState({}, "", applyFiltersToQuery());

    const isChecked = filters.some((category) => {
      return category.options.some((option) => {
        return !option.checked;
      });
    });
    setCanReset(isChecked);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const filteredOrganizations: Organization[] = organizations.filter((org) =>
    isOrganizationFiltered(org)
  );

  // Sort options by network
  const sortByNetwork = (a: Option, b: Option) => {
    if (a.type === "cryptocurrency" && b.type === "cryptocurrency") {
      return (
        NETWORKS.findIndex((network: Network) => network === a.name) -
        NETWORKS.findIndex((network: Network) => network === b.name)
      );
    } else {
      return 0;
    }
  };

  // Option mutator
  function sortCryptocurrenciesByNetworks(
    organizations: Organization[]
  ): Organization[] {
    return [...organizations].map((organization: Organization) => {
      organization.options.sort((a: Option, b: Option) => sortByNetwork(a, b));
      return organization;
    });
  }

  const sortedOrganizations =
    selectedSortOption === "Suggested"
      ? // sort the options by network of the copy of the original list
        sortCryptocurrenciesByNetworks(filteredOrganizations)
      : // we don't want to mutate the origital list as it is suggested.
        [...filteredOrganizations].sort((a, b) => b.popularity - a.popularity);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="px-3 bg-white lg:px-8 md:px-6">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
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
                <Dialog.Panel className="relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>

                    {filters.map((section) =>
                      createFilterElement(section, "px-4")
                    )}
                  </form>
                  {canReset ? (
                    <div className="flex flex-row items-center justify-center gap-4 ">
                      <button
                        id="reset"
                        type="button"
                        onClick={() => {
                          resetFilter();
                        }}
                        className="relative inline-flex items-center gap-2 px-2 py-2 mt-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                      >
                        <TrashIcon
                          className="-ml-0.5 w-4 h-4 md:h-6 md:w-6  text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="text-sm tracking-tight">
                          Reset Filter
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          toast(
                            <div className="inline-flex items-center">
                              <ClipboardIcon
                                className="w-8 h-8 mr-5 text-gray-200 "
                                aria-hidden="true"
                              />
                              <p>Copied the URL for the current filter</p>
                            </div>,
                            {
                              position: "bottom-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: false,
                              theme: "dark",
                            }
                          );
                          navigator.clipboard.writeText(window.location.href);
                        }}
                        className="relative inline-flex items-center gap-1 px-2 py-2 mt-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                      >
                        <ClipboardIcon
                          className="-ml-0.5 md:h-6 md:w-6 h-4 w-4 text-gray-400"
                          aria-hidden="true"
                        />

                        <span className="text-sm tracking-tight">
                          Share This Filter
                        </span>
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                  {filteredOrganizations.length !== organizations.length && (
                    <p className="mt-4 text-center text-gray-400">
                      Displaying {filteredOrganizations.length} of{" "}
                      {organizations.length} options
                    </p>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-end justify-between pt-24 pb-6 border-b border-gray-200">
            <div className="font-bold tracking-tight">
              <h2 className="text-base font-semibold text-red-600">
                You Can Make a Difference
              </h2>
              <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                Donate Now
              </p>
            </div>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
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
                  <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((sortOption) => (
                        <Menu.Item key={sortOption}>
                          {({ active }) => (
                            <a
                              onClick={() => setSelectedSortOption(sortOption)}
                              className={classNames(
                                sortOption === selectedSortOption
                                  ? "font-medium text-gray-900 cursor-default"
                                  : "text-gray-500 cursor-pointer",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {sortOption}
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
                className="inline-flex p-2 ml-4 -m-2 text-gray-700 group hover:text-gray-900 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <p className="text-sm font-medium">Filters</p>
                <FunnelIcon
                  className="w-5 h-5 ml-1 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
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

                {filters.map((section) => createFilterElement(section))}
                {canReset ? (
                  <div className="flex flex-col items-center justify-around gap-2 xl:gap-4 xl:flex-row ">
                    <button
                      id="reset"
                      type="button"
                      onClick={() => {
                        resetFilter();
                      }}
                      className="relative inline-flex items-center gap-1 px-2 py-2 mt-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm min-w-fit hover:bg-gray-50"
                    >
                      <TrashIcon
                        className=" -ml-0.5 mt-0.5 h-4 w-4 lg:h-6 lg:w-6  text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="text-sm tracking-tight">
                        Reset Filter
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        toast(
                          <div className="inline-flex items-center">
                            <ClipboardIcon
                              className="w-8 h-8 mr-5 text-gray-200 "
                              aria-hidden="true"
                            />
                            <p>Copied the URL for the current filter</p>
                          </div>,
                          {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: false,
                            theme: "dark",
                          }
                        );
                        navigator.clipboard.writeText(window.location.href);
                      }}
                      className="flex items-center gap-1 px-3 py-2 mt-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm min-w-fit hover:bg-gray-50"
                    >
                      <ClipboardIcon
                        className="-ml-0.5 mt-0.5 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-gray-400"
                        aria-hidden="true"
                      />

                      <span className="text-sm tracking-tight ">
                        Share This Filter
                      </span>
                    </button>
                  </div>
                ) : (
                  <></>
                )}
                {filteredOrganizations.length !== organizations.length && (
                  <p className="mt-4 text-center text-gray-400">
                    Displaying {filteredOrganizations.length} of{" "}
                    {organizations.length} options
                  </p>
                )}
              </form>

              {/* Contents */}
              <div className="lg:col-span-3">
                {sortedOrganizations.map(
                  (organization: Organization, index: number) => (
                    <OrganizationCard
                      organization={organization}
                      isOptionFiltered={isOptionFiltered}
                      key={index}
                    />
                  )
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
      <ToastContainer pauseOnFocusLoss={false} />
    </div>
  );
}
