import Image from "next/image";

export function ListPricesInfos() {
  return (
    <div className="col-span-12 xl:col-span-4">
      <div className="bg-white rounded-lg shadow-lg h-full">
        {/* Header */}
        <div className="p-7">
          <div className="mb-2">
            <div className="flex items-center mb-2">
              <span className="text-4xl font-bold text-gray-800 mr-2">
                5,037
              </span>
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                2.2%
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-500">
              Treasury tokens
            </span>
          </div>

          {/* Toolbar */}
          <div className="flex justify-end">
            <button className="text-gray-500 hover:text-gray-700">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-7 pt-0">
          {/* Item template */}
          {[
            {
              name: "BTC",
              icon: "/media/svg/bitcoin-btc-logo.svg",
              category: "Bitcoin chain",
              value: 579,
              change: 2.6,
              positive: true,
            },
            {
              name: "ETH",
              icon: "/media/svg/ethereum-eth-logo.svg",
              category: "Ethereum chain",
              value: 1088,
              change: 0.4,
              positive: false,
            },
            {
              name: "USDC",
              icon: "/media/svg/usd-coin-usdc-logo.svg",
              category: "Ronin chain",
              value: 794,
              change: 0.2,
              positive: true,
            },
            {
              name: "USDT",
              icon: "/media/svg/tether-usdt-logo.svg",
              category: "Ethereum chain",
              value: 978,
              change: 4.1,
              positive: true,
            },
            {
              name: "AXS",
              icon: "/media/svg/axie-infinity-axs-logo.svg",
              category: "Ronin chain",
              value: 1458,
              change: 8.3,
              positive: true,
            },
          ].map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={10}
                    height={10}
                    className="w-8 h-8 mr-4 rounded"
                  />
                  <div>
                    <a
                      href="#"
                      className="text-gray-800 font-bold hover:text-blue-600"
                    >
                      {item.name}
                    </a>
                    <span className="text-gray-500 text-sm block">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-800 font-bold text-lg mr-3">
                    {item.value}
                  </span>
                  <span
                    className={`text-xs font-semibold inline-block py-1 px-2 rounded-full ${
                      item.positive
                        ? "text-green-600 bg-green-200"
                        : "text-red-600 bg-red-200"
                    }`}
                  >
                    {item.positive ? "↑" : "↓"} {item.change}%
                  </span>
                </div>
              </div>
              {index < 4 && <hr className="my-4 border-gray-200" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
