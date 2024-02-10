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

            // console.log(formattedDefinitions)
            const wordDefinitions = wordMeanings[0].definitions

            // wordDefinitions.forEach(item => console.log(`${item.definition}\n`))
            // console.log(formattedDefinitions)
            return formattedDefinitions;
        }
    } catch (error) {
        const dictionary = {
            dictionary: undefined
        }
        return dictionary
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
        return null;
    }
}


const dictionaries = { getWordDefaultDictionary, getUrbanDictionaryDefinitions }

export default dictionaries