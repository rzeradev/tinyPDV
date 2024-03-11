import { z } from "zod";

export const newLoginSchema = z.object({
	email: z
		.string({ required_error: "O campo Email precisa ser preenchido." })
		.email("Esse não é um email válido."),
	password: z
		.string({ required_error: "O campo Senha precisa ser preenchido." })
		.min(1, { message: "O campo Senha precisa ser preenchido." })
		.min(8, { message: "O campo Senha precisa ter no mínimo 8 caracteres." })
		.max(50),
});

export type NewLoginSchema = typeof newLoginSchema;

export const newRegisterSchema = z
	.object({
		name: z
			.string({ required_error: "O campo Nome precisa ser preenchido." })
			.min(6, { message: "O campo nome precisa ter no mínimo 3 caracteres" })
			.max(30, { message: "O campo nome precisa ter no máximo 30 caracteres" }),
		email: z
			.string({ required_error: "O campo Email precisa ser preenchido." })
			.email("Esse não é um email válido."),
		password: z
			.string({ required_error: "O campo Senha precisa ser preenchido." })
			.min(1, { message: "O campo Senha precisa ser preenchido." })
			.min(8, { message: "O campo Senha precisa ter no mínimo 8 caracteres." })
			.max(50),
		confirm_password: z
			.string({
				required_error: "O campo Confirmar Senha precisa ser preenchido.",
			})
			.min(1, { message: "O campo Confirmar Senha precisa ser preenchido." })
			.min(8, {
				message: "O campo Confirmar Senha precisa ter no mínimo 8 caracteres.",
			})
			.max(50),
	})
	.refine((data) => data.confirm_password === data.password, {
		message: "As senhas precisam ser idênticas",
		path: ["password"],
	});

export type NewRegisterSchema = typeof newRegisterSchema;

export const typesPerson = {
	pf: "Pessoa Física",
	pj: "Pessoa Jurídica",
};

type typePerson = keyof typeof typesPerson;

const required = { required_error: "O Campo é obrigatório" };
export const newBusinessSchema = z.object({
	id: z.number().optional(), // assuming it's auto-incremented and not provided in the form
	type: z
		.enum(Object.keys(typesPerson) as [typePerson, ...typePerson[]], required)
		.default("pf"),
	first_name: z.string(required).min(1).max(100),
	last_name: z.string(required).min(1).max(100),
	cpf: z
		.string(required)
		.length(18)
		.refine(
			(value) => /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(value),
			"CPF com formato inválido ###.###.###-##"
		),
	cnpj: z
		.string(required)
		.length(18)
		.refine(
			(value) => /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(value),
			"CNPJ com formato inválido ##.###.###/####-##"
		),
	zip_code: z.string(required).length(9),
	street: z.string(required).max(100),
	number: z.string(required).max(10),
	neighborhood: z.string(required).max(100),
	state: z.string(required).length(2), // assuming 'state' is a 2 character string
	phone: z.string(required).max(15), // adjust the validation according to the phone format
	email: z.string(required).email().max(100),
	website: z.string().url().max(100).optional(), // assuming 'website' is optional and must be a valid URL
	logo: z.string().max(100).optional(), // assuming 'logo' is optional
	description: z.string().optional(), // assuming 'description' is optional, text field has no max length in Zod
	opens_at: z.string().max(5).optional(), // assuming 'opens_at' is optional
	closes_at: z.string().max(5).optional(), // assuming 'closes_at' is optional
	status: z.boolean(required).default(true),
});

export type NewBusinessSchema = typeof newBusinessSchema;
