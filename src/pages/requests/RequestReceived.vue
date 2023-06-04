<template>
	<base-dialog :show="!!error" title="An error occurred!" @close="handleError">
		<p>{{ error }}</p>
	</base-dialog>
	<section>
		<base-card
			><header>
				<h2>Requests Received</h2>
			</header>
			<base-spinner v-if="isLoading"></base-spinner>
			<ul v-else-if="hasRequests && !isLoading">
				<request-item
					v-for="req in recivedRequests"
					:key="req.id"
					:email="req.userEmail"
					:message="req.message"
				></request-item>
			</ul>
			<h3 v-else>You haven't received any requests yet!</h3>
		</base-card>
	</section>
</template>

<script>
import RequestItem from "@/components/requests/RequestItem.vue";

export default {
	data() {
		return {
			isLoading: false,
			error: null,
		};
	},
	components: { RequestItem },
	computed: {
		recivedRequests() {
			return this.$store.getters["requests/requests"];
		},
		hasRequests() {
			return this.$store.getters["requests/hasRequests"];
		},
	},
	methods: {
		async loadRequest() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("requests/fetchRequests");
			} catch (error) {
				this.error = error.message || "Something failed!";
			}
			this.isLoading = false;
		},
		handleError() {
			this.error = null;
		},
	},
	created() {
		this.loadRequests();
	},
};
</script>

<style scoped>
header {
	text-align: center;
}

ul {
	list-style: none;
	margin: 2rem auto;
	padding: 0;
	max-width: 30rem;
}

h3 {
	text-align: center;
}
</style>
