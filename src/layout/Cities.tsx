const Cities = () => {
    const yangonCities = [
      { id: 1, name: "Latha" },
      { id: 2, name: "Lanmadaw" },
      { id: 3, name: "Pabedan" },
      { id: 4, name: "Kyauktada" },
      { id: 5, name: "Botahtaung" },
      { id: 6, name: "Insein" },
      { id: 7, name: "Hlaing" },
      { id: 8, name: "Kamayut" },
      { id: 9, name: "Mayangone" },
      { id: 10, name: "North Okkalapa" },
      { id: 11, name: "South Okkalapa" },
      { id: 12, name: "Hlaingthaya" },
      { id: 13, name: "Mingaladon" },
      { id: 14, name: "Thingangyun" },
      { id: 15, name: "Tamwe" },
      { id: 16, name: "Thaketa" },
      { id: 17, name: "Dawbon" },
      { id: 18, name: "Pazundaung" },
      { id: 19, name: "Mingala Taungnyunt" },
      { id: 20, name: "Bahan" },
      { id: 21, name: "Yankin" },
      { id: 22, name: "Ahlone" },
      { id: 23, name: "Kyeemyindaing" },
      { id: 24, name: "Sanchaung" },
      { id: 25, name: "Seikkan" },
      { id: 26, name: "Htantabin" },
      { id: 27, name: "Dala" },
      { id: 28, name: "Twante" },
      { id: 29, name: "Kawhmu" },
      { id: 30, name: "Kungyangon" },
      { id: 31, name: "Thanlyin" },
      { id: 32, name: "Kyauktan" },
      { id: 33, name: "Thongwa" },
      { id: 34, name: "Kayan" }
    ];

  return (
    <div className="relative w-full my-8 text-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 718"
          preserveAspectRatio="none"
          className="w-full h-full"
          fill="none"
        >
          <path
            d="M1927.47 731.366L1920 342.963V29.9551C1592.99 46.4154 1215.75 94.3249 931.208 87.9289C543.93 78.9714 272.164 -14.2594 -4.5 2.30891V734.175C537.581 806.662 1495.94 635.799 1927.47 731.366Z"
            fill="#3F9A1E"
          />
        </svg>
      </div>
      {/* Foreground content */}
      <div className="relative z-10 py-12">
        <h2 className="text-3xl text-white mt-6 mb-8 font-bold">Cities where we deliver</h2>
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {yangonCities.map((city) => (
            <span
              key={city.id}
              className="px-4 py-2 text-xs rounded-full bg-mainBg text-gray-800 shadow"
            >
              {city.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cities
