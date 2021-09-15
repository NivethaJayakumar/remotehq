import React, {useState, useEffect} from 'react';
import {createBrowser, removeBrowser} from './remoteHQ';
import logo from './remoteHQ.svg';
import "./Browser.css";

const Browser = (props) => {
  const {embeddedAppSDK} = props;
  const [allowOthersToEdit, setAllowOtherstoEdit] = useState(false);

  const allowOthers = () => {};
  return <div
  id="main"
  class="min-h-screen flex items-center justify-center bg-purple-50 py-12 px-12 sm:px-6 lg:px-8"
>
  <div class="max-w-md w-full space-y-12">
    <div>
      <img class="mx-auto h-12 w-auto" src={logo} alt="RemoteHQ" />
      <h2 class="mt-6 text-center text-3l font-extrabold text-gray-900">
        <span class="nowrap">
          Browse <span class="text-purple-600">privately</span>.
        </span>
        <span class="nowrap">
          Browse <span class="text-purple-600">together</span>.
        </span>
        <span class="nowrap">
          Browse <span class="text-purple-600">faster</span>.
        </span>
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Start web browsing now as a team by setting up a co-browsing session
        below.
      </p>
    </div>
    <form class="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="url" class="block text-sm font-medium text-gray-700">
            URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            required
            class="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            placeholder="https://developer.webex.com"
          />
        </div>
      </div>

      <div class="items-center justify-between">
        <div class="mt-1 flex items-start">
          <div class="flex items-center h-5">
            <input
              id="enable-edits"
              name="enable-edits"
              type="checkbox"
              class="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="enable-edits" class="font-medium text-gray-700"
              >Enable Edits</label
            >
            <p class="text-gray-500">
              Allow other participants to edit the URL
            </p>
          </div>
        </div>
        <div class="mt-1 flex items-start">
          <div class="flex items-center h-5">
            <input
              id="incognito-mode"
              name="incognito-mode"
              type="checkbox"
              class="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="incognito-mode" class="font-medium text-gray-700"
              >Incognito Mode</label
            >
            <p class="text-gray-500">
              Use a private browser session
            </p>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-purple-500 group-hover:text-purple-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          Start Browsing
        </button>
      </div>
    </form>
  </div>
</div>;
};

export default Browser;