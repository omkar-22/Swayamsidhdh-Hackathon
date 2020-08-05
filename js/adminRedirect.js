import { firebase, auth } from './firebase'

document.addEventListener('DOMContentLoaded', redirect)
function redirect() {
	auth.onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			if (user.uid === 'VPo6CoD9vJOldgkJNRWx9xLZR1l1') {
				document.querySelector('body').removeAttribute('hidden', '')
			} else {
				window.location.replace(`${location.origin}/home.html`)
			}
		} else {
			window.location.replace(`${location.origin}/login.html`)
		}
	})
}
