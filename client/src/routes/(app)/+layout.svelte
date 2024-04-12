<script lang="ts">
	import "../../app.pcss";
	import { Toaster } from "$lib/components/ui/sonner";
	import { Header } from "$lib/components/app/header";
	import { Aside } from "$lib/components/app/aside";
	import Footer from "$lib/components/app/footer/footer.svelte";
	import auth from "$lib/auth";
	import { goto } from "$app/navigation";
	import { userStore } from "$lib/store/user";

	const user = auth.user();
	if (!user) {
		goto("login");
	}

	if (user) {
		userStore.setUser(user);
	}
</script>

<Toaster />

<div class="relative flex min-h-screen flex-col">
	<div class="grid grid-layout">
		<div class="header sticky top-0 z-50">
			<Header />
		</div>
		<div class="sidebar hidden md:block">
			<Aside />
		</div>
		<div class="content">
			<slot />
		</div>
		<div class="footer">
			<Footer />
		</div>
	</div>
</div>

<style>
	.grid-layout {
		grid-template-areas:
			"header"
			"content"
			"footer";
		grid-template-columns: 1fr;
		grid-template-rows: 60px auto 60px;
		min-height: 100vh;
	}
	.header {
		grid-area: header;
	}
	.sidebar {
		grid-area: sidebar;
	}
	.content {
		grid-area: content;
	}
	.footer {
		grid-area: footer;
	}

	@media (min-width: 768px) {
		.grid-layout {
			grid-template-areas:
				"header header"
				"sidebar content"
				"sidebar footer";
			grid-template-columns: 256px 1fr;
			grid-template-rows: 60px auto 60px;
			min-height: 100vh;
		}
	}
</style>
