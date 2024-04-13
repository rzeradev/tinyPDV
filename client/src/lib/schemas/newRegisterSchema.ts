import { z } from "zod";

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
