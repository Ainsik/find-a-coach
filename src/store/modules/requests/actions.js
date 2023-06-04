export default {
	async contactCoach(context, payload) {
		const newRequest = {
			userEmail: payload.email,
			message: payload.message,
		};
		const response = await fetch(
			`https://find-a-coach-b69d3-default-rtdb.europe-west1.firebasedatabase.app/coaches/${payload.coachId}.json`,
			{
				method: "POST",
				body: JSON.stringify(newRequest),
			}
		);
		const responseData = await response.json();

		if (!response.ok) {
			const error = new Error(
				responseData.message || "Failed to send request!"
			);
			throw error;
		}

		newRequest.id = responseData.name;
		newRequest.coachId = payload.coachId;
		context.commit("addRequest", newRequest);
	},
	async fetchRequests(context) {
		const coachId = context.rootGetters.userId;
		const response = await fetch(
			`https://find-a-coach-b69d3-default-rtdb.europe-west1.firebasedatabase.app/coaches/${coachId}.json`
		);
		const responseData = await response.json();
		const requests = [];

		if (!response.ok) {
			const error = new Error(
				responseData.message || "Failed to fetch request!"
			);
			throw error;
		}

		for (const key in responseData) {
			const request = {
				id: key,
				coachId: coachId,
				userEmail: responseData[key].userEmail,
				message: responseData[key].message,
			};
			requests.push(request);
		}

		context.commit("setRequests", requests);
	},
};
