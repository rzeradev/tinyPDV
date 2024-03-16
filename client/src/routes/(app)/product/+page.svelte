<script lang="ts">
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import * as Select from "$lib/components/ui/select";
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
		newProductSchema,
		type NewProductSchema,
		productConditions,
	} from "$lib/schemas/schemas";
	import { maskPrice } from "$lib/utils/utils";
	import Button from "$lib/components/ui/button/button.svelte";
	import { axiosInstance } from "$lib/axios";
	import type { AxiosError } from "axios";

	export let data: SuperValidated<Infer<NewProductSchema>>;

	const form = superForm(data, {
		SPA: true,
		validators: zodClient(newProductSchema),
		onUpdated({ form }) {
			if (form.valid) {
				//doLogin(form.data);
				toast.success("You submitted" + JSON.stringify(form.data, null, 2));
			} else {
				toast.error("Por favor confira os erros no formulário.");
			}
		},
	});

	const { form: formData, enhance, reset } = form;

	$: selectedType = {
		label: productConditions[$formData.condition],
		value: $formData.condition,
	};

	$formData.condition = "novo";
</script>

<div class="container">
	<div class="flex items-center justify-between space-y-2 p-6">
		<h2 class="text-3xl font-bold tracking-tight">Cadastro de Empresas</h2>
	</div>

	<form method="POST" use:enhance class="p-6 pt-0 grid gap-4 grid-cols-4">
		<Form.Field {form} name="name" class="grid gap-2 col-span-2">
			<Form.Control let:attrs>
				<Form.Label
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					Nome *
				</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.name}
					class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="Nome"
					type="text"
					autocomplete="none"
					minlength={3}
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="brand" class="grid gap-2 col-span-2">
			<Form.Control let:attrs>
				<Form.Label
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					Marca *
				</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.brand}
					class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="Marca"
					type="text"
					autocomplete="none"
					minlength={3}
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="condition" class="grid gap-2 col-span-4">
			<Form.Control let:attrs>
				<Form.Label>Condição do Produto *</Form.Label>
				<Select.Root selected={selectedType}
					onSelectedChange={(v) => {
						v && ($formData.condition = v.value);
					}}>
					<Select.Input name={attrs.name} />
					<Select.Trigger {...attrs}>
						<Select.Value placeholder="Selecione a condição do produto" />
					</Select.Trigger>
					<Select.Content>
						{#each Object.entries(productConditions) as [value, label]}
							<Select.Item {value} {label}>{label}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="color" class="grid gap-2">
			<Form.Control let:attrs>
				<Form.Label
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					Cor
					</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.color}
					class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="Cor"
					type="text"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="quantity" class="grid gap-2">
			<Form.Control let:attrs>
				<Form.Label
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					Quantidade *
				</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.quantity}
					class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="Quantidade"
					type="Number"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="price" class="grid gap-2">
			<Form.Control let:attrs>
				<Form.Label
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					Preço *
				</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.price}
					class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="Preço"
					type="text"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="description" class="grid gap-2 col-span-4">
			<Form.Control let:attrs>
				<Form.Label>Descrição</Form.Label>
				<Textarea
					{...attrs}
					placeholder="Conte um pouco sobre o produto."
					class="h-[100px] resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					bind:value={$formData.description}
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Button type="submit" class="col-span-4">Cadastrar</Button>

		{#if browser}
			<div class="grid col-span-4">
				<SuperDebug data={$formData} />
			</div>
		{/if}
	</form>
</div>
