import { z } from "zod";

export const booleanSchema = z.boolean();

export const stringSchema = z.string();

export const numberSchema = z.number();

export const optionalStringSchema = stringSchema.optional();

export const speNumberSchema = stringSchema.or(numberSchema);

export const coinSchema = z.enum(["BTC", "ETH", "USDT"]);

export const addressSchema = stringSchema;

export const txSchema = stringSchema;

export const chainSchema = z.enum([
  "Ethereum",
  "Binance Smart Chain",
  "Bitcoin",
]);

export const userKycDataSchema = z.object({
  firstName: optionalStringSchema,
  lastName: optionalStringSchema,
  kanaFirstName: optionalStringSchema,
  kanaLastName: optionalStringSchema,
  romanjiFirstName: optionalStringSchema,
  romanjiLastName: optionalStringSchema,
  fullName: optionalStringSchema,
  dateOfBirth: optionalStringSchema,
  idNumber: optionalStringSchema,
  idType: z.enum(["passport", "driverLicense", "ID", "other"]).optional(),
  address: optionalStringSchema,
  images: z
    .object({
      IDCertificateFront: optionalStringSchema,
      IDCertificateBack: optionalStringSchema,
      proofOfAddress: optionalStringSchema,
      selfie: optionalStringSchema,
      selfieWithDocument: optionalStringSchema,
    })
    .optional(),
});

export const userConfigSchema = z.object({
  leverages: z.record(
    stringSchema,
    numberSchema.int().positive().min(1).max(200),
  ),
});

export const dateSchema = z
  .string()
  .or(z.date())
  .transform((val) => {
    if (typeof val === "string") {
      return new Date(val);
    }
    return val;
  });

export const nullableString = stringSchema
  .nullable()
  .optional()
  .transform((val) => val ?? null);

export const nullableBoolean = z
  .boolean()
  .nullable()
  .optional()
  .transform((val) => val ?? null);

export const nullablePositiveInteger = z
  .number()
  .int()
  .positive()
  .nullable()
  .optional()
  .transform((val) => val ?? null);

export const authenticationPayloadSchema = z.object({
  id: stringSchema,
  uid: stringSchema,
  fiatDepositMemo: optionalStringSchema,
  affiliateCode: stringSchema,
  emailVerified: booleanSchema,
  mobileVerified: booleanSchema,
  hasMfa: booleanSchema,
  kycLevel: numberSchema.int().positive().min(0).max(4),
  email: optionalStringSchema,
  mobile: optionalStringSchema,
  config: userConfigSchema.optional(),
});

export const baseMenuSchema = z.object({
  icon: z.string().optional(),
  type: z.enum(["link", "group", "panel", "custom"]),
  label: z.string(),
  url: z.string().optional(),
  description: z.string().optional(),
  panelFooter: z
    .object({
      title: z.string(),
      description: z.string().optional(),
      button: z
        .object({
          label: z.string(),
          url: z.string(),
        })
        .optional(),
    })
    .optional(),
});

export type Menu = z.infer<typeof baseMenuSchema> & {
  children?: Menu[];
};

const menuSchema: z.ZodType<Menu> = baseMenuSchema.and(
  z.object({
    children: z.lazy(() => menuSchema.array().optional()),
  }),
);

const linkSchema = z.object({
  label: z.string(),
  url: z.string(),
});

const iconSchema = z.object({
  icon: z.string(),
  url: z.string(),
});

const applicationHeaderSchema = z.object({
  menu: menuSchema.array(),
});

export const applicationFooterSchema = z.object({
  copyRight: z.string(),
  privacyTerms: linkSchema,
  termOfService: linkSchema,
  socials: iconSchema.array(),
  groups: z
    .object({
      name: z.string(),
      links: linkSchema.array(),
    })
    .array(),
});

export const applicationSchema = z.object({
  version: z.string(),
  applications: z.object({
    name: z.string(),
    logo: z.object({
      pc: z.string(),
      mobile: z.string().optional(),
    }),
    features: z.object({
      register: z.object({
        email: booleanSchema,
        mobile: booleanSchema,
      }),
      symbols: z
        .object({
          id: z.string(),
          name: z.string(),
          symbol: z.string(),
          description: z.string(),
          baseAssetId: z.string(),
          quoteAssetId: z.string(),
          minPrice: z.string(),
          maxPrice: z.string(),
          tickSize: z.string(),
          minVolume: z.string(),
          maxVolume: z.string(),
          volumeStepSize: z.string(),
          minValue: z.string(),
          maxValue: z.string(),
          baseAssetPrecision: z.number(),
          quoteAssetPrecision: z.number(),
          baseCommissionPrecision: z.number(),
          quoteCommissionPrecision: z.number(),
          isSpot: booleanSchema,
          isFuture: booleanSchema,
          defaultLeverage: z.number(),
        })
        .array(),
    }),
    layout: z.object({
      header: z.object({
        common: applicationHeaderSchema,
        pc: applicationHeaderSchema.optional(),
        mobile: applicationHeaderSchema.optional(),
      }),
      footer: z
        .object({
          common: applicationFooterSchema,
          pc: applicationFooterSchema.optional(),
          mobile: applicationFooterSchema.optional(),
        })
        .optional(),
    }),
  }),
});