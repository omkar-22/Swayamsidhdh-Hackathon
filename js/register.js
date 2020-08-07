import { firestore, auth } from './firebase'

const loader = document.querySelector('#loader')
const form = document.getElementById('register-form')
const error = document.getElementById('error-msg')
const thanks = document.getElementById('thanks')

export function createTeam(info) {
	auth
		.createUserWithEmailAndPassword(info.email, info.password)
		.then(({ user: { uid } }) => {
			return firestore.collection('teams').doc(uid).set(info)
		})
		.then(() => {
			form.reset()
			thanks.removeAttribute('hidden')
			loader.setAttribute('hidden', true)
			alert('done')
			window.location.replace(`${location.origin}/home.html`)
		})
		.catch((err) => {
			error.removeAttribute('hidden', '')
			loader.setAttribute('hidden', true)
			error.innerText = err.message
			console.log(err.message)
		})
}
form.onsubmit = submit
async function submit(event) {
	event.preventDefault()
	loader.removeAttribute('hidden', '')
	error.setAttribute('hidden', true)
	let teamName = document.querySelector("input[name='team-name']").value
	let teamLeaderName = document.querySelector("input[name='team-leader-name']")
		.value
	let mobileNo = document.querySelector("input[name='mobile-no']").value
	let state = document.querySelector("input[name='state']").value
	let city = document.querySelector("input[name='city']").value
	let pincode = document.querySelector("input[name='pincode']").value
	let email = document.querySelector("input[name='email']").value
	let password = document.querySelector("input[name='password']").value

	let info = {
		teamName: teamName,
		teamLeaderName: teamLeaderName,
		mobileNo: mobileNo,
		email: email,
		state,
		city,
		pincode,
		password: password,
	}
	await createTeam(info)
}
