function joinCssClasses(...classes: Array<string | false | null | undefined>): string {
	return classes.filter((v) => !!v).join(' ')
}

export { joinCssClasses }
