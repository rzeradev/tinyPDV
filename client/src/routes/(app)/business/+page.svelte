<script lang="ts">
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import * as Select from "$lib/components/ui/select";
	import { Switch } from "$lib/components/ui/switch/index.js";
	import { Textarea } from "$lib/components/ui/textarea";
	import { toast } from "svelte-sonner";
	import { browser } from "$app/environment";
	import SuperDebug, {
		type SuperValidated,
		type Infer,
		superForm,
	} from "sveltekit-superforms";

	import { zodClient } from "sveltekit-superforms/adapters";
	import {
		newBusinessSchema,
		type NewBusinessSchema,
		typesPerson,
	} from "$lib/schemas/schemas";
	import Button from "$lib/components/ui/button/button.svelte";
	import { axiosInstance } from "$lib/axios";
	import type { AxiosError } from "axios";

	export let data: SuperValidated<Infer<NewBusinessSchema>>;

	const form = superForm(data, {
		SPA: true,
		validators: zodClient(newBusinessSchema),
		onUpdated({ form }) {
			if (form.valid) {
				//doLogin(form.data);
				toast.success("You submitted" + JSON.stringify(form.data, null, 2));
			} else {
				toast.error("Por favor confira os erros no formulário.");
			}
		},
	});

	const { form: formData, enhance } = form;

	$: selectedType = {
		label: typesPerson[$formData.type],
		value: $formData.type,
	};

	let first_name = "Razão Social";
	let last_name = "Nome Fantasia";
	let document = "CNPJ";

	$: if ($formData.type === "pf") {
		first_name = "Nome";
		last_name = "Sobrenome";
		document = "CPF";
	} else {
		first_name = "Razão Social";
		last_name = "Nome Fantasia";
		document = "CNPJ";
	}

	$formData.status = true;
	$formData.type = "pj";
</script>

<div class="container">
	<div class="flex items-center justify-between space-y-2 p-6">
		<h2 class="text-3xl font-bold tracking-tight">Cadastro de Empresas</h2>
	</div>

	<form method="POST" use:enhance class="p-6 pt-0 grid gap-4 grid-cols-4">
		<Form.Field {form} name="type" class="grid gap-2 col-span-4">
			<Form.Control let:attrs>
				<Form.Label>Tipo Pessoa</Form.Label>
				<Select.Root
					selected={selectedType}
					onSelectedChange={(v) => {
						v && ($formData.type = v.value);
					}}
				>
					<Select.Input name={attrs.name} />
					<Select.Trigger {...attrs}>
						<Select.Value placeholder="Selecione o tipo de pessoa" />
					</Select.Trigger>
					<Select.Content>
						{#each Object.entries(typesPerson) as [value, label]}
							<Select.Item {value} {label}>{label}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="first_name" class="grid gap-2 col-span-2">
			<Form.Control let:attrs>
				<Form.Label
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>{first_name}</Form.Label
				>
				<Input
					{...attrs}
					bind:value={$formData.first_name}
					class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					placeholder={first_name}
					type="text"
					autocomplete="none"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="last_name" class="grid gap-2 col-span-2">
			<Form.Control let:attrs>
				<Form.Label
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>{last_name}</Form.Label
				>
				<Input
					{...attrs}
					bind:value={$formData.last_name}
					class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					placeholder={last_name}
					type="text"
					autocomplete="none"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		{#if $formData.type === "pf"}
			<Form.Field {form} name="cpf" class="grid gap-2 col-span-2">
				<Form.Control let:attrs>
					<Form.Label
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>{document}</Form.Label
					>
					<Input
						{...attrs}
						bind:value={$formData.cpf}
						class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						placeholder={document}
						type="text"
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		{/if}

		{#if $formData.type === "pj"}
			<Form.Field {form} name="cnpj" class="grid gap-2 col-span-2">
				<Form.Control let:attrs>
					<Form.Label
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>{document}</Form.Label
					>
					<Input
						{...attrs}
						bind:value={$formData.cnpj}
						class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						placeholder={document}
						type="text"
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		{/if}

		<Form.Field {form} name="zip_code" class="grid gap-2">
			<Form.Control let:attrs>
				<Form.Label
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>CEP</Form.Label
				>
				<Input
					{...attrs}
					bind:value={$formData.zip_code}
					class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="CEP"
					type="text"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="street" class="grid gap-2">
			<Form.Control let:attrs>
				<Form.Label
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>Rua</Form.Label
				>
				<Input
					{...attrs}
					bind:value={$formData.street}
					class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="Rua"
					type="text"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="number" class="grid gap-2">
			<Form.Control let:attrs>
				<Form.Label
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>Número</Form.Label
				>
				<Input
					{...attrs}
					bind:value={$formData.number}
					class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="Número"
					type="text"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="neighborhood" class="grid gap-2">
			<Form.Control let:attrs>
				<Form.Label
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>Bairro</Form.Label
				>
				<Input
					{...attrs}
					bind:value={$formData.neighborhood}
					class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="Bairro"
					type="text"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="state" class="grid gap-2">
			<Form.Control let:attrs>
				<Form.Label
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>Estado</Form.Label
				>
				<Input
					{...attrs}
					bind:value={$formData.state}
					class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="Estado"
					type="text"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="phone" class="grid gap-2">
			<Form.Control let:attrs>
				<Form.Label
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>Telefone</Form.Label
				>
				<Input
					{...attrs}
					bind:value={$formData.phone}
					class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="Telefone"
					type="text"
				/>
			</Form.Control>
			<Form.FieldErrors />
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
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="website" class="grid gap-2 col-span-2">
			<Form.Control let:attrs>
				<Form.Label
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>Website</Form.Label
				>
				<Input
					{...attrs}
					bind:value={$formData.website}
					placeholder="http://empresa.com.br"
					autocomplete="none"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="description" class="grid gap-2 col-span-4">
			<Form.Control let:attrs>
				<Form.Label>Descrição</Form.Label>
				<Textarea
					{...attrs}
					placeholder="Conte um pouco sobre o que a sua empresa faz."
					class="h-[100px] resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					bind:value={$formData.description}
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<fieldset class="grid gap-2 col-span-4 xl:col-span-2">
			<legend class="mb-4 text-lg font-medium">
				Configurações da Empresa
			</legend>
			<div class="space-y-4">
				<fieldset class="grid gap-2 rounded-lg border p-4">
					<legend class="mb-4 text-sm font-medium">
						Horário de Funcionamento
					</legend>
					<div class="grid gap-2 grid-cols-4">
						<Form.Field {form} name="opens_at" class="grid col-span-2">
							<Form.Control let:attrs>
								<Form.Label
									class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>Abre</Form.Label
								>
								<Input
									{...attrs}
									bind:value={$formData.opens_at}
									placeholder="Digite o site da empresa"
									autocomplete="none"
									type="time"
								/>
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="closes_at" class="grid col-span-2">
							<Form.Control let:attrs>
								<Form.Label
									class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>Fecha</Form.Label
								>
								<Input
									{...attrs}
									bind:value={$formData.closes_at}
									placeholder="Digite o site da empresa"
									autocomplete="none"
									type="time"
								/>
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
				</fieldset>
			</div>
			<div class="space-y-4">
				<Form.Field
					{form}
					name="status"
					class="flex flex-row items-center justify-between rounded-lg border p-4"
				>
					<Form.Control let:attrs>
						<div class="space-y-0.5">
							<Form.Label>Habilitar Empresa</Form.Label>
							<Form.Description>
								Se a empresa não estiver habilitada, ela não pode realizar
								vendas.
							</Form.Description>
						</div>
						<Switch includeInput {...attrs} bind:checked={$formData.status} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
		</fieldset>

		<Button type="submit" class="col-span-4">Cadastrar</Button>

		{#if browser}
			<SuperDebug data={$formData} />
		{/if}
	</form>
</div>
