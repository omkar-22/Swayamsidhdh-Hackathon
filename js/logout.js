import { firebase, auth } from './firebase'

const logout = document.querySelector('#logout')

function displayLogout() {
	auth.onAuthStateChanged(function (user) {
		if (user) {
			logout.removeAttribute('hidden', '')
		} else {
			logout.querySelector('body').setAttribute('hidden', true)
		}
	})
}

displayLogout()

logout.onclick = function () {
	auth
		.signOut()
		.then(function () {
			// Sign-out successful.
		})
		.catch(function (error) {
			alert(error.message)
		})
}
