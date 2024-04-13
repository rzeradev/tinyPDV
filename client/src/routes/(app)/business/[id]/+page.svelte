<script lang="ts">
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import * as Select from "$lib/components/ui/select";
	import { Switch } from "$lib/components/ui/switch";
	import { Textarea } from "$lib/components/ui/textarea";
	import * as Popover from "$lib/components/ui/popover";
	import * as Command from "$lib/components/ui/command";
	import { cn } from "$lib/utils.js";
	import { tick } from "svelte";
	import { toast } from "svelte-sonner";
	import { browser } from "$app/environment";
	import Check from "svelte-radix/Check.svelte";
	import { buttonVariants } from "$lib/components/ui/button";
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
		states,
	} from "$lib/schemas/newBusinessSchema";
	import Button from "$lib/components/ui/button/button.svelte";
	import {
		maskCNPJ,
		maskCPF,
		maskCellphone,
		maskZipcode,
	} from "$lib/utils/utils";
	import { CaretSort } from "svelte-radix";
	import { apiService } from "$lib/services/ApiService";
	import { page } from "$app/stores";

	export let data: SuperValidated<Infer<NewBusinessSchema>>;
	const id = $page.params.id;

	const form = superForm(data, {
		SPA: true,
		validators: zodClient(newBusinessSchema),
		async onUpdated({ form }) {
			if (form.valid) {
				try {
					let { data } = await apiService.put(`api/business/${id}`, form.data);

					data = data.data;

					console.log(data);
				} catch (error: any) {
					toast.error(error.response.data.message);
				}
			} else {
				toast.error("Por favor confira os erros no formulário.");
			}
		},
		onChange(e) {
			const targetName = (e.target as HTMLInputElement)?.name;
			if (targetName === "cpf_cnpj" && $formData.type === "pf") {
				$formData.cpf_cnpj = maskCPF($formData.cpf_cnpj);
			}

			if (targetName === "cpf_cnpj" && $formData.type === "pj") {
				$formData.cpf_cnpj = maskCNPJ($formData.cpf_cnpj);
			}

			if (targetName === "phone") {
				$formData.phone = maskCellphone($formData.phone);
			}

			if (targetName === "zip_code") {
				$formData.zip_code = maskZipcode($formData.zip_code);
			}
		},
	});

	const { form: formData, enhance, reset } = form;

	$: selectedType = {
		label: typesPerson[$formData.type],
		value: $formData.type,
	};

	let first_name = "Razão Social";
	let last_name = "Nome Fantasia";
	let documentType = "CNPJ";

	$: if ($formData.type === "pf") {
		first_name = "Nome";
		last_name = "Sobrenome";
		documentType = "CPF";
	} else {
		first_name = "Razão Social";
		last_name = "Nome Fantasia";
		documentType = "CNPJ";
	}

	$formData.status = true;
	$formData.type = "pf";

	let open = false;

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	const fetchBusiness = async (id: string) => {
		let { data } = await apiService.get(`api/business/${id}`);
		data = data.data;

		//remove id, user_id, logo from data
		data = Object.fromEntries(
			Object.entries(data).filter(
				([key, value]) => !["id", "user_id", "logo"].includes(key)
			)
		);

		//map data to $formData
		$formData = {
			...$formData,
			...data,
		};
	};

	fetchBusiness(id);
</script>

<div class="container">
	<div class="flex items-center justify-between space-y-2 p-6">
		<h2 class="text-3xl font-bold tracking-tight">Cadastro de Empresas</h2>
	</div>

	<form method="POST" use:enhance class="p-6 pt-0 grid gap-4 grid-cols-4">
		<Form.Field {form} name="type" class="grid gap-2 col-span-4">
			<Form.Control let:attrs>
				<Form.Label>Tipo Pessoa *</Form.Label>
				<Select.Root
					selected={selectedType}
					onSelectedChange={(v) => {
						v && ($formData.type = v.value);
						$formData.cpf_cnpj = "";
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
					>{first_name} *</Form.Label
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
					>{last_name} *</Form.Label
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
		<Form.Field {form} name="cpf_cnpj" class="grid gap-2 col-span-2">
			<Form.Control let:attrs>
				<Form.Label
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>{documentType} *</Form.Label
				>
				<Input
					{...attrs}
					bind:value={$formData.cpf_cnpj}
					class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="###.###.###-##"
					type="text"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="zip_code" class="grid gap-2">
			<Form.Control let:attrs>
				<Form.Label
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>CEP *</Form.Label
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
					>Rua *</Form.Label
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
					>Número *</Form.Label
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
					>Bairro *</Form.Label
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
			<Popover.Root bind:open let:ids>
				<Form.Control let:attrs>
					<Form.Label>Estado *</Form.Label>
					<Popover.Trigger
						class={cn(
							buttonVariants({ variant: "outline" }),
							"w-full justify-between bg-transparent",
							!$formData.state && "text-muted-foreground"
						)}
						role="combobox"
						{...attrs}
					>
						{states.find((f) => f.value === $formData.state)?.label ??
							"Selecione seu estado."}
						<CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Popover.Trigger>
					<input hidden value={$formData.state} name={attrs.name} />
				</Form.Control>
				<Popover.Content class="p-0">
					<Command.Root>
						<Command.Input
							autofocus
							placeholder="Pesquisar estado..."
							class="h-9"
						/>
						<Command.Empty>Estado não encontrado.</Command.Empty>
						<Command.Group>
							{#each states as state}
								<Command.Item
									value={state.label}
									onSelect={() => {
										$formData.state = state.value;
										closeAndFocusTrigger(ids.trigger);
									}}
								>
									{state.label}
									<Check
										class={cn(
											"ml-auto h-4 w-4",
											state.value !== $formData.state && "text-transparent"
										)}
									/>
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="phone" class="grid gap-2">
			<Form.Control let:attrs>
				<Form.Label
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>WhatsApp *</Form.Label
				>
				<Input
					{...attrs}
					bind:value={$formData.phone}
					class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="(00) 00000-0000"
					type="text"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="email" class="grid gap-2 col-span-2">
			<Form.Control let:attrs>
				<Form.Label
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>Email *</Form.Label
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
