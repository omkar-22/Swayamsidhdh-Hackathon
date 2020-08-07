import { firestore } from './firebase'

async function loadPage(sector) {
	let result = document.getElementById('result')
	const template = Handlebars.compile(document.querySelector('#page').innerHTML)
	const snapshot = await firestore
		.collection('teams')
		.get()
		.then(function (querySnapshot) {
			querySnapshot.forEach(async function (doc) {
				const snapshot = await firestore
					.collection('teams/' + doc.id + '/submissions')
					.where('status', '==', null)
					.where('projectTheme', '==', sector)
					.get()
				snapshot.forEach((doc) => {
					const {
						teamName,
						problem,
						solution,
						url,
						projectTheme,
						uid,
					} = doc.data()
					console.log(projectTheme)
					const content = template({
						teamName,
						problem,
						solution,
						url,
						projectTheme: projectTheme.replace(/ /g, '_'),
						uid,
					})
					result.innerHTML += content
				})
				document.querySelectorAll('.accept').forEach((button) => {
					button.onclick = async () => {
						await accept(
							button.dataset.uid,
							button.dataset.theme.replace(/_/g, ' ')
						)
						button.parentElement.parentElement.remove()
					}
				})

				document.querySelectorAll('.reject').forEach((button) => {
					button.onclick = async () => {
						await reject(
							button.dataset.uid,
							button.dataset.theme.replace('_', ' ')
						)
						button.parentElement.parentElement.remove()
					}
				})
			})
		})
		.catch(function (error) {
			console.log('Error getting documents: ', error)
		})
}

async function accept(uid, projectTheme) {
	const teamRef = firestore
		.collection(`teams/${uid}/submissions`)
		.doc(projectTheme)
	const res = await teamRef.set(
		{
			status: true,
		},
		{ merge: true }
	)
	const doc = await teamRef.get()
	if (!doc.exists) {
		console.log('No such document!')
	} else {
		const res = await firestore
			.collection(`${doc.data().projectTheme}_accepted`)
			.add(doc.data())
	}
}

async function reject(uid, projectTheme) {
	const teamRef = firestore
		.collection(`teams/${uid}/submissions`)
		.doc(projectTheme)

	const res = await teamRef.set(
		{
			status: false,
		},
		{ merge: true }
	)
	const doc = await teamRef.get()
	if (!doc.exists) {
		console.log('No such document!')
	} else {
		const res = await firestore
			.collection(`${doc.data().projectTheme}_rejected`)
			.add(doc.data())
	}
}

loadPage(localStorage.getItem('sector'))
