import { message } from "sveltekit-superforms";
import { z } from "zod";

const required = { required_error: "O Campo é obrigatório" };

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
		password_confirmation: z
			.string({
				required_error: "O campo Confirmar Senha precisa ser preenchido.",
			})
			.min(1, { message: "O campo Confirmar Senha precisa ser preenchido." })
			.min(8, {
				message: "O campo Confirmar Senha precisa ter no mínimo 8 caracteres.",
			})
			.max(50),
	})
	.refine((data) => data.password_confirmation === data.password, {
		message: "As senhas precisam ser idênticas",
		path: ["password"],
	});

export type NewRegisterSchema = typeof newRegisterSchema;

export const typesPerson = {
	pf: "Pessoa Física",
	pj: "Pessoa Jurídica",
};

type typePerson = keyof typeof typesPerson;

export const states = [
	{ label: "Acre", value: "AC" },
	{ label: "Alagoas", value: "AL" },
	{ label: "Amapá", value: "AP" },
	{ label: "Amazonas", value: "AM" },
	{ label: "Bahia", value: "BA" },
	{ label: "Ceará", value: "CE" },
	{ label: "Distrito Federal", value: "DF" },
	{ label: "Espírito Santo", value: "ES" },
	{ label: "Goiás", value: "GO" },
	{ label: "Maranhão", value: "MA" },
	{ label: "Mato Grosso", value: "MT" },
	{ label: "Mato Grosso do Sul", value: "MS" },
	{ label: "Minas Gerais", value: "MG" },
	{ label: "Pará", value: "PA" },
	{ label: "Paraíba", value: "PB" },
	{ label: "Paraná", value: "PR" },
	{ label: "Pernambuco", value: "PE" },
	{ label: "Piauí", value: "PI" },
	{ label: "Rio de Janeiro", value: "RJ" },
	{ label: "Rio Grande do Norte", value: "RN" },
	{ label: "Rio Grande do Sul", value: "RS" },
	{ label: "Rondônia", value: "RO" },
	{ label: "Roraima", value: "RR" },
	{ label: "Santa Catarina", value: "SC" },
	{ label: "São Paulo", value: "SP" },
	{ label: "Sergipe", value: "SE" },
	{ label: "Tocantins", value: "TO" },
] as const;

type State = (typeof states)[number]["value"];

export const newBusinessSchema = z
	.object({
		id: z.number().optional(), // assuming it's auto-incremented and not provided in the form
		type: z
			.enum(Object.keys(typesPerson) as [typePerson, ...typePerson[]], required)
			.default("pf"),
		first_name: z.string(required).min(1).max(100),
		last_name: z.string(required).min(1).max(100),
		cpf_cnpj: z
			.string(required)
			.min(14, { message: "Mínimo de 14 caracteres" })
			.max(18, { message: "Máximo de 18 caracteres" })
			.refine((value) => {
				if (value.length > 0 && value.length < 15) {
					return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value);
				} else if (value.length >= 15) {
					return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value);
				} else {
					return true;
				}
			}, "Formato inválido"),
		zip_code: z
			.string(required)
			.length(9, { message: "O CEP precisa ter 9 caracteres." }),
		street: z.string(required).max(50, { message: "Máximo de 50 caracteres" }),
		number: z.string(required).max(5, { message: "Máximo de 5 caracteres" }),
		neighborhood: z
			.string(required)
			.max(50, { message: "Máximo de 50 caracteres" }),
		state: z.enum(states.map((state) => state.value) as [State, ...State[]], {
			errorMap: () => ({ message: "Por favor selecione um estado." }),
		}),
		phone: z.string(required).max(14, { message: "Máximo de 14 caracteres" }),
		email: z
			.string(required)
			.email({ message: "Email inválido" })
			.max(50, { message: "Máximo de 50 caracteres" }),
		website: z
			.string()
			.url()
			.max(60, { message: "Máximo de 60 caracteres" })
			.optional(),
		logo: z
			.instanceof(File, { message: "Por favor suba um arquivo." })
			.refine((f) => f.size < 100_000, "Max 100 kB upload size.")
			.optional(),
		description: z.string().optional(), // assuming 'description' is optional, text field has no max length in Zod
		opens_at: z
			.string()
			.max(5, { message: "Máximo de 5 caracteres" })
			.optional(), // assuming 'opens_at' is optional
		closes_at: z
			.string()
			.max(5, { message: "Máximo de 5 caracteres" })
			.optional(),
		status: z.boolean(required).default(true),
	})
	.refine(
		(data) => {
			if (data.type === "pf" && data.cpf_cnpj.length !== 14) {
				return false;
			}

			if (data.type === "pj" && data.cpf_cnpj.length !== 18) {
				return false;
			}

			return true;
		},
		{
			message: "Formato inválido",
			path: ["cpf_cnpj"],
		}
	);

export type NewBusinessSchema = typeof newBusinessSchema;
