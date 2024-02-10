const getWordDefaultDictionary = async (word) => {

    const baseUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
    const urlToFetch = `${baseUrl}${word}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const formattedDefinitions = {}

            const jsonResponse = await response.json();
            const wordInfo = jsonResponse[ 0 ];
            // console.log(wordInfo)

            const wordMeanings = wordInfo.meanings
            wordMeanings.forEach(meaning => {
                formattedDefinitions[meaning.partOfSpeech] = meaning.definitions;
            })

            console.log(formattedDefinitions)
            return formattedDefinitions;
        }
    } catch (error) {
        return {
            dictionary: undefined
        }
    }
};



// Define an async function to make the request and return a dictionary
async function getUrbanDictionaryDefinitions(word) {
    const url = `https://urban-dictionary7.p.rapidapi.com/v0/define?term=${word}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'urban-dictionary7.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const wordInfo = await response.json()

        // Get definitions from response
        const definitions = wordInfo.list;

        console.log(definitions)

        // If there is no definitions return undefined
        if (definitions.length === 0) {
            const urbandict = {
                dictionary: undefined
            }
            return urbandict
        }

        // Prepare the dictionary object
        const urbandict = {
            definitions: definitions.map(definition => {
                return {
                    definition: definition.definition
                };
            })
        };

        return urbandict;
    } catch (error) {
        // Log any errors that occur
        console.error('Error fetching data from Urban Dictionary:', error);
        return {
            dictionary: undefined
        }
    }
}

const getAlternativeDictionary = async (word) => {
    const urlToFetch = `https://dictionary-data-api.p.rapidapi.com/definition/${word}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6e50a9b4ebmsh947bc781503473cp1a6290jsnbeb98c5847ad',
            'X-RapidAPI-Host': 'dictionary-data-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(urlToFetch, options);
        if (response.ok) {
            const jsonResponse = await response.json();
            const formattedDefinitions = {};

            jsonResponse.meaning.forEach(meaning => {
                const definitions = meaning.values.map(definition => ({definition: definition}));

                formattedDefinitions[meaning.tag] = definitions;
            });

            console.log(jsonResponse)
            return formattedDefinitions;
        }
    } catch(error) {
        console.log(error);
    }
};


const dictionaries = { getWordDefaultDictionary, getUrbanDictionaryDefinitions, getAlternativeDictionary }

export default dictionaries