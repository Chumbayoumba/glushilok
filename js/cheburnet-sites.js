/* Чебурнет — конфигурация проверяемых ресурсов.
   18 категорий, 221 домен. Структура и список адаптированы из публичного
   набора dpi.rip. checker: providers -> DPI-проба, geoblock -> гео-проба,
   остальные -> обычная проба доступности. */
window.SITES_CONFIG = [
 {
  "id": "providers",
  "en": "Providers (TCP 16-20)",
  "ru": "Провайдеры (TCP 16-20)",
  "checker": null,
  "sites": [
   {
    "d": "www.mobil.com.se",
    "name": "Akamai",
    "flag": "PL"
   },
   {
    "d": "cdn.apple-mapkit.com",
    "name": "Akamai",
    "flag": "SE"
   },
   {
    "d": "vibersporocila.akton.si",
    "name": "AWS",
    "flag": "DE"
   },
   {
    "d": "corp.kaltura.com",
    "name": "AWS",
    "flag": "US"
   },
   {
    "d": "cdn.eso.org",
    "name": "CDN77",
    "flag": "US"
   },
   {
    "d": "hertzen.com",
    "name": "Cloudflare",
    "flag": "CA"
   },
   {
    "d": "justice.gov",
    "name": "Cloudflare",
    "flag": "CA"
   },
   {
    "d": "img.wzstats.gg",
    "name": "Cloudflare",
    "flag": "US"
   },
   {
    "d": "esm.sh",
    "name": "Cloudflare",
    "flag": "US"
   },
   {
    "d": "ctbnew.netmania.hu",
    "name": "Contabo",
    "flag": "FR"
   },
   {
    "d": "oddremedies.com",
    "name": "Contabo",
    "flag": "FR"
   },
   {
    "d": "ui-arts.com",
    "name": "DigitalOcean",
    "flag": "DE"
   },
   {
    "d": "africa-s.org",
    "name": "DigitalOcean",
    "flag": "GB"
   },
   {
    "d": "admin.survey54.com",
    "name": "DigitalOcean",
    "flag": "GB"
   },
   {
    "d": "ssl.p.jwpcdn.com",
    "name": "Fastly",
    "flag": "CA"
   },
   {
    "d": "www.jetblue.com",
    "name": "Fastly",
    "flag": "US"
   },
   {
    "d": "buyvm.net",
    "name": "FT/BuyVM",
    "flag": "US"
   },
   {
    "d": "dmvideo.download",
    "name": "FT/BuyVM",
    "flag": "US"
   },
   {
    "d": "gcore.com",
    "name": "Gcore",
    "flag": "LU"
   },
   {
    "d": "api.usercentrics.eu",
    "name": "Google Cloud",
    "flag": "US"
   },
   {
    "d": "widgets.reputation.com",
    "name": "Google Cloud",
    "flag": "US"
   },
   {
    "d": "king.hr",
    "name": "Hetzner",
    "flag": "DE"
   },
   {
    "d": "mail.server.apaone.com",
    "name": "Hetzner",
    "flag": "DE"
   },
   {
    "d": "nioges.com",
    "name": "Hetzner",
    "flag": "FI"
   },
   {
    "d": "5fd8bdae.nip.io",
    "name": "Hetzner",
    "flag": "FI"
   },
   {
    "d": "5fd8bca5.nip.io",
    "name": "Hetzner",
    "flag": "FI"
   },
   {
    "d": "elecane.com",
    "name": "Melbicom",
    "flag": "US"
   },
   {
    "d": "store.takeda.com",
    "name": "Microsoft/Azure",
    "flag": "NL"
   },
   {
    "d": "sh00065.hostgator.com",
    "name": "Oracle",
    "flag": "ES"
   },
   {
    "d": "vps.inprodec.com",
    "name": "Oracle",
    "flag": "SG"
   },
   {
    "d": "www.adwin.fr",
    "name": "OVH",
    "flag": "FR"
   },
   {
    "d": "www.emca.be",
    "name": "OVH",
    "flag": "FR"
   },
   {
    "d": "www.velivole.fr",
    "name": "Scaleway",
    "flag": "NL"
   },
   {
    "d": "gertrud.tv",
    "name": "Vultr",
    "flag": "DE"
   },
   {
    "d": "us.rudder.qntmnet.com",
    "name": "Vultr",
    "flag": "US"
   }
  ]
 },
 {
  "id": "geoblock",
  "en": "GeoBlock",
  "ru": "Гео-блок",
  "checker": "cdn-trace",
  "sites": [
   {
    "d": "chatgpt.com",
    "name": "ChatGPT",
    "flag": "US",
    "blockedIn": [
     "CN",
     "RU",
     "BY",
     "KP",
     "CU",
     "IR",
     "SY",
     "VE",
     "MM"
    ]
   },
   {
    "d": "claude.ai",
    "name": "Claude",
    "flag": "US",
    "blockedIn": [
     "CN",
     "RU",
     "BY",
     "KP",
     "CU",
     "IR",
     "SY"
    ]
   },
   {
    "d": "grok.com",
    "name": "Grok",
    "flag": "US",
    "blockedIn": [
     "CN",
     "RU",
     "KP",
     "CU",
     "IR",
     "SY"
    ]
   },
   {
    "d": "perplexity.ai",
    "name": "Perplexity",
    "flag": "US",
    "blockedIn": [
     "CN",
     "KP",
     "CU",
     "IR",
     "SY"
    ]
   },
   {
    "d": "notion.so",
    "name": "Notion",
    "flag": "US",
    "blockedIn": [
     "CN",
     "RU",
     "BY",
     "KP",
     "CU",
     "IR",
     "SY",
     "VE",
     "MM"
    ]
   },
   {
    "d": "4pda.to",
    "name": "4PDA",
    "flag": "US",
    "blockedIn": [
     "RU"
    ]
   },
   {
    "d": "swagger.io",
    "name": "Swagger",
    "flag": "US",
    "blockedIn": [
     "RU"
    ]
   },
   {
    "d": "redis.io",
    "name": "Redis",
    "flag": "US",
    "blockedIn": [
     "RU"
    ]
   },
   {
    "d": "hostinger.com",
    "name": "Hostinger",
    "flag": "US",
    "blockedIn": [
     "RU"
    ]
   }
  ]
 },
 {
  "id": "social_intl",
  "en": "Social Media (International)",
  "ru": "Соцсети (международные)",
  "checker": null,
  "sites": [
   {
    "d": "x.com",
    "name": "X / Twitter",
    "flag": "US"
   },
   {
    "d": "facebook.com",
    "name": "Facebook",
    "flag": "US"
   },
   {
    "d": "instagram.com",
    "name": "Instagram",
    "flag": "US"
   },
   {
    "d": "tiktok.com",
    "name": "TikTok",
    "flag": "CN"
   },
   {
    "d": "linkedin.com",
    "name": "LinkedIn",
    "flag": "US"
   },
   {
    "d": "reddit.com",
    "name": "Reddit",
    "flag": "US"
   },
   {
    "d": "t.me",
    "name": "Telegram",
    "flag": "GB"
   },
   {
    "d": "telegram.org",
    "name": "Telegram Web",
    "flag": "GB"
   },
   {
    "d": "snapchat.com",
    "name": "Snapchat",
    "flag": "US"
   },
   {
    "d": "pinterest.com",
    "name": "Pinterest",
    "flag": "US"
   },
   {
    "d": "threads.net",
    "name": "Threads",
    "flag": "US"
   },
   {
    "d": "mastodon.social",
    "name": "Mastodon",
    "flag": "DE"
   }
  ]
 },
 {
  "id": "social_ru",
  "en": "Social Media (Russian)",
  "ru": "Соцсети (российские)",
  "checker": null,
  "sites": [
   {
    "d": "vk.com",
    "name": "ВКонтакте",
    "flag": "RU"
   },
   {
    "d": "ok.ru",
    "name": "Одноклассники",
    "flag": "RU"
   },
   {
    "d": "dzen.ru",
    "name": "Дзен",
    "flag": "RU"
   },
   {
    "d": "pikabu.ru",
    "name": "Pikabu",
    "flag": "RU"
   },
   {
    "d": "livejournal.com",
    "name": "LiveJournal",
    "flag": "RU"
   },
   {
    "d": "rutube.ru",
    "name": "RuTube",
    "flag": "RU"
   }
  ]
 },
 {
  "id": "dating",
  "en": "Dating",
  "ru": "Знакомства",
  "checker": null,
  "sites": [
   {
    "d": "tinder.com",
    "name": "Tinder",
    "flag": "US"
   },
   {
    "d": "bumble.com",
    "name": "Bumble",
    "flag": "US"
   },
   {
    "d": "grindr.com",
    "name": "Grindr",
    "flag": "US"
   },
   {
    "d": "pure.app",
    "name": "Pure",
    "flag": "US"
   },
   {
    "d": "badoo.com",
    "name": "Badoo",
    "flag": "RU"
   },
   {
    "d": "mamba.ru",
    "name": "Mamba",
    "flag": "RU"
   },
   {
    "d": "loveplanet.ru",
    "name": "LovePlanet",
    "flag": "RU"
   },
   {
    "d": "okcupid.com",
    "name": "OkCupid",
    "flag": "US"
   },
   {
    "d": "twinby.com",
    "name": "Twinby",
    "flag": "RU"
   },
   {
    "d": "vk.com/vkdating",
    "name": "VK Знакомства",
    "flag": "RU"
   }
  ]
 },
 {
  "id": "video",
  "en": "Video Streaming",
  "ru": "Видеостриминг",
  "checker": null,
  "sites": [
   {
    "d": "youtube.com",
    "name": "YouTube",
    "flag": "US"
   },
   {
    "d": "netflix.com",
    "name": "Netflix",
    "flag": "US"
   },
   {
    "d": "max.com",
    "name": "Max (HBO)",
    "flag": "US"
   },
   {
    "d": "disneyplus.com",
    "name": "Disney+",
    "flag": "US"
   },
   {
    "d": "primevideo.com",
    "name": "Prime Video",
    "flag": "US"
   },
   {
    "d": "twitch.tv",
    "name": "Twitch",
    "flag": "US"
   },
   {
    "d": "vimeo.com",
    "name": "Vimeo",
    "flag": "US"
   },
   {
    "d": "dailymotion.com",
    "name": "Dailymotion",
    "flag": "FR"
   },
   {
    "d": "vkvideo.ru",
    "name": "VK Видео",
    "flag": "RU"
   },
   {
    "d": "ivi.ru",
    "name": "ivi",
    "flag": "RU"
   },
   {
    "d": "okko.tv",
    "name": "Okko",
    "flag": "RU"
   },
   {
    "d": "kinopoisk.ru",
    "name": "Кинопоиск",
    "flag": "RU"
   }
  ]
 },
 {
  "id": "news_intl",
  "en": "News (International)",
  "ru": "Новости (международные)",
  "checker": null,
  "sites": [
   {
    "d": "nytimes.com",
    "name": "NY Times",
    "flag": "US"
   },
   {
    "d": "cnn.com",
    "name": "CNN",
    "flag": "US"
   },
   {
    "d": "cbsnews.com",
    "name": "CBS News",
    "flag": "US"
   },
   {
    "d": "bbc.com",
    "name": "BBC",
    "flag": "GB"
   },
   {
    "d": "theguardian.com",
    "name": "The Guardian",
    "flag": "GB"
   },
   {
    "d": "reuters.com",
    "name": "Reuters",
    "flag": "GB"
   },
   {
    "d": "dw.com",
    "name": "Deutsche Welle",
    "flag": "DE"
   },
   {
    "d": "france24.com",
    "name": "France 24",
    "flag": "FR"
   },
   {
    "d": "lemonde.fr",
    "name": "Le Monde",
    "flag": "FR"
   },
   {
    "d": "abc.net.au",
    "name": "ABC Australia",
    "flag": "AU"
   },
   {
    "d": "sbs.com.au",
    "name": "SBS Australia",
    "flag": "AU"
   },
   {
    "d": "timesofindia.indiatimes.com",
    "name": "Times of India",
    "flag": "IN"
   },
   {
    "d": "ndtv.com",
    "name": "NDTV",
    "flag": "IN"
   },
   {
    "d": "scmp.com",
    "name": "SCMP",
    "flag": "HK"
   },
   {
    "d": "www.nhk.or.jp",
    "name": "NHK",
    "flag": "JP"
   },
   {
    "d": "aljazeera.com",
    "name": "Al Jazeera",
    "flag": "QA"
   }
  ]
 },
 {
  "id": "news_ru_gov",
  "en": "News (Russian / State)",
  "ru": "Новости (российские / госСМИ)",
  "checker": null,
  "sites": [
   {
    "d": "rt.com",
    "name": "RT",
    "flag": "RU"
   },
   {
    "d": "tass.ru",
    "name": "ТАСС",
    "flag": "RU"
   },
   {
    "d": "ria.ru",
    "name": "РИА Новости",
    "flag": "RU"
   },
   {
    "d": "interfax.ru",
    "name": "Интерфакс",
    "flag": "RU"
   },
   {
    "d": "kommersant.ru",
    "name": "Коммерсантъ",
    "flag": "RU"
   },
   {
    "d": "lenta.ru",
    "name": "Лента.ру",
    "flag": "RU"
   },
   {
    "d": "rbc.ru",
    "name": "РБК",
    "flag": "RU"
   }
  ]
 },
 {
  "id": "news_ru_opp",
  "en": "News (Russian / Opposition)",
  "ru": "Новости (российские / оппозиция)",
  "checker": null,
  "sites": [
   {
    "d": "meduza.io",
    "name": "Медуза",
    "flag": "LV"
   },
   {
    "d": "novayagazeta.eu",
    "name": "Новая газета",
    "flag": "LV"
   },
   {
    "d": "currenttime.tv",
    "name": "Настоящее время",
    "flag": "US"
   },
   {
    "d": "theins.ru",
    "name": "The Insider",
    "flag": "LV"
   },
   {
    "d": "holod.media",
    "name": "Холод",
    "flag": "LV"
   },
   {
    "d": "verstka.media",
    "name": "Вёрстка",
    "flag": "LV"
   },
   {
    "d": "mediazona.ca",
    "name": "Медиазона",
    "flag": "CA"
   },
   {
    "d": "ovd.news",
    "name": "ОВД-Инфо",
    "flag": "LV"
   }
  ]
 },
 {
  "id": "search",
  "en": "Search Engines",
  "ru": "Поисковики",
  "checker": null,
  "sites": [
   {
    "d": "google.com",
    "name": "Google",
    "flag": "US"
   },
   {
    "d": "yandex.ru",
    "name": "Яндекс",
    "flag": "RU"
   },
   {
    "d": "bing.com",
    "name": "Bing",
    "flag": "US"
   },
   {
    "d": "duckduckgo.com",
    "name": "DuckDuckGo",
    "flag": "US"
   },
   {
    "d": "yahoo.com",
    "name": "Yahoo",
    "flag": "US"
   },
   {
    "d": "baidu.com",
    "name": "Baidu",
    "flag": "CN"
   },
   {
    "d": "ecosia.org",
    "name": "Ecosia",
    "flag": "DE"
   }
  ]
 },
 {
  "id": "torrents",
  "en": "Torrents",
  "ru": "Торренты",
  "checker": null,
  "sites": [
   {
    "d": "thepiratebay.org",
    "name": "The Pirate Bay",
    "flag": ""
   },
   {
    "d": "rutracker.org",
    "name": "RuTracker",
    "flag": "RU"
   },
   {
    "d": "1337x.to",
    "name": "1337x",
    "flag": ""
   },
   {
    "d": "rutor.info",
    "name": "Rutor",
    "flag": "RU"
   },
   {
    "d": "nnmclub.to",
    "name": "NNM-Club",
    "flag": "RU"
   },
   {
    "d": "flibusta.is",
    "name": "Flibusta",
    "flag": "RU"
   },
   {
    "d": "nyaa.si",
    "name": "Nyaa",
    "flag": "JP"
   },
   {
    "d": "kinozal.tv",
    "name": "Кинозал",
    "flag": "RU"
   }
  ]
 },
 {
  "id": "messengers",
  "en": "Messengers (service endpoints)",
  "ru": "Мессенджеры (сервисные эндпоинты)",
  "checker": null,
  "sites": [
   {
    "d": "chat.signal.org",
    "name": "Signal API",
    "flag": "US"
   },
   {
    "d": "storage.signal.org",
    "name": "Signal Storage",
    "flag": "US"
   },
   {
    "d": "cdn.signal.org",
    "name": "Signal CDN",
    "flag": "US"
   },
   {
    "d": "web.whatsapp.com",
    "name": "WhatsApp Web",
    "flag": "US"
   },
   {
    "d": "pps.whatsapp.net",
    "name": "WhatsApp Media",
    "flag": "US"
   },
   {
    "d": "core.telegram.org",
    "name": "Telegram API",
    "flag": "GB"
   },
   {
    "d": "web.telegram.org",
    "name": "Telegram Web",
    "flag": "GB"
   },
   {
    "d": "viber.com",
    "name": "Viber",
    "flag": "JP"
   },
   {
    "d": "dl.viber.com",
    "name": "Viber CDN",
    "flag": "JP"
   },
   {
    "d": "web.wechat.com",
    "name": "WeChat Web",
    "flag": "CN"
   },
   {
    "d": "wx.qq.com",
    "name": "WeChat API",
    "flag": "CN"
   },
   {
    "d": "talk.kakao.com",
    "name": "KakaoTalk",
    "flag": "🇰🇷"
   },
   {
    "d": "bip.com",
    "name": "BiP",
    "flag": "🇹🇷"
   },
   {
    "d": "line.me",
    "name": "LINE",
    "flag": "JP"
   },
   {
    "d": "discord.com",
    "name": "Discord",
    "flag": "US"
   },
   {
    "d": "gateway.discord.gg",
    "name": "Discord Gateway",
    "flag": "US"
   }
  ]
 },
 {
  "id": "privacy",
  "en": "Privacy / VPN",
  "ru": "Приватность / VPN",
  "checker": null,
  "sites": [
   {
    "d": "torproject.org",
    "name": "Tor Project",
    "flag": ""
   },
   {
    "d": "proton.me",
    "name": "Proton",
    "flag": "CH"
   },
   {
    "d": "mullvad.net",
    "name": "Mullvad",
    "flag": "SE"
   },
   {
    "d": "nordvpn.com",
    "name": "NordVPN",
    "flag": "LT"
   },
   {
    "d": "wireguard.com",
    "name": "WireGuard",
    "flag": ""
   }
  ]
 },
 {
  "id": "hosting",
  "en": "Hosting / Registrars",
  "ru": "Хостинг / Регистраторы",
  "checker": null,
  "sites": [
   {
    "d": "aws.amazon.com",
    "name": "AWS",
    "flag": "US"
   },
   {
    "d": "cloud.google.com",
    "name": "Google Cloud",
    "flag": "US"
   },
   {
    "d": "azure.microsoft.com",
    "name": "Azure",
    "flag": "US"
   },
   {
    "d": "vultr.com",
    "name": "Vultr",
    "flag": "US"
   },
   {
    "d": "hetzner.com",
    "name": "Hetzner",
    "flag": "DE"
   },
   {
    "d": "ovh.com",
    "name": "OVH",
    "flag": "FR"
   },
   {
    "d": "digitalocean.com",
    "name": "DigitalOcean",
    "flag": "US"
   },
   {
    "d": "linode.com",
    "name": "Linode",
    "flag": "US"
   },
   {
    "d": "namecheap.com",
    "name": "Namecheap",
    "flag": "US"
   },
   {
    "d": "cloudflare.com",
    "name": "Cloudflare",
    "flag": "US"
   },
   {
    "d": "godaddy.com",
    "name": "GoDaddy",
    "flag": "US"
   },
   {
    "d": "www.reg.ru",
    "name": "REG.RU",
    "flag": "RU"
   },
   {
    "d": "selectel.ru",
    "name": "Selectel",
    "flag": "RU"
   },
   {
    "d": "timeweb.com",
    "name": "Timeweb",
    "flag": "RU"
   }
  ]
 },
 {
  "id": "tech",
  "en": "Tech / Forums",
  "ru": "Технологии / Форумы",
  "checker": null,
  "sites": [
   {
    "d": "ntc.party",
    "name": "ntc.party",
    "flag": "DE"
   },
   {
    "d": "openwrt.org",
    "name": "OpenWrt",
    "flag": "DE"
   },
   {
    "d": "news.ycombinator.com",
    "name": "Hacker News",
    "flag": "US"
   },
   {
    "d": "habr.com",
    "name": "Хабр",
    "flag": "RU"
   },
   {
    "d": "stackoverflow.com",
    "name": "Stack Overflow",
    "flag": "US"
   },
   {
    "d": "github.com",
    "name": "GitHub",
    "flag": "US"
   },
   {
    "d": "gitlab.com",
    "name": "GitLab",
    "flag": "US"
   },
   {
    "d": "dev.to",
    "name": "DEV",
    "flag": "US"
   },
   {
    "d": "medium.com",
    "name": "Medium",
    "flag": "US"
   },
   {
    "d": "arxiv.org",
    "name": "arXiv",
    "flag": "US"
   },
   {
    "d": "opennet.ru",
    "name": "OpenNET",
    "flag": "RU"
   },
   {
    "d": "3dnews.ru",
    "name": "3DNews",
    "flag": "RU"
   }
  ]
 },
 {
  "id": "news_by",
  "en": "Media (Belarus)",
  "ru": "СМИ (Беларусь)",
  "checker": null,
  "sites": [
   {
    "d": "onliner.by",
    "name": "Onliner",
    "flag": "BY"
   },
   {
    "d": "zerkalo.io",
    "name": "Зеркало",
    "flag": "BY"
   },
   {
    "d": "spring96.org",
    "name": "Вясна",
    "flag": "BY"
   },
   {
    "d": "belta.by",
    "name": "БелТА",
    "flag": "BY"
   },
   {
    "d": "sb.by",
    "name": "СБ Беларусь",
    "flag": "BY"
   },
   {
    "d": "naviny.by",
    "name": "Naviny",
    "flag": "BY"
   },
   {
    "d": "belsat.eu",
    "name": "Белсат",
    "flag": "BY"
   },
   {
    "d": "nashaniva.by",
    "name": "Наша Ніва",
    "flag": "BY"
   },
   {
    "d": "kp.by",
    "name": "КП Беларусь",
    "flag": "BY"
   },
   {
    "d": "reform.news",
    "name": "Reform.news",
    "flag": "BY"
   }
  ]
 },
 {
  "id": "software",
  "en": "Software / Dev Tools",
  "ru": "Программное обеспечение / Инструменты",
  "checker": null,
  "sites": [
   {
    "d": "archive.ubuntu.com",
    "name": "Ubuntu",
    "flag": "GB"
   },
   {
    "d": "dl.fedoraproject.org",
    "name": "Fedora",
    "flag": "US"
   },
   {
    "d": "deb.debian.org",
    "name": "Debian",
    "flag": "US"
   },
   {
    "d": "archlinux.org",
    "name": "Arch Linux",
    "flag": "US"
   },
   {
    "d": "download.opensuse.org",
    "name": "openSUSE",
    "flag": "DE"
   },
   {
    "d": "catalog.update.microsoft.com",
    "name": "MS Update Catalog",
    "flag": "US"
   },
   {
    "d": "download.microsoft.com",
    "name": "MS Downloads",
    "flag": "US"
   },
   {
    "d": "huggingface.co",
    "name": "HuggingFace",
    "flag": "US"
   },
   {
    "d": "kaggle.com",
    "name": "Kaggle",
    "flag": "US"
   },
   {
    "d": "pypi.org",
    "name": "PyPI",
    "flag": "US"
   },
   {
    "d": "npmjs.com",
    "name": "npm",
    "flag": "US"
   },
   {
    "d": "hub.docker.com",
    "name": "Docker Hub",
    "flag": "US"
   },
   {
    "d": "repo.anaconda.com",
    "name": "Anaconda",
    "flag": "US"
   },
   {
    "d": "crates.io",
    "name": "crates.io",
    "flag": "US"
   },
   {
    "d": "registry.terraform.io",
    "name": "Terraform",
    "flag": "US"
   }
  ]
 },
 {
  "id": "banks",
  "en": "Banks",
  "ru": "Банки",
  "checker": null,
  "sites": [
   {
    "d": "www.tbank.ru",
    "name": "Т-Банк",
    "flag": "RU"
   },
   {
    "d": "sberbank.ru",
    "name": "Сбербанк",
    "flag": "RU"
   },
   {
    "d": "alfabank.ru",
    "name": "Альфа-Банк",
    "flag": "RU"
   },
   {
    "d": "raiffeisen.ru",
    "name": "Райффайзен",
    "flag": "RU"
   },
   {
    "d": "chase.com",
    "name": "Chase",
    "flag": "US"
   },
   {
    "d": "bankofamerica.com",
    "name": "Bank of America",
    "flag": "US"
   },
   {
    "d": "wellsfargo.com",
    "name": "Wells Fargo",
    "flag": "US"
   },
   {
    "d": "www.hsbc.com",
    "name": "HSBC",
    "flag": "GB"
   },
   {
    "d": "barclays.co.uk",
    "name": "Barclays",
    "flag": "GB"
   },
   {
    "d": "lloydsbank.com",
    "name": "Lloyds",
    "flag": "GB"
   },
   {
    "d": "natwest.com",
    "name": "NatWest",
    "flag": "GB"
   },
   {
    "d": "intesasanpaolo.com",
    "name": "Intesa Sanpaolo",
    "flag": "IT"
   },
   {
    "d": "unicredit.it",
    "name": "UniCredit",
    "flag": "IT"
   },
   {
    "d": "www.unicreditbank.ru",
    "name": "UniCredit Russia",
    "flag": "RU"
   },
   {
    "d": "santander.com",
    "name": "Santander",
    "flag": "ES"
   },
   {
    "d": "bbva.com",
    "name": "BBVA",
    "flag": "ES"
   },
   {
    "d": "bk.mufg.jp",
    "name": "MUFG",
    "flag": "JP"
   },
   {
    "d": "www.mizuhobank.co.jp",
    "name": "Mizuho",
    "flag": "JP"
   },
   {
    "d": "www.smbc.co.jp",
    "name": "SMBC",
    "flag": "JP"
   }
  ]
 }
];
