"use client";

import { Transition } from "@headlessui/react";
import { ClipboardIcon, LinkIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { categoryDetails, explorers, icons } from "../config/donations";
import type { Option, Organization } from "./types";
import { classNames } from "./utils";

type OrganizationCardProps = {
  organization: Organization;
  isOptionFiltered: (option: Option) => boolean;
};

export default function OrganizationCard({
  organization,
  isOptionFiltered,
}: OrganizationCardProps) {
  const [expanded, setExpanded] = useState(false);

  const optionToIconUrl = (option: Option) =>
    option.type === "cryptocurrency"
      ? icons.cryptocurrencies[option.name]
      : icons[option.type];

  const onCopy = (option: any) => {
    if (option.address) {
      toast(
        <div className="inline-flex items-center">
          <ClipboardIcon
            className="h-8 w-8 sm:h-8 sm:w-8 text-gray-200 mr-5"
            aria-hidden="true"
          />
          <p>
            Copied {option.name} address of {organization.name} to clipboard
          </p>
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
      navigator.clipboard.writeText(option.address);
    }
  };

  const createHeaderContent = () => {
    return (
      <div className="ml-4 mt-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-16 w-16 mix-blend-multiply"
              src={organization.logoUrl}
              alt={`${organization.name} logo`}
            />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold ml-1 leading-6 text-gray-900">
              {organization.name}
            </h3>
            <div className="space-x-2">
              {organization.categories.map((category: string) => (
                <span
                  key={categoryDetails[category].name}
                  className={classNames(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    categoryDetails[category].classes
                  )}
                >
                  {categoryDetails[category].name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const createHeaderLinks = () => {
    return (
      <div className="mt-4 flex grow justify-center sm:justify-end">
        <Link href={organization.twitterUrl}>
          <button
            type="button"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <div
              className="-ml-1 mr-2 h-5 w-5 text-gray-400 fill-current"
              aria-hidden="true"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Twitter</title>
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </div>
            <span>Twitter</span>
          </button>
        </Link>
        <Link href={organization.websiteUrl}>
          <button
            type="button"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <LinkIcon
              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>Website</span>
          </button>
        </Link>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <div
            className={`${
              expanded ? "rotate-180" : ""
            } h-5 w-5 text-gray-400 fill-current transition-all duration-300`}
            aria-hidden="true"
          >
            <ChevronDownIcon />
          </div>
        </button>
      </div>
    );
  };

  const createOptionDesc = (option: any) => {
    return (
      <td className="text-sm px-2 sm:px-3">
        <div className="flex sm:w-28 items-center">
          <div className="h-6 w-6 flex-shrink-0">
            <img
              className="h-6 w-6 rounded-full"
              src={optionToIconUrl(option)}
              alt=""
            />
          </div>
          <div className="hidden sm:block ml-2">
            <div className="font-medium text-gray-600">{option.name}</div>
          </div>
        </div>
      </td>
    );
  };

  const createOptionAdress = (option: any) => {
    return (
      <td className="truncate text-sm text-gray-500 ">
        {option.type === "cryptocurrency" ? (
          <div>
            <p className="truncate">{option.address}</p>
            <div className="space-x-2 mt-0.5">
              <Link
                href={`${explorers[option.name]}${option.address}`}
                passHref={true}
              >
                <span className="inline-flex items-center rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-900">
                  <span className="truncate">Explorer</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </span>
              </Link>
              {option.sourceUrls?.map((sourceUrl: string, index: number) => (
                <Link key={index} href={sourceUrl} passHref={true}>
                  <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-900">
                    Source
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3 ml-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ) : option.linkUrl ? (
          <Link className="truncate" href={option.linkUrl}>
            {option.linkName}
          </Link>
        ) : (
          <p>{option.linkName}</p>
        )}
      </td>
    );
  };

  const createOptionActions = (option: any) => {
    return (
      <td className="px-2 sm:px-3 md:space-x-1 text-sm text-gray-400 grow inline-flex place-items-center justify-end">
        {option.info && (
          <Tooltip
            content={option.info}
            className="align-center"
            placement="right"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </div>
          </Tooltip>
        )}
        {option.warning && (
          <Tooltip
            content={option.warning}
            className="align-center"
            placement="right"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
                />
              </svg>
            </div>
          </Tooltip>
        )}
        <button
          type="button"
          onClick={() => onCopy(option)}
          className={classNames(
            "relative sm:ml-1 md:ml-2 l-5 inline-flex items-center rounded-md sm:border border-gray-300 bg-white sm:px-4 sm:py-2 font-medium text-gray-700 sm:shadow-sm hover:bg-gray-50 float-right",
            option.address ? "block" : "hidden"
          )}
        >
          <ClipboardIcon
            className="-ml-0.5 h-6 w-6 sm:h-4 sm:w-4 text-gray-400"
            aria-hidden="true"
          />
          <p className="hidden md:block ml-2">Copy</p>
        </button>
      </td>
    );
  };

  const createOption = (option: Option, index: number) => {
    return (
      <tr
        key={index}
        className="flex justify-items-end w-full place-items-center py-2 sm:py-5"
      >
        {createOptionDesc(option)}
        {createOptionAdress(option)}
        {createOptionActions(option)}
      </tr>
    );
  };

  function Body() {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <p className="mt-4 text-sm text-gray-700">{organization.description}</p>
        <div className="mt-6 flex flex-col">
          <div className="-mt-2 -mx-4 overflow-x-auto sm:mb-4 sm:-mx-6 lg:-mx-8 border-gray-200 border-t sm:border-none">
            <div className="min-w-full align-middle sm:py-2 md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="flex flex-col divide-y divide-gray-300">
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {organization.options.map(
                      (option: Option, index: number) =>
                        isOptionFiltered(option) && createOption(option, index)
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Header() {
    const headerContent = createHeaderContent();
    const headerLinks = createHeaderLinks();

    return (
      <div
        className={`${
          expanded ? "border-b border-gray-200" : ""
        } px-4 py-5 sm:px-6`}
      >
        <div className="-mt-4 flex flex-wrap items-center sm:flex-nowrap grow justify-center">
          {headerContent}
          {headerLinks}
        </div>
      </div>
    );
  }

  return (
    <div
      data-type="organization"
      className="bg-gray-50 mb-8 rounded-lg border-solid border-4 border-gray-100 shadow ring-1 ring-black ring-opacity-5"
    >
      <Header />
      <Transition
        show={expanded}
        className="transition-all duration-500 overflow-hidden"
        entered="overflow-auto"
        enterFrom="transform scale-95 opacity-0 max-h-0"
        enterTo="transform scale-100 opacity-100 max-h-[10000px]"
        leaveFrom="transform scale-100 opacity-100 max-h-[10000px]"
        leaveTo="transform scale-95 opacity-0 max-h-0"
      >
        <Body />
      </Transition>
    </div>
  );
}
