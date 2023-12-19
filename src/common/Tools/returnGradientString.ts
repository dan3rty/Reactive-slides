import { GradientColor } from '../../types'

function returnGradientString(colors: GradientColor) {
	let string = colors.colors[0].hsl
	if (colors.colors.length == 1) {
		return string
	}
	for (let i = 1; i < colors.colors.length; i++) {
		string = string + ', ' + colors.colors[i].hsl + ' ' + colors.colors[i].percent
	}
	return 'linear-gradient(' + colors.rotation + 'deg, ' + string + ')'
}

export { returnGradientString }
