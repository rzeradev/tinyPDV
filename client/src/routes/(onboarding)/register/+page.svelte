<script lang="ts">
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import {
		type SuperValidated,
		type Infer,
		superForm,
	} from "sveltekit-superforms";

	import { zodClient } from "sveltekit-superforms/adapters";
	import {
		newRegisterSchema,
		type NewRegisterSchema,
	} from "$lib/schemas/schemas";
	import Button from "$lib/components/ui/button/button.svelte";
	import { axiosInstance } from "$lib/axios";
	import axios from "axios";
	import type { AxiosError } from "axios";
	import { Rocket } from "lucide-svelte";

	export let data: SuperValidated<Infer<NewRegisterSchema>>;

	const form = superForm(data, {
		SPA: true,
		validators: zodClient(newRegisterSchema),
		onUpdated({ form }) {
			if (form.valid) {
				doLogin(form.data);
			}
		},
	});

	const { form: formData, enhance } = form;

	$formData.email = "admin@gmail.com";
	$formData.password = "password";

	const doLogin = async (values: object) => {
		try {
			const api = axiosInstance();
			const response = await api.post("api/register", values);
			console.log(response.data.auth_token);
			apiError = null;

			const { auth_token: token, user: user } = await response.data;

			if (token) {
				localStorage.setItem("token", token);
				localStorage.setItem("user", JSON.stringify(user));
				window.location.href = "/";
			}
		} catch (error: any) {
			apiError = error.response.data.message;
		}
	};

	let apiError: any = null;
</script>

<div
	class="h-screen w-screen flex flex-col justify-center items-center bg-no-repeat bg-cover bg-center bg-opacity-5"
>
	<h1 class=" flex text-3xl font-extrabold mb-2">
		<Rocket class="mt-2 mr-2" /> tinyPDV
	</h1>
	<div
		class="w-80 md:w-96 rounded-xl border border-slate-600 border-opacity-30 bg-card bg-opacity-100 text-card-foreground"
	>
		<h3
			class="flex flex-col p-6 space-y-1 font-semibold tracking-tight text-2xl"
		>
			Crie a sua conta
		</h3>

		<form method="POST" use:enhance class="p-6 pt-0 grid gap-4 grid-cols-2">
			<Form.Field {form} name="name" class="grid gap-2 col-span-2">
				<Form.Control let:attrs>
					<Form.Label
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>Nome</Form.Label
					>
					<Input
						{...attrs}
						bind:value={$formData.name}
						class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						placeholder="Nome Completo"
						type="text"
					/>
				</Form.Control>
			</Form.Field>

			<Form.Field {form} name="email" class="grid gap-2 col-span-2">
				<Form.Control let:attrs>
					<Form.Label
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>Email</Form.Label
					>
					<Input
						{...attrs}
						bind:value={$formData.email}
						placeholder="Digite seu e-mail"
						autocomplete="none"
					/>
				</Form.Control>
				<Form.FieldErrors class="text-red-500" />
			</Form.Field>

			<Form.Field {form} name="password" class="grid gap-2">
				<Form.Control let:attrs>
					<Form.Label
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>Senha</Form.Label
					>
					<Input
						{...attrs}
						bind:value={$formData.password}
						class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						placeholder="******"
						type="password"
					/>
				</Form.Control>
				<Form.FieldErrors class="text-red-500" />
			</Form.Field>

			<Form.Field {form} name="confirm_password" class="grid gap-2">
				<Form.Control let:attrs>
					<Form.Label
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>Confirmar senha</Form.Label
					>
					<Input
						{...attrs}
						bind:value={$formData.confirm_password}
						class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						placeholder="******"
						type="password"
					/>
				</Form.Control>
				<Form.FieldErrors class="text-red-500" />
			</Form.Field>

			{#if apiError}
				<p class="text-red-500 text-sm">{apiError}</p>
			{/if}

			<Button type="submit" class="col-span-2">Registrar-se</Button>
		</form>

		<fieldset class="px-6 py-4">
			<legend class="text-sm text-muted-foreground">
				Já tem uma conta? <a href="/login" class="text-accent-foreground"
					>Login</a
				>
			</legend>
		</fieldset>
	</div>
</div>
