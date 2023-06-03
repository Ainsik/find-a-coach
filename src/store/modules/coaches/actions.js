export default {
	async registerCoach(context, payload) {
		const userId = context.rootGetters.userId;
		const coachData = {
			firstName: payload.first,
			lastName: payload.last,
			description: payload.desc,
			hourlyRate: payload.rate,
			areas: payload.areas,
		};

		const response = await fetch(
			`https://find-a-coach-b69d3-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`,
			{
				method: "PUT",
				body: JSON.stringify(coachData),
			}
		);

		if (!response.ok) {
			//error
		}

		context.commit("registerCoach", {
			...coachData,
			id: userId,
		});
	},
};
