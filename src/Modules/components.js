import React, { useState } from 'react';
import functions from "./functionModules";
import dictionaries from "./API's";

// Component for search bar + the definitions found
function SearchDefinition() {
    // States used to store dictionary definitions
    const [dictionaryDefinitions, setDictionaryDefinitions] = useState([]);

    // Handles the submission from the search
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Gets the word searched for in the search bar
        const wordToSearch = e.target.querySelector('input[id="search-bar"]').value;

        // Fetches definitions from the various API's
        const defaultDictionaryDefinitions = await dictionaries.getWordDefaultDictionary(wordToSearch)
        const urbanDictionaryDefinitions = await dictionaries.getUrbanDictionaryDefinitions(wordToSearch)
        const AlternativeDictionary = await dictionaries.getAlternativeDictionary(wordToSearch)

        // Updates the found definitions, stored as a dictionary with the dictionary they were fetched from as the key
        setDictionaryDefinitions([
            { 'dictionaryName': 'Default Dictionary', 'dictionary': defaultDictionaryDefinitions },
            { 'dictionaryName': 'Urban Dictionary', 'dictionary': urbanDictionaryDefinitions },
            { 'dictionaryName': 'Alternative Dictionary', 'dictionary': AlternativeDictionary}
        ]);
    }

    // Based on the found definitions, sets up all the required elements to show them to the user
    function ShowDefinitions() {
        // Sets up the state for managing the open/collapse function
        const [openStates, setOpenStates] = useState(dictionaryDefinitions.map(() => false));

        // Function for the open/collapse function of the dictionary containers
        const toggleDictionary = (index) => {
            const newOpenStates = [...openStates];
            newOpenStates[index] = !newOpenStates[index];
            setOpenStates(newOpenStates);
        };

        // Sets up the dictionary divs and populates when with the definitions from each dictionary
        const dictionaryDivs = dictionaryDefinitions.map((dictionary, index) => {
            try {
                const definitionHeaders = [];

                // For each dictionary, set up elements to contain the definitions and store them
                for (const [meaning, definitions] of Object.entries(dictionary.dictionary)) {
                    definitions.forEach(definition => {
                        definitionHeaders.push(
                            <h3 className={"definition-header"} key={definition.definition}>{definition.definition}</h3>
                        );
                    });
                }

                // Renders each dictionary and its definitions
                return (
                    <div className={"dictionary-div"} key={dictionary.dictionaryName}>
                        <button
                            type={"button"}
                            className={"collapse-button"}
                            onClick={() => toggleDictionary(index)}
                        >
                            {dictionary.dictionaryName}
                        </button>
                        <div className={"dictionary-div-content"}>
                            {openStates[ index ] && definitionHeaders}
                        </div>
                    </div>
                );
            } catch(error) {
                console.log(error);
            }
        });

        // Checks if all the dictionaries are empty, and informs the user if this is the case
        if (dictionaryDivs.every(div => {
            return div === undefined
        })) {
            return (
                <div>
                    <h2>No definitions found 😔</h2>
                </div>
            )
        }

        return dictionaryDivs;
    }

    // The main component to return
    return (
        <div id={"definition-container"}>
            <form onSubmit={handleSubmit} action="#">
                <input
                    id="search-bar"
                    className="search-input"
                    placeholder="Search"
                />
                <input type="submit" value={"Search"} className={"submit-button"}/>
            </form>
            <div id={"definition-div"}>
                <ShowDefinitions />
            </div>
        </div>
    );
}


const components = {SearchDefinition}
export default components;