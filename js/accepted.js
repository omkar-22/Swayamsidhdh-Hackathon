import { firestore } from './firebase'

async function loadPage() {
	let result = document.getElementById('result')
	const template = Handlebars.compile(document.querySelector('#page').innerHTML)
	const snapshot = await firestore
		.collection('teams')
		.get()
		.then(function (querySnapshot) {
			querySnapshot.forEach(async function (doc) {
				const snapshot = await firestore
					.collection('teams/' + doc.id + '/submissions')
					.where('status', '==', true)
					.get()
				snapshot.forEach((doc) => {
					const { teamName, problem, solution, url } = doc.data()
					const content = template({
						teamName,
						problem,
						solution,
						url,
					})
					result.innerHTML += content
				})
			})
		})
		.catch(function (error) {
			console.log('Error getting documents: ', error)
		})
}

loadPage()
