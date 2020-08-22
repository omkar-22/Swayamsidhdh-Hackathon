import { firebase, auth } from './firebase'

const logout = document.querySelector('#logout')

auth.onAuthStateChanged(function (user) {
	if (user) {
		logout.removeAttribute('hidden', '')
	} else {
		logout.querySelector('body').setAttribute('hidden', true)
	}
})

logout.onclick = function () {
	auth
		.signOut()
		.then(function () {
			// Sign-out successful.
			window.location.replace(`${location.origin}/index.html`)
		})
		.catch(function (error) {
			alert(error.message)
		})
}
