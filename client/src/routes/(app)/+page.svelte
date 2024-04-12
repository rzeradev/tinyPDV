<script lang="ts">
	import auth from "$lib/auth";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { userStore } from "$lib/store/user";
	import { onMount } from "svelte";
	import { apiService } from "$lib/services/ApiService";
	let user: any = null;
	onMount(async () => {
		try {
			const response = await apiService.get("api/user");
			user = response.data;
		} catch (error: any) {
			console.log(error);
		}
	});
</script>

<!-- Hero title -->
<div class="container mx-auto my-4">
	<h1 class="text-4xl font-bold">
		Welcome back <span class="text-purple-800">{$userStore?.name}</span>
	</h1>
	<p class="text-lg">This is a page</p>
</div>

<div></div>

<!-- tailwind grid 12 column responsive -->
<div class="container mx-auto grid grid-cols-3 gap-4">
	<div class="col-span-12 md:col-span-4">
		<Card.Root>
			<Card.Header>
				<Card.Title>Card Title</Card.Title>
				<Card.Description>Card Description</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>
					Card Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
					impedit omnis odit, alias qui delectus rem repellendus natus amet
					praesentium laborum corrupti earum blanditiis velit nesciunt odio,
					error unde asperiores?
				</p>
			</Card.Content>
			<Card.Footer>
				<p>Card Footer</p>
			</Card.Footer>
		</Card.Root>
	</div>
	<div class="col-span-12 md:col-span-1">
		<Card.Root>
			<Card.Header>
				<Card.Title>Card Title</Card.Title>
				<Card.Description>Card Description</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>Card Content</p>
			</Card.Content>
			<Card.Footer>
				<p>Card Footer</p>
			</Card.Footer>
		</Card.Root>
	</div>
	<div class="col-span-12 md:col-span-1">
		<Card.Root>
			<Card.Header>
				<Card.Title>Card Title</Card.Title>
				<Card.Description>Card Description</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>Card Content</p>
			</Card.Content>
			<Card.Footer>
				<p>Card Footer</p>
			</Card.Footer>
		</Card.Root>
	</div>
	<div class="col-span-12 md:col-span-1 row-start-2 row-end-3">
		<Card.Root>
			<Card.Header>
				<Card.Title>Card Title</Card.Title>
				<Card.Description>Card Description</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>Card Content</p>
			</Card.Content>
			<Card.Footer>
				<p>Card Footer</p>
			</Card.Footer>
		</Card.Root>
	</div>
	<div class="col-span-12 md:col-span-1">
		<Card.Root class="border-zinc-500">
			<Card.Header>
				<Card.Title>Card Title</Card.Title>
				<Card.Description>Card Description</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>Card Content</p>
			</Card.Content>
			<Card.Footer>
				<p>Card Footer</p>
			</Card.Footer>
		</Card.Root>
	</div>
	<div class="col-span-12 md:col-span-1">
		<Card.Root>
			<Card.Header>
				<Card.Title>Card Title</Card.Title>
				<Card.Description>Card Description</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>Card Content</p>
			</Card.Content>
			<Card.Footer>
				<p>Card Footer</p>
			</Card.Footer>
		</Card.Root>
	</div>
	<div class="col-span-12 md:col-span-1">
		<Card.Root>
			<Card.Header>
				<Card.Title>Card Title</Card.Title>
				<Card.Description>Card Description</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>Card Content</p>
			</Card.Content>
			<Card.Footer>
				<Button class="w-full pt-2 my-2 mx-4">Click Here</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
