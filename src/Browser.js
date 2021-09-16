import React, {useState, useEffect} from 'react';
import {createBrowser, removeBrowser} from './remoteHQ';
import SVG from './SVG';
import Avatars from './Avatars';
import {appShareStateUpdateEvent, appThemeUpdateEvent} from './EmbeddedAppSDK';
import "./Browser.css"; 

const Browser = (props) => {
  const {embeddedAppSDK} = props;
  const [url,setUrl]= useState("https://developer.webex.com");
  const [embedURL, setEmbedURL] = useState("");
  const [frameURL, setFrameURL] = useState("");
  const [edit,setToEdit]=useState(false);
  const [incognito,setToIncognito]=useState(false);
  const [lightTheme, setLightTheme] = useState(embeddedAppSDK.getTheme() !== 'DARK');
  const [hostView, setHostView] = useState(true);
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    if(window.location.search) {
      console.log('participant view');
      setHostView(false);
      const browserURL = decodeURIComponent(window.location.search).replace('?embedURL=', '');
      
      embeddedAppSDK.getUser().then(({displayName}) => {
        setFrameURL(`${browserURL}&userName=${displayName}`)
      });

    } else {
      console.log('host view');
    }

      embeddedAppSDK.subscribe(appThemeUpdateEvent, updateTheme).then();
      embeddedAppSDK.subscribe(appShareStateUpdateEvent, handleShare).then();
  })

  const handleData = async (e) => {
    e.preventDefault();
    const browserURL = await createBrowser(edit, incognito, url);
   
    setEmbedURL(browserURL);

    try {
      const {displayName} = await embeddedAppSDK.getUser() || {displayName: "Host"}
      
      setFrameURL(`${browserURL}&role=owner&userName=${displayName}`);
    } catch (error) {
      console.log(error);
    }
  };

  const allowOthers = (event) => {
    event.preventDefault();

    const role = edit ? 'owner' : 'guest';
    embeddedAppSDK.shareApp(`https://remotehq.ngrok.io?embedURL=${embedURL}&role=${role}`);
  };
  
  const updateTheme = (payload) => {
    if(payload === 'LIGHT') {
      setLightTheme(true);
    } else {
      setLightTheme(false);
    }
  };
 
  const handleShare = (payload) => {
    if(hostView) {
      if(!payload) {
        // show the pop-up!!!
      }
    }
  }

  const killBrowsing = (event) => {
    event.preventDefault();
    // end sharing if being shared
    // remove browser
    // start a new session
  };

  const shareButton = !isShared ? 
    <button
      onClick={(e) => {allowOthers(e)}}
      type="button"
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
    >
      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
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
      Share With Others
    </button> :
    <button
      onClick={(e) => {killBrowsing(e)}}
      type="button"
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
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
      Start New Session
    </button>;

  const header = <div>
    {shareButton}
    <Avatars />
  </div>;

  const iframe = <div>
    <div>
    {hostView && header}
    </div>
    <div>
      <iframe
        title="remoteHQ"
        name="remoteHQ"
        height="100%"
        id="remoteHQ"
        src={frameURL}
        width="100%"
      >

      </iframe>
    </div>
  </div>
  const form = <div id="main"
  className="min-h-screen flex items-center justify-center bg-purple-50 dark:bg-gray-800 py-12 px-12 sm:px-6 lg:px-8">
  <div className="max-w-md w-full space-y-12">
    <div>
      <SVG lightTheme={lightTheme} />
      <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900 dark:text-white"><span class="nowrap">Browse <span class="text-purple-600">privately</span></span>. <span class="nowrap">Browse <span class="text-purple-600">together</span></span>. <span class="nowrap">Browse <span class="text-purple-600">faster</span></span>.</h2>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-white">
        Start web browsing now as a team by setting up a co-browsing session
        below.
      </p>
    </div>
    <form className="mt-8 space-y-6" onSubmit={handleData} action="#" method="POST">
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="url" className="block text-sm font-medium text-gray-700 dark:text-white">
            URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            required
            className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            placeholder={url}
            onChange={(e)=>setUrl(e.target.value)}  
          />
        </div>
      </div>

      <div className="items-center justify-between">
        <div className="mt-1 flex items-start">
          <div className="flex items-center h-5">
            <input
              id="enable-edits"
              name="enable-edits"
              type="checkbox"
              className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded "
              onChange={(e)=>setToEdit(e.target.checked)}
            />
          </div>
          <div className="ml-3 text-sm">
            <label for="enable-edits" className="font-medium text-gray-700 dark:text-white"
              >Enable Edits</label
            >
            <p className="text-gray-400">
              Allow other participants to edit the URL
            </p>
          </div>
        </div>
        <div className="mt-1 flex items-start">
          <div className="flex items-center h-5">
            <input
              id="incognito-mode"
              name="incognito-mode"
              type="checkbox"
              className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
              onChange={(e)=>setToIncognito(e.target.checked)}
            />
          </div>
          <div className="ml-3 text-sm">
            <label for="incognito-mode" className="font-medium text-gray-700 dark:text-white"
              >Incognito Mode</label
            >
            <p className="text-gray-400">
              Use a private browser session
            </p>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
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

  return <div className={`${!lightTheme && "dark"}`}>
    {!frameURL ? form : iframe}
  </div>
};

export default Browser;