import { z } from "zod";

export const authFormSchema = z
  .object({
    isSignUp: z.boolean(),
    name: z.string().trim().optional(),
    email: z.string().trim().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
    terms: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.isSignUp) return;

    if (!data.name || data.name.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Full name must be at least 2 characters",
        path: ["name"],
      });
    }

    if (data.password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must be at least 8 characters",
        path: ["password"],
      });
    }

    if (!data.terms) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please accept the Terms of Service and Privacy Policy",
        path: ["terms"],
      });
    }
  });

export type AuthFormValues = z.infer<typeof authFormSchema>;
