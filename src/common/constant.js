export const COLLECTION_NAME = {
    STRESS: 'stress',
    CONFIDENCE: 'confidence',
    FOCUS: 'focus',
    DEPRESSION: 'depression',
    SLEEP: 'sleep',
    ANXIETY: 'anxiety',
    MOTIVATION: 'motivation',
    COVID: 'covid19',
};

export const PAGES = {
    HOME: 'home',
    FEATURED: 'featured',
    ONBOARDING: 'onboarding',
    WEBVIEW: 'webview',
    YOUTUBE: 'youtube',
    COLLECTION: 'collection',
    NO_INTERNET: 'noInternet'
}

export const dataFromAPI = {
    recommended: [{
        title: "How to be better at stress",
        readDuration: 30,
        thumbnail: "http://i3.ytimg.com/vi/RcGyVTAoXEU/maxresdefault.jpg",
        author: "Tara Parker-Pope",
        publisher: "The New York Times",
        url: "https://medium.com/the-mission/how-to-reduce-stress-91f74e22c878"
    }, {
        title: "6 simple yoga stretches for daily workouts",
        readDuration: 30,
        thumbnail: "http://i3.ytimg.com/vi/RcGyVTAoXEU/maxresdefault.jpg",
        author: "Tara Parker-Pope",
        publisher: "The New York Times",
        url: "https://medium.com/the-mission/how-to-reduce-stress-91f74e22c878"
    }, {
        title: "How to be better at stress",
        readDuration: 30,
        thumbnail: "http://i3.ytimg.com/vi/RcGyVTAoXEU/maxresdefault.jpg",
        author: "Tara Parker-Pope",
        publisher: "The New York Times",
        url: "https://medium.com/the-mission/how-to-reduce-stress-91f74e22c878"
    }],
    featured: [
        {
            title: 'Constant Support',
            description: "This article covers the basics of Astrology and how they are inter-related. Astrology is defined as ‘the art or practice of determining the suppo* Mutable signs are related to adaptability.",
            collection: COLLECTION_NAME.STRESS,
        },
        {
            title: 'Reduce Stress',
            description: "This article covers the basics of Astrology and how they are inter-related. Astrology is defined as ‘the art or practice of determining the suppo* Mutable signs are related to adaptability, resourcefulness and holism.This article covers the basics of Astrology and how they are inter-related. Astrology is defined as ‘the art or practice of determining the suppo* Mutable signs are related to adaptability, resourcefulness and holism.This article covers the basics of Astrology and how they are inter-related. Astrology is defined as ‘the art or practice of determining the suppo* Mutable signs are related to adaptability, resourcefulness and holism.This article covers the basics of Astrology and how they are inter-related. Astrology is defined as ‘the art or practice of determining the suppo* Mutable signs are related to adaptability, resourcefulness and holism. ",
            collection: COLLECTION_NAME.SLEEP,
        },
        {
            title: 'Stay Energized',
            description: "This article covers the basics of Astrology and how they are inter-related. Astrology is defined as ‘the art or practice of determining the suppo* Mutable signs are related to adaptability, resourcefulness and holism.This article covers the basics of Astrology and how they are inter-related. Astrology is defined as ‘the art or practice of determining the suppo* Mutable signs are related to adaptability, resourcefulness and holism.This article covers the basics of Astrology and how they are inter-related. Astrology is defined as ‘the art or practice of determining the suppo* Mutable signs are related to adaptability, resourcefulness and holism.This article covers the basics of Astrology and how they are inter-related. Astrology is defined as ‘the art or practice of determining the suppo* Mutable signs are related to adaptability, resourcefulness and holism.",
            collection: COLLECTION_NAME.CONFIDENCE,
        }
    ],
    collections: {
        [COLLECTION_NAME.STRESS]: {
            "name": "Stress",
            "icon": "",
            "description": "More smiling, less worrying",
            "pageIllustration": "",
            "key": COLLECTION_NAME.STRESS
        },
        [COLLECTION_NAME.CONFIDENCE]: {
            "name": "Confidence",
            "icon": "",
            "description": "Mis your reward for overcoming fear",
            "pageIllustration": "",
            "key": COLLECTION_NAME.CONFIDENCE,
        },
        [COLLECTION_NAME.FOCUS]: {
            "name": "Focus",
            "icon": "",
            "description": "Where focus goes, energy flows",
            "pageIllustration": "",
            "key": COLLECTION_NAME.FOCUS
        },
        [COLLECTION_NAME.DEPRESSION]: {
            "name": "Depression",
            "icon": "",
            "description": "is not a sign of weakness",
            "pageIllustration": "",
            "key": COLLECTION_NAME.DEPRESSION
        },
        [COLLECTION_NAME.SLEEP]: {
            "name": "Sleep",
            "icon": "",
            "description": "Never go to bed mad",
            "pageIllustration": "",
            "key": COLLECTION_NAME.SLEEP
        },
        [COLLECTION_NAME.ANXIETY]: {
            "name": "Anxiety",
            "icon": "",
            "description": "Breathe. Be present",
            "pageIllustration": "",
            "key": COLLECTION_NAME.ANXIETY
        },
        [COLLECTION_NAME.MOTIVATION]: {
            "name": "Motivation",
            "icon": "",
            "description": "Tough times don’t last, tough people do",
            "pageIllustration": "",
            "key": COLLECTION_NAME.MOTIVATION
        },
        [COLLECTION_NAME.COVID]: {
            "name": "Covid 19",
            "icon": "",
            "description": "Change this description",
            "pageIllustration": "",
            "key": COLLECTION_NAME.COVID
        },
    }
}


