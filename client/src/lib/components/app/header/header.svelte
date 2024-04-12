<script lang="ts">
	import * as Sheet from "$lib/components/ui/sheet";
	import * as Avatar from "$lib/components/ui/avatar";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { LogOut, Rocket } from "lucide-svelte";

	const logout = () => {
		localStorage.removeItem("user");
		window.location.href = "/login";
	};
</script>

<header
	class="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-full"
>
	<div class="container flex h-14 max-w-screen-2xl items-center">
		<div class="mr-4 hidden md:flex">
			<a href="/" class="mr-6 flex items-center space-x-2">
				<Rocket /><span class="hidden font-bold sm:inline-block">tinyPDV</span
				></a
			>
			<nav class="flex items-center gap-6 text-sm">
				<!-- <a href="/login" class="transition-colors hover:text-foreground/80 text-foreground/60">Login</a>
                <a href="/docs/components" class="transition-colors hover:text-foreground/80 text-foreground/60">Components</a>
                <a href="/themes" class="transition-colors hover:text-foreground/80 text-foreground/60">Themes</a>
                <a href="/examples" class="transition-colors hover:text-foreground/80 text-foreground/60">Examples</a> -->
			</nav>
		</div>

		<Sheet.Root>
			<Sheet.Trigger>
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-md font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
				>
					<svg
						stroke-width="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						><path
							d="M3 5H11"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path><path
							d="M3 12H16"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path><path
							d="M3 19H21"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path></svg
					>
					<span class="sr-only">Toggle Menu</span>
				</button>
			</Sheet.Trigger>
			<Sheet.Content side="left">
				<Sheet.Header>
					<nav class="flex flex-col items-start ml-10 my-4 text-lg">
						<a
							href="/docs"
							class="transition-colors hover:text-foreground/80 text-foreground/60"
							>Docs</a
						>
						<a
							href="/docs/components"
							class="transition-colors hover:text-foreground/80 text-foreground/60"
							>Components</a
						>
						<a
							href="/themes"
							class="transition-colors hover:text-foreground/80 text-foreground/60"
							>Themes</a
						>
						<a
							href="/examples"
							class="transition-colors hover:text-foreground/80 text-foreground/60"
							>Examples</a
						>
					</nav>
				</Sheet.Header>
			</Sheet.Content>
		</Sheet.Root>

		<div class="flex flex-1 items-center space-x-2 justify-end">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="ghost"
						class="hover:bg-transparent"
					>
						<Avatar.Root>
							<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
							<Avatar.Fallback>CN</Avatar.Fallback>
						</Avatar.Root>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-56">
					<DropdownMenu.Label>Minha conta</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						<Button on:click={logout} variant="ghost">
							<LogOut class="ml-2" /> Log out
						</Button>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
</header>
