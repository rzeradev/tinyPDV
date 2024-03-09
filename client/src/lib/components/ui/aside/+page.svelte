<script>
    import { Home, LucideBriefcase, ClipboardList, Users, Plus, CircleUser, Settings, Lock } from "lucide-svelte";
</script>


<!-- 
as classes -translate-x-full e fixed estavam bugando o aside,
se qser implementar o hide and show dele provalvemente vai ter q mexer com isso
-->
<aside id="page-sidebar" aria-label="Main Sidebar Navigation"
    class="dark bottom-0 left-0 top-0 z-50 flex h-full w-full flex-col border-r border-gray-800 bg-gray-800 text-gray-200 transition-transform duration-500 ease-out lg:w-64 lg:translate-x-0">
    
    <div class="flex h-16 w-full flex-none items-center justify-between px-4 dark:bg-gray-600 dark:bg-opacity-25 lg:justify-center">
        <a href="/"
            class="group inline-flex items-center space-x-2 text-lg font-bold tracking-wide text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300">
            <svg class="hi-mini hi-cube-transparent inline-block size-5 text-blue-600 transition group-hover:scale-110 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M9.638 1.093a.75.75 0 01.724 0l2 1.104a.75.75 0 11-.724 1.313L10 2.607l-1.638.903a.75.75 0 11-.724-1.313l2-1.104zM5.403 4.287a.75.75 0 01-.295 1.019l-.805.444.805.444a.75.75 0 01-.724 1.314L3.5 7.02v.73a.75.75 0 01-1.5 0v-2a.75.75 0 01.388-.657l1.996-1.1a.75.75 0 011.019.294zm9.194 0a.75.75 0 011.02-.295l1.995 1.101A.75.75 0 0118 5.75v2a.75.75 0 01-1.5 0v-.73l-.884.488a.75.75 0 11-.724-1.314l.806-.444-.806-.444a.75.75 0 01-.295-1.02zM7.343 8.284a.75.75 0 011.02-.294L10 8.893l1.638-.903a.75.75 0 11.724 1.313l-1.612.89v1.557a.75.75 0 01-1.5 0v-1.557l-1.612-.89a.75.75 0 01-.295-1.019zM2.75 11.5a.75.75 0 01.75.75v1.557l1.608.887a.75.75 0 01-.724 1.314l-1.996-1.101A.75.75 0 012 14.25v-2a.75.75 0 01.75-.75zm14.5 0a.75.75 0 01.75.75v2a.75.75 0 01-.388.657l-1.996 1.1a.75.75 0 11-.724-1.313l1.608-.887V12.25a.75.75 0 01.75-.75zm-7.25 4a.75.75 0 01.75.75v.73l.888-.49a.75.75 0 01.724 1.313l-2 1.104a.75.75 0 01-.724 0l-2-1.104a.75.75 0 11.724-1.313l.888.49v-.73a.75.75 0 01.75-.75z" clip-rule="evenodd"/></svg>
            <span>Company</span>
        </a>

        <div class="lg:hidden">
        <button
            type="button"
            class="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
        >
            <svg
            class="hi-mini hi-x-mark -mx-0.5 inline-block size-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            >
            <path
                d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
            />
            </svg>
        </button>
        </div>
    </div>

    <div class="overflow-y-auto">
        <div class="w-full p-4">
            <div class="space-y-1">
                <a href="/" class="group flex items-center space-x-2 rounded-lg border border-blue-100 bg-blue-50 px-2.5 text-sm font-medium text-gray-900 dark:border-transparent dark:bg-gray-700/75 dark:text-white">
                    <span class="flex flex-none items-center text-blue-500 dark:text-gray-300">
                        <Home />
                    </span>

                    <span class="grow py-2">Dashboard</span>

                    <span class="inline-flex rounded-full border border-blue-200 bg-blue-100 px-1.5 py-0.5 text-xs font-semibold leading-4 text-blue-700 dark:border-blue-700 dark:bg-blue-700 dark:text-blue-50">
                        3
                    </span>
                </a>

                <div class="px-3 pb-2 pt-5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Projects
                </div>
                <a href="/" class="group flex items-center space-x-2 rounded-lg border border-transparent px-2.5 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-gray-900 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700/75 dark:hover:text-white dark:active:border-gray-600">
                    <span class="flex flex-none items-center text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-gray-300">
                        <LucideBriefcase />
                    </span>

                    <span class="grow py-2">Manage</span>

                    <span class="inline-flex rounded-full border border-blue-200 bg-blue-100 px-1.5 py-0.5 text-xs font-semibold leading-4 text-blue-700 dark:border-blue-700 dark:bg-blue-700 dark:text-blue-50">
                        99+
                    </span>
                </a>

                <a href="/" class="group flex items-center space-x-2 rounded-lg border border-transparent px-2.5 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-gray-900 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700/75 dark:hover:text-white dark:active:border-gray-600">
                    <span class="flex flex-none items-center text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-gray-300">
                        <ClipboardList />
                    </span>

                    <span class="grow py-2">Tasks</span>

                    <span class="inline-flex rounded-full border border-blue-200 bg-blue-100 px-1.5 py-0.5 text-xs font-semibold leading-4 text-blue-700 dark:border-blue-700 dark:bg-blue-700 dark:text-blue-50">
                        9
                    </span>
                </a>

                <a href="/" class="group flex items-center space-x-2 rounded-lg border border-transparent px-2.5 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-gray-900 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700/75 dark:hover:text-white dark:active:border-gray-600">
                    <span class="flex flex-none items-center text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-gray-300">
                        <Users />
                    </span>

                    <span class="grow py-2">Clients</span>

                    <span class="inline-flex rounded-full border border-blue-200 bg-blue-100 px-1.5 py-0.5 text-xs font-semibold leading-4 text-blue-700 dark:border-blue-700 dark:bg-blue-700 dark:text-blue-50">
                        26
                    </span>
                </a>

                <a href="/" class="group flex items-center space-x-2 rounded-lg border border-transparent px-2.5 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-gray-900 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700/75 dark:hover:text-white dark:active:border-gray-600">
                    <span class="flex flex-none items-center text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-gray-300">
                        <Plus />
                    </span>

                    <span class="grow py-2">Add New</span>
                </a>

                <div class="px-3 pb-2 pt-5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Account
                </div>
                <a href="/" class="group flex items-center space-x-2 rounded-lg border border-transparent px-2.5 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-gray-900 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700/75 dark:hover:text-white dark:active:border-gray-600">
                    <span class="flex flex-none items-center text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-gray-300">
                        <CircleUser />
                    </span>

                    <span class="grow py-2">Profile</span>
                </a>

                <a href="/" class="group flex items-center space-x-2 rounded-lg border border-transparent px-2.5 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-gray-900 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700/75 dark:hover:text-white dark:active:border-gray-600">
                    <span class="flex flex-none items-center text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-gray-300">
                        <Settings />
                    </span>

                    <span class="grow py-2">Settings</span>
                </a>

                <a href="/" class="group flex items-center space-x-2 rounded-lg border border-transparent px-2.5 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-gray-900 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700/75 dark:hover:text-white dark:active:border-gray-600">
                    <span class="flex flex-none items-center text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-gray-300">
                        <Lock />
                    </span>

                    <span class="grow py-2">Log out</span>
                </a>
            </div>
        </div>
    </div>
</aside>