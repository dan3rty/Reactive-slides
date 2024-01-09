import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './redux/store'

console.error = (function (_error) {
	return function (...message) {
		if (
			typeof message[0] !== 'string' ||
			(message[0].indexOf('component is `contentEditable`') === -1 &&
				message[0].indexOf('static flag') === -1)
		) {
			_error.apply(console, message)
		}
	}
})(console.error)

console.warn = function (_warn) {
	return function (...message) {
		if (typeof message[0] !== 'string' || message[0].indexOf('StyledComponents') === -1) {
			_warn.apply(console, message)
		}
	}
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
)
