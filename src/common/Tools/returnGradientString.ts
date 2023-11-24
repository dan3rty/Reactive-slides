import { GradientColor } from '../../types'

function returnGradientString(colors: GradientColor) {
	let string = colors.colors[0].hex
	for (let i = 1; i < colors.colors.length; i++) {
		string = string + ', ' + colors.colors[i].hex
	}
	return 'linear-gradient(' + string + ')'
}

export { returnGradientString }
