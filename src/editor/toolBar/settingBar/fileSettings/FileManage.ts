import {Presentation} from '../../../../types'

function savePresentationToFile(presentation: Presentation) {
	const saveObj = { presentation }

	const content = JSON.stringify(saveObj);
	const name = `${presentation.title}.json`;
	const type = "text/plain";

	const a = document.createElement("a");
	const file = new Blob([text], { type: type });
	a.href = URL.createObjectURL(file);
	a.download = name;
	document.body.appendChild(a);
	a.click();
	a.remove();
}

function loadPresentationFromFile(): Presentation {

}

export {savePresentationToFile}