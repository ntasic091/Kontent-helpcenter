import React, { useState } from "react"
import { Link } from "gatsby"
// import { RichTextElement } from "@kentico/gatsby-kontent-components"
import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  connectHits,
  connectStateResults,
  Index,
  SearchBox,
  Highlight,
} from "react-instantsearch-dom"

export default function Header() {
  let appId = process.env.GATSBY_ALGOLIA_APP_ID
  let apiKey = process.env.GATSBY_ALGOLIA_APP_KEY

  const searchClient = algoliasearch(appId, apiKey)
  const [redirectStatus, setRedirectStatus] = useState(false)

  const IndexResults = connectStateResults(
    ({ searchState, searchResults, children }) => {
      if (redirectStatus) {
        searchState.query = ""
      }
      return searchResults && searchResults.nbHits !== 0 && searchState.query
        ? children
        : null
    }
  )

  return (
    <header className="z-50 sticky top-0 w-full bg-body-background">
      <div className="navbar max-width justify-between gap-8">
        <div className="px-2 mobile:hidden lg:pl-0 lg:ml-0 w-80">
          <Link to="/">
            {/* logo svg */}
            <svg
              width="281"
              height="28"
              viewBox="0 0 281 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.47228 8.15408L2.57678 6.48943L4.56312 4.53776L6.25574 6.39879C6.59883 6.13848 6.95894 5.90129 7.33369 5.68882L6.23151 3.44109L8.82647 2.38369L9.66521 4.74018C10.0842 4.62975 10.5101 4.54699 10.94 4.49245L10.7977 2H13.6076L13.4532 4.49245C13.8831 4.54714 14.3089 4.6299 14.7279 4.74018L15.5667 2.38369L18.1616 3.44109L17.0867 5.68882C17.4613 5.90148 17.8214 6.13866 18.1647 6.39879L19.8573 4.53776L21.8436 6.48943L19.9481 8.15408C20.213 8.49093 20.4547 8.8452 20.6718 9.2145L22.9609 8.13293L24.0359 10.6828L21.6286 11.5076C21.7402 11.9184 21.8242 12.3363 21.88 12.7583L24.4174 12.6193V15.3807L21.88 15.2417C21.8245 15.6638 21.7405 16.0816 21.6286 16.4924L24.0268 17.3172L22.9518 19.8671L20.6627 18.7855C20.4454 19.1546 20.2036 19.5089 19.939 19.8459L21.8345 21.5106L19.8482 23.4622L18.1556 21.6012C17.8124 21.8613 17.4523 22.0985 17.0776 22.3112L18.1798 24.5589L15.5848 25.6163L14.7461 23.2598C14.3271 23.3701 13.9012 23.4529 13.4713 23.5076L13.6137 26H10.8037L10.946 23.5076C10.5162 23.4528 10.0903 23.37 9.67126 23.2598L8.83253 25.6163L6.23757 24.5589L7.33974 22.3112C6.96511 22.0985 6.605 21.8614 6.2618 21.6012L4.56917 23.4622L2.58284 21.5106L4.47833 19.8459C4.2136 19.509 3.97183 19.1547 3.75465 18.7855L1.46553 19.8671L0.390603 17.3172L2.78874 16.4924C2.67664 16.0817 2.59267 15.6638 2.53742 15.2417L0 15.3807V12.6163L2.53742 12.7553C2.59266 12.3332 2.67663 11.9153 2.78874 11.5045L0.390603 10.6798L1.46553 8.12991L3.76374 9.2145C3.97616 8.84578 4.21285 8.49153 4.47228 8.15408ZM6.28905 13.997C6.27102 15.1682 6.60265 16.3184 7.24172 17.301C7.88079 18.2837 8.79841 19.0544 9.87782 19.5151C10.9572 19.9759 12.1496 20.1058 13.3032 19.8883C14.4569 19.6709 15.5196 19.1159 16.3561 18.2941C17.1927 17.4722 17.7653 16.4206 18.0011 15.273C18.2368 14.1255 18.1251 12.9339 17.68 11.8499C17.235 10.766 16.4769 9.83858 15.502 9.18582C14.5271 8.53306 13.3797 8.18443 12.2057 8.18429C11.4346 8.17832 10.67 8.32393 9.95537 8.61282C9.24075 8.9017 8.59016 9.3282 8.04074 9.86796C7.49133 10.4077 7.05386 11.0502 6.7533 11.7586C6.45274 12.4671 6.29499 13.2277 6.28905 13.997ZM141.272 7.77341L150.659 17.0453V8.25378H152V20.1148L142.613 10.858V19.6042H141.272V7.77341ZM124.882 13.9245C124.882 16.4834 127.083 18.6193 129.814 18.6193C132.545 18.6193 134.744 16.4834 134.744 13.9245C134.744 11.3656 132.573 9.22658 129.814 9.22658C127.056 9.22658 124.882 11.3535 124.882 13.9245ZM136.085 13.9396C136.085 17.2054 133.245 19.7946 129.814 19.7946C126.384 19.7946 123.543 17.2054 123.543 13.9396C123.543 10.6737 126.384 8.05438 129.814 8.05438C133.245 8.05438 136.085 10.6918 136.085 13.9426V13.9396ZM117.936 10.4653C117.457 9.68278 116.882 9.22961 115.861 9.22961C114.793 9.22961 113.866 9.95166 113.866 10.9909C113.866 11.9698 114.935 12.4199 115.749 12.7674L116.549 13.0997C118.114 13.7462 119.437 14.4834 119.437 16.29C119.437 18.2779 117.745 19.7976 115.656 19.7976C113.724 19.7976 112.288 18.6224 111.907 16.861L113.215 16.5136C113.289 17.1009 113.577 17.6407 114.023 18.0305C114.47 18.4203 115.044 18.633 115.637 18.6284C116.93 18.6284 118.111 17.6949 118.111 16.4169C118.111 15.139 117.009 14.6405 115.892 14.1601L115.159 13.858C113.754 13.2538 112.543 12.5801 112.543 10.9547C112.543 9.19335 114.123 8.06344 115.91 8.06344C116.54 8.04884 117.162 8.20492 117.71 8.51507C118.258 8.82522 118.712 9.27785 119.023 9.82477L117.936 10.4653ZM102.369 13.5076H102.778C104.292 13.5076 105.824 13.2356 105.824 11.4743C105.824 9.60725 104.37 9.42598 102.759 9.42598H102.36L102.369 13.5076ZM102.369 19.6042H101.028V8.25378H102.778C105.061 8.25378 107.18 8.82477 107.18 11.3837C107.18 13.1299 106.015 14.3625 104.152 14.5136L107.986 19.6042H106.342L102.708 14.6224H102.372L102.369 19.6042ZM89.5879 8.25378H95.8134V9.42598H90.9263V12.8006H95.6802V13.9758H90.9263V18.432H95.8134V19.6073H89.5879V8.25378ZM79.8985 13.4622H80.8069C82.2906 13.4622 83.5502 13.0393 83.5502 11.4139C83.5502 9.56193 81.9696 9.42598 80.4072 9.42598H79.9136L79.8985 13.4622ZM79.8985 19.6042H78.5541V8.25378H80.5344C81.5699 8.25378 82.6539 8.28399 83.5169 8.85801C83.9406 9.14332 84.2865 9.5294 84.5233 9.9814C84.7601 10.4334 84.8804 10.9371 84.8734 11.4471C84.8774 11.9133 84.7763 12.3745 84.5777 12.7965C84.3791 13.2185 84.0879 13.5905 83.7258 13.8852C82.9113 14.5166 81.8757 14.6375 80.8705 14.6375H79.8955L79.8985 19.6042ZM68.8646 10.1813V12.6798H72.4497V14.6073H68.8646V17.6798H72.589V19.6073H66.6118V8.25378H72.589V10.1813H68.8646ZM57.2494 15.0151L60.0018 8.26586H62.4242L57.2948 20.2356L52.2109 8.25378H54.6333L57.2494 15.0151ZM48.0324 19.6073H45.7796V8.25378H48.0324V19.6073ZM38.2824 17.6798H41.4708V19.6073H36.0205V8.25378H38.2824V17.6798Z"
                fill="#FA772E"
              />
              <line x1="168.5" y1="2" x2="168.5" y2="26" stroke="#C6C9D2" />
              <path
                d="M185.242 20V7.4H187.42V12.53H187.726L192.118 7.4H194.908L189.418 13.61L195.088 20H192.226L187.726 14.762H187.42V20H185.242ZM196.511 20V11.108H198.545V12.35H198.851C199.007 12.014 199.289 11.696 199.697 11.396C200.105 11.096 200.723 10.946 201.551 10.946C202.235 10.946 202.841 11.102 203.369 11.414C203.897 11.726 204.305 12.158 204.593 12.71C204.893 13.262 205.043 13.916 205.043 14.672V20H202.973V14.834C202.973 14.114 202.793 13.58 202.433 13.232C202.085 12.872 201.587 12.692 200.939 12.692C200.207 12.692 199.631 12.938 199.211 13.43C198.791 13.91 198.581 14.6 198.581 15.5V20H196.511ZM211.797 20.252C210.909 20.252 210.111 20.072 209.403 19.712C208.707 19.34 208.155 18.818 207.747 18.146C207.351 17.462 207.153 16.646 207.153 15.698V15.41C207.153 14.462 207.351 13.646 207.747 12.962C208.155 12.278 208.707 11.756 209.403 11.396C210.111 11.036 210.909 10.856 211.797 10.856C212.685 10.856 213.477 11.036 214.173 11.396C214.869 11.756 215.415 12.278 215.811 12.962C216.219 13.646 216.423 14.462 216.423 15.41V15.698C216.423 16.646 216.219 17.462 215.811 18.146C215.415 18.818 214.869 19.34 214.173 19.712C213.477 20.072 212.685 20.252 211.797 20.252ZM211.797 18.416C212.553 18.416 213.171 18.176 213.651 17.696C214.131 17.204 214.371 16.52 214.371 15.644V15.464C214.371 14.588 214.131 13.91 213.651 13.43C213.171 12.938 212.553 12.692 211.797 12.692C211.041 12.692 210.423 12.938 209.943 13.43C209.463 13.91 209.223 14.588 209.223 15.464V15.644C209.223 16.52 209.463 17.204 209.943 17.696C210.423 18.176 211.041 18.416 211.797 18.416ZM219.4 20L218.014 11.108H220.066L221.02 18.614H221.326L222.676 11.108H225.988L227.338 18.614H227.644L228.598 11.108H230.65L229.264 20H225.826L224.494 12.494H224.188L222.838 20H219.4ZM232.74 20V7.4H234.81V20H232.74ZM241.501 20.252C240.613 20.252 239.827 20.066 239.143 19.694C238.471 19.31 237.943 18.776 237.559 18.092C237.187 17.396 237.001 16.586 237.001 15.662V15.446C237.001 14.51 237.187 13.7 237.559 13.016C237.931 12.332 238.453 11.804 239.125 11.432C239.797 11.048 240.571 10.856 241.447 10.856C242.311 10.856 243.067 11.048 243.715 11.432C244.363 11.804 244.867 12.332 245.227 13.016C245.587 13.7 245.767 14.498 245.767 15.41V16.148H239.089C239.113 16.844 239.359 17.402 239.827 17.822C240.295 18.242 240.871 18.452 241.555 18.452C242.227 18.452 242.725 18.308 243.049 18.02C243.373 17.72 243.619 17.384 243.787 17.012L245.497 17.894C245.329 18.218 245.083 18.566 244.759 18.938C244.447 19.298 244.027 19.61 243.499 19.874C242.971 20.126 242.305 20.252 241.501 20.252ZM239.107 14.582H243.661C243.613 13.994 243.385 13.526 242.977 13.178C242.581 12.83 242.065 12.656 241.429 12.656C240.769 12.656 240.241 12.83 239.845 13.178C239.449 13.526 239.203 13.994 239.107 14.582ZM251.528 20.252C250.808 20.252 250.136 20.078 249.512 19.73C248.888 19.37 248.39 18.848 248.018 18.164C247.646 17.48 247.46 16.658 247.46 15.698V15.41C247.46 14.45 247.646 13.628 248.018 12.944C248.39 12.26 248.882 11.744 249.494 11.396C250.118 11.036 250.796 10.856 251.528 10.856C252.08 10.856 252.548 10.922 252.932 11.054C253.316 11.186 253.622 11.354 253.85 11.558C254.09 11.762 254.276 11.984 254.408 12.224H254.714V7.4H256.766V20H254.75V18.83H254.444C254.228 19.19 253.898 19.52 253.454 19.82C253.01 20.108 252.368 20.252 251.528 20.252ZM252.14 18.452C252.884 18.452 253.502 18.212 253.994 17.732C254.486 17.24 254.732 16.544 254.732 15.644V15.464C254.732 14.552 254.486 13.856 253.994 13.376C253.514 12.896 252.896 12.656 252.14 12.656C251.396 12.656 250.772 12.896 250.268 13.376C249.776 13.856 249.53 14.552 249.53 15.464V15.644C249.53 16.544 249.776 17.24 250.268 17.732C250.772 18.212 251.396 18.452 252.14 18.452ZM258.956 15.59V15.32C258.956 14.384 259.142 13.586 259.514 12.926C259.886 12.254 260.384 11.744 261.008 11.396C261.632 11.036 262.316 10.856 263.06 10.856C263.9 10.856 264.536 11.006 264.968 11.306C265.412 11.606 265.736 11.93 265.94 12.278H266.246V11.108H268.262V21.692C268.262 22.28 268.094 22.742 267.758 23.078C267.422 23.426 266.966 23.6 266.39 23.6H260.414V21.8H265.688C266.036 21.8 266.21 21.62 266.21 21.26V18.686H265.904C265.772 18.89 265.592 19.1 265.364 19.316C265.136 19.52 264.836 19.694 264.464 19.838C264.092 19.982 263.624 20.054 263.06 20.054C262.316 20.054 261.632 19.88 261.008 19.532C260.384 19.172 259.886 18.662 259.514 18.002C259.142 17.33 258.956 16.526 258.956 15.59ZM263.636 18.236C264.38 18.236 264.998 18.002 265.49 17.534C265.982 17.054 266.228 16.388 266.228 15.536V15.356C266.228 14.492 265.982 13.826 265.49 13.358C265.01 12.89 264.392 12.656 263.636 12.656C262.892 12.656 262.268 12.89 261.764 13.358C261.272 13.826 261.026 14.492 261.026 15.356V15.536C261.026 16.388 261.272 17.054 261.764 17.534C262.268 18.002 262.892 18.236 263.636 18.236ZM274.952 20.252C274.064 20.252 273.278 20.066 272.594 19.694C271.922 19.31 271.394 18.776 271.01 18.092C270.638 17.396 270.452 16.586 270.452 15.662V15.446C270.452 14.51 270.638 13.7 271.01 13.016C271.382 12.332 271.904 11.804 272.576 11.432C273.248 11.048 274.022 10.856 274.898 10.856C275.762 10.856 276.518 11.048 277.166 11.432C277.814 11.804 278.318 12.332 278.678 13.016C279.038 13.7 279.218 14.498 279.218 15.41V16.148H272.54C272.564 16.844 272.81 17.402 273.278 17.822C273.746 18.242 274.322 18.452 275.006 18.452C275.678 18.452 276.176 18.308 276.5 18.02C276.824 17.72 277.07 17.384 277.238 17.012L278.948 17.894C278.78 18.218 278.534 18.566 278.21 18.938C277.898 19.298 277.478 19.61 276.95 19.874C276.422 20.126 275.756 20.252 274.952 20.252ZM272.558 14.582H277.112C277.064 13.994 276.836 13.526 276.428 13.178C276.032 12.83 275.516 12.656 274.88 12.656C274.22 12.656 273.692 12.83 273.296 13.178C272.9 13.526 272.654 13.994 272.558 14.582Z"
                fill="var(--body-text)"
              />
            </svg>
          </Link>
        </div>
        <div className="px-2 mx-2 navbar-start md:hidden mobile:visible">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="152"
              height="24"
              fill="none"
            >
              <path
                fill="#FF6900"
                d="M4.472 6.154L2.577 4.49l1.986-1.951 1.693 1.86a9.78 9.78 0 011.078-.71L6.232 1.442 8.826.384l.84 2.356c.418-.11.844-.193 1.274-.248L10.798 0h2.81l-.155 2.492c.43.055.856.138 1.275.248l.839-2.356 2.595 1.057-1.075 2.248c.374.212.734.45 1.078.71l1.692-1.861 1.987 1.951-1.896 1.665c.265.337.507.691.724 1.06l2.289-1.081 1.075 2.55-2.407.825c.111.41.195.828.251 1.25l2.537-.139v2.762l-2.537-.14c-.055.423-.14.84-.251 1.251l2.398.825-1.075 2.55-2.29-1.082c-.217.37-.458.724-.723 1.06l1.895 1.666-1.986 1.951-1.692-1.86a9.77 9.77 0 01-1.078.71l1.102 2.247-2.595 1.057-.839-2.356c-.419.11-.845.193-1.275.248L13.614 24h-2.81l.142-2.492a9.971 9.971 0 01-1.275-.248l-.838 2.356-2.595-1.057L7.34 20.31a9.761 9.761 0 01-1.078-.71l-1.693 1.861-1.986-1.951 1.895-1.665a9.568 9.568 0 01-.723-1.06l-2.29 1.081-1.074-2.55 2.398-.825a9.367 9.367 0 01-.252-1.25L0 13.38v-2.765l2.537.14c.056-.423.14-.84.252-1.251L.39 8.68l1.075-2.55 2.298 1.085c.212-.37.449-.723.708-1.06zm1.817 5.843a5.893 5.893 0 00.953 3.304 5.928 5.928 0 009.114.993A5.9 5.9 0 0017.68 9.85a5.906 5.906 0 00-2.178-2.664 5.926 5.926 0 00-3.296-1.002A5.883 5.883 0 008.04 7.868a5.858 5.858 0 00-1.752 4.129zm134.983-6.224l9.387 9.272V6.254H152v11.86l-9.387-9.256v8.746h-1.341V5.774zm-16.39 6.152c0 2.558 2.201 4.694 4.932 4.694 2.731 0 4.93-2.136 4.93-4.694 0-2.56-2.171-4.698-4.93-4.698-2.758 0-4.932 2.126-4.932 4.697zm11.203.015c0 3.265-2.84 5.855-6.271 5.855-3.43 0-6.271-2.59-6.271-5.855 0-3.266 2.841-5.886 6.271-5.886 3.431 0 6.271 2.638 6.271 5.889v-.003zm-18.149-3.475c-.479-.782-1.054-1.235-2.075-1.235-1.068 0-1.995.722-1.995 1.76 0 .98 1.069 1.43 1.883 1.777l.8.333c1.565.646 2.888 1.383 2.888 3.19 0 1.988-1.692 3.508-3.781 3.508-1.932 0-3.368-1.176-3.749-2.937l1.308-.347a2.417 2.417 0 002.422 2.114c1.293 0 2.474-.933 2.474-2.211 0-1.278-1.102-1.777-2.219-2.257l-.733-.302c-1.405-.604-2.616-1.278-2.616-2.903 0-1.762 1.58-2.892 3.367-2.892a3.49 3.49 0 013.113 1.762l-1.087.64zm-15.567 3.043h.409c1.514 0 3.046-.272 3.046-2.034 0-1.867-1.454-2.048-3.065-2.048h-.399l.009 4.082zm0 6.096h-1.341V6.254h1.75c2.283 0 4.402.57 4.402 3.13 0 1.746-1.165 2.979-3.028 3.13l3.834 5.09h-1.644l-3.634-4.982h-.336l-.003 4.982zM89.588 6.254h6.225v1.172h-4.887v3.375h4.754v1.175h-4.754v4.456h4.887v1.175h-6.225V6.254zm-9.69 5.208h.909c1.484 0 2.743-.423 2.743-2.048 0-1.852-1.58-1.988-3.143-1.988h-.493l-.016 4.036zm0 6.142h-1.344V6.254h1.98c1.036 0 2.12.03 2.983.604a3.075 3.075 0 011.356 2.59 3.106 3.106 0 01-1.147 2.437c-.815.632-1.85.752-2.855.752h-.975l.002 4.967zM68.865 8.181v2.499h3.585v1.927h-3.585v3.073h3.724v1.927h-5.977V6.254h5.977V8.18h-3.724zm-11.616 4.834l2.753-6.75h2.422l-5.13 11.97-5.083-11.981h2.422l2.616 6.761zm-9.217 4.592H45.78V6.254h2.252v11.353zm-9.75-1.927h3.189v1.927h-5.45V6.254h2.261v9.426z"
              ></path>
            </svg>
          </Link>
        </div>
        <div className="searchcomponent hidden flex-grow navbar-center lg:flex">
          <div className="flex items-stretch w-full flex-col relative">
            <InstantSearch
              indexName="helpcenter"
              searchClient={searchClient}
              onSearchStateChange={() => {
                setRedirectStatus(false)
              }}
              refresh={true}
              searchable={true}
            >
              <SearchBox
                submit={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 19.6L16.5 15C17.5 13.7 18 12.2 18 10.5C18 6.4 14.6 3 10.5 3C6.4 3 3 6.4 3 10.5C3 14.6 6.4 18 10.5 18C12.2 18 13.8 17.4 15 16.5L19.5 21L21 19.6ZM10.5 16C7.5 16 5 13.5 5 10.5C5 7.5 7.5 5 10.5 5C13.5 5 16 7.5 16 10.5C16 13.5 13.5 16 10.5 16Z"
                      fill="var(--search-input-color)"
                    />
                  </svg>
                }
                style={{ borderRadius: `32px`, backgroundColor: "#EEEFF1" }}
                type="text"
                placeholder="SEARCH"
                className="search-input w-full rounded-full"
              />

              <Index indexName="helpcenter">
                <IndexResults>
                  <div
                    className="right-panel shadow"
                    style={{
                      background: "var(--body-background)",
                      color: "var(--body-text)",
                      borderRadius: 5,
                      zIndex: 9999,
                      position: "absolute",
                      top: "3rem",
                      width: "100%",
                      maxHeight: "75vh",
                      overflowY: "auto",
                    }}
                  >
                    <CustomHits onClose={() => setRedirectStatus(true)} />
                  </div>
                </IndexResults>
              </Index>
            </InstantSearch>
          </div>
        </div>
        <div className="gap-8">
          <label
            htmlFor="my-drawer-2"
            className="my-4 mr-2 drawer-button lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
          <a
            href="https://liveengage.liveperson.net/"
            target="_blank"
            rel="noreferrer"
            className="text-primary normal-case rounded-full mobile:hidden"
            style={{ fontSize: "1.125rem", lineHeight: "1.75rem" }}
          >
            Sign in
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://developers.liveperson.com/register.html"
            className="btn btn-primary normal-case rounded-full px-8 mobile:hidden"
          >
            Free trial
          </a>
        </div>
      </div>
    </header>
  )
}

const Hit = props => {
  return (
    <div>
      {props?.hits?.length > 0
        ? props.hits.map((pP, index) => {
            return (
              <div key={index} className="hit-block">
                <Link to={`/${pP.link}`} onClick={props.onClose}>
                  <div className="hit-name">
                    <p className="font-bold" attribute="name">
                      <Highlight attribute="title" hit={pP} />
                    </p>
                  </div>
                  <div className="hit-description text-body-text">
                    {/* <RichTextElement value={pP.subtitle}> */}
                    <Highlight attribute="subtitle" hit={pP} />
                    {/* </RichTextElement> */}
                  </div>
                </Link>
              </div>
            )
          })
        : null}
    </div>
  )
}

const CustomHits = connectHits(props => <Hit {...props} />)
