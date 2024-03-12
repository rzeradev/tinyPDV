<script lang="ts">
	import {
		Building2,
		FileBarChart,
		Home,
		PackagePlus,
		ShoppingCart
	} from "lucide-svelte";
</script>

<!-- Page Sidebar -->
<!--
	Sidebar on Mobile
    Closed '-translate-x-full'
    Opened 'translate-x-0'

	Sidebar on Desktop
    Closed 'lg:-translate-x-full'
    Opened 'lg:translate-x-0'
-->
<nav
	class="z-50 flex h-full w-full -translate-x-full flex-col border-r border-gray-600 border-opacity-20 bg-card text-gray-200 transition-transform duration-500 ease-out 2md:w-64 2md:translate-x-0"
	aria-label="Main Sidebar Navigation"
>
	<!-- Sidebar Header -->
	<div
		class="flex h-16 w-full flex-none items-center justify-center px-4 bg-gray-600 bg-opacity-25 uppercase font-extrabold"
	>
		Módulos
	</div>
	<!-- END Sidebar Header -->

	<!-- Sidebar Navigation -->
	<div class="overflow-y-auto">
		<div class="w-full p-4">
			<nav class="space-y-1">
				<a
					href="/"
					class="group flex items-center space-x-2 rounded-lg border border-blue-100 bg-blue-50 px-2.5 text-sm font-medium text-gray-900 dark:border-transparent dark:bg-gray-700/75 dark:text-white"
				>
					<span
						class="flex flex-none items-center text-blue-500 dark:text-gray-300"
					>
						<Home class="w-4" />
					</span>
					<span class="grow py-2">Dashboard</span>
					<span
						class="inline-flex rounded-full border border-blue-200 bg-blue-100 px-1.5 py-0.5 text-xs font-semibold leading-4 text-blue-700 dark:border-blue-700 dark:bg-blue-700 dark:text-blue-50"
						>3</span
					>
				</a>
				<div
					class="px-3 pb-2 pt-5 text-xs font-semibold uppercase tracking-wider text-gray-500"
				>
					Cadastros
				</div>
				<a
					href="/business"
					class="group flex items-center space-x-2 rounded-lg border border-transparent px-2.5 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-gray-900 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700/75 dark:hover:text-white dark:active:border-gray-600"
				>
					<span
						class="flex flex-none items-center text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-gray-300"
					>
						<Building2 class="w-4" />
					</span>
					<span class="grow py-2">Empresa</span>
					<span
						class="inline-flex rounded-full border border-blue-200 bg-blue-100 px-1.5 py-0.5 text-xs font-semibold leading-4 text-blue-700 dark:border-blue-700 dark:bg-blue-700 dark:text-blue-50"
						>99+</span
					>
				</a>
				<a
					href="/product"
					class="group flex items-center space-x-2 rounded-lg border border-transparent px-2.5 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-gray-900 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700/75 dark:hover:text-white dark:active:border-gray-600"
				>
					<span
						class="flex flex-none items-center text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-gray-300"
					>
						<PackagePlus class="w-4" />
					</span>
					<span class="grow py-2">Produto</span>
				</a>
				<div
					class="px-3 pb-2 pt-5 text-xs font-semibold uppercase tracking-wider text-gray-500"
				>
					Comercial
				</div>
				<a
					href="/pdv"
					class="group flex items-center space-x-2 rounded-lg border border-transparent px-2.5 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-gray-900 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700/75 dark:hover:text-white dark:active:border-gray-600"
				>
					<span
						class="flex flex-none items-center text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-gray-300"
					>
						<ShoppingCart class="w-4" />
					</span>
					<span class="grow py-2">PDV </span>
				</a>
				<div
					class="px-3 pb-2 pt-5 text-xs font-semibold uppercase tracking-wider text-gray-500"
				>
					Gerencial
				</div>
				<a
					href="/pdv"
					class="group flex items-center space-x-2 rounded-lg border border-transparent px-2.5 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-gray-900 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700/75 dark:hover:text-white dark:active:border-gray-600"
				>
					<span
						class="flex flex-none items-center text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-gray-300"
					>
						<FileBarChart class="w-4" />
					</span>
					<span class="grow py-2">Relatório de Vendas </span>
				</a>
			</nav>
		</div>
	</div>
	<!-- END Sidebar Navigation -->
</nav>
<!-- Page Sidebar -->
