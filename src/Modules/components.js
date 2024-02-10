import React, { useState } from 'react';
import functions from "./functionModules";
import dictionaries from "./API's";

function SearchDefinition() {
    const [dictionaryDefinitions, setDictionaryDefinitions] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const wordToSearch = e.target.querySelector('input[id="search-bar"]').value;
        const defaultDictionaryDefinitions = await dictionaries.getWordDefaultDictionary(wordToSearch)
        const urbanDictionaryDefinitions = await dictionaries.getUrbanDictionaryDefinitions(wordToSearch)
        const AlternativeDictionary = await dictionaries.getAlternativeDictionary(wordToSearch)
        setDictionaryDefinitions([
            { 'dictionaryName': 'Default Dictionary', 'dictionary': defaultDictionaryDefinitions },
            { 'dictionaryName': 'Urban Dictionary', 'dictionary': urbanDictionaryDefinitions },
            { 'dictionaryName': 'Alternative Dictionary', 'dictionary': AlternativeDictionary}
        ]);
    }

    function ShowDefinitions() {
        const [openStates, setOpenStates] = useState(dictionaryDefinitions.map(() => false));

        const toggleDictionary = (index) => {
            const newOpenStates = [...openStates];
            newOpenStates[index] = !newOpenStates[index];
            setOpenStates(newOpenStates);
        };

        const dictionaryDivs = dictionaryDefinitions.map((dictionary, index) => {
            try {
                const definitionHeaders = [];
                for (const [meaning, definitions] of Object.entries(dictionary.dictionary)) {
                    definitions.forEach(definition => {
                        definitionHeaders.push(
                            <h3 className={"definition-header"} key={definition.definition}>{definition.definition}</h3>
                        );
                    });
                }

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