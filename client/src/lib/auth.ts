import { goto } from "$app/navigation";

const auth = {
	user: function () {
		const ls = localStorage.getItem("user");
		if (ls != null) {
			return JSON.parse(ls);
		} else {
			return false;
		}
	},
	clear: function () {
		localStorage.removeItem("user");
		goto("/login");
	},
};

export default auth;
