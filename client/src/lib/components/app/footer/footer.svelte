<script lang="ts">
	import { Heart, Hexagon } from "lucide-svelte";
</script>

<footer
	id="page-footer"
	class="flex flex-none items-center border-t dark:border-gray-700/50"
>
	<div
		class="container mx-auto flex flex-col px-4 py-0.5 text-center text-sm font-medium text-gray-500 md:flex-row md:justify-between md:text-left lg:px-8 xl:max-w-7xl"
	>
		<div class="pb-1 pt-4 md:pb-4">
			<span class="font-semibold">tinyPDV</span> 0.1 © 2024
		</div>
		<div class="inline-flex items-center justify-center pb-4 pt-1 md:pt-4">
			<span>Crafted with</span>
			<span class="flex items-center justify-center">
				<Heart class=" fill-red-700 stroke-red-800 w-4 mx-1" /> by
				<a
					class="flex items-center justify-center ml-1 text-accent-foreground hover:underline mx-2"
					href="http://beeblock.com.br"
					target="_blank"><Hexagon class="mr-1" />beeblock</a
				>
			</span>
		</div>
	</div>
</footer>
