function searchWord(word) {

}

function updateText(textId, newText) {
    try {
        const textObject = document.getElementById(textId);
        textObject.innerText = newText;
    } catch (error) {
        console.log(error)
    }
}

const functions = { updateText }

export default functions;