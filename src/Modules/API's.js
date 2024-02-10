const getWordDefaultDictionary = async (word) => {

    // Constructing URL to fetch from
    const baseUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
    const urlToFetch = `${baseUrl}${word}`;

    try {
        // Fetching data from the API
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const formattedDefinitions = {}

            // Parsing JSON response and stores the meanings
            const jsonResponse = await response.json();
            const wordMeanings = jsonResponse[ 0 ].meanings;

            // Organizes definitions in the needed format
            wordMeanings.forEach(meaning => {
                formattedDefinitions[meaning.partOfSpeech] = meaning.definitions;
            })

            return formattedDefinitions;
        }
    } catch (error) {
        console.error('Error fetching data from Default Dictionary (most likely no definitions found)', error);
        return {
            dictionary: undefined
        }
    }
};



// Define an async function to make the request and return a dictionary
async function getUrbanDictionaryDefinitions(word) {

    // URL and request options
    const url = `https://urban-dictionary7.p.rapidapi.com/v0/define?term=${word}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'urban-dictionary7.p.rapidapi.com'
        }
    };

    try {
        // Fetching data and parses the JSON response
        const response = await fetch(url, options);
        if (response.ok) {
            const wordInfo = await response.json()

            // Get definitions from response
            const definitions = wordInfo.list;

            // If there is no definitions return undefined
            if (definitions.length === 0) {
                const urbandict = {
                    dictionary: undefined
                }
                return urbandict
            }

            // Prepare the dictionary object with formatted definitions
            const urbandict = {
                definitions: definitions.map(definition => {
                    return {
                        definition: definition.definition
                    };
                })
            };

            return urbandict;
        }
    } catch (error) {
        // Log any errors that occur
        console.error('Error fetching data from Urban Dictionary:', error);
        return {
            dictionary: undefined
        }
    }
}

const getAlternativeDictionary = async (word) => {
    // URL and request options
    const urlToFetch = `https://dictionary-data-api.p.rapidapi.com/definition/${word}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'dictionary-data-api.p.rapidapi.com'
        }
    };

    try {
        // Fetching data and parses the JSON response
        const response = await fetch(urlToFetch, options);
        if (response.ok) {
            const jsonResponse = await response.json();
            const formattedDefinitions = {};

            // Organizes definitions in the needed format
            jsonResponse.meaning.forEach(meaning => {
                const definitions = meaning.values.map(definition => ({definition: definition}));

                formattedDefinitions[meaning.tag] = definitions;
            });

            return formattedDefinitions;
        }
    } catch(error) {
        console.log(error);
    }
};


const dictionaries = { getWordDefaultDictionary, getUrbanDictionaryDefinitions, getAlternativeDictionary }

export default dictionaries