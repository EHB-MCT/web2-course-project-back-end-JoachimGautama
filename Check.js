import * as z from "zod";

export class Check {
  static checkCharacter(data) {
    const classesEnum = z.enum([
      "Artificer",
      "Barbarian",
      "Bard",
      "Cleric",
      "Druid",
      "Fighter",
      "Monk",
      "Paladin",
      "Ranger",
      "Rogue",
      "Sorcerer",
      "Warlock",
      "Wizard",
    ]); // code from zod documentation https://zod.dev/api#enums
    const zodSchema = z.object({
      name: z.string(),
      class: classesEnum,
      level: z.number().gte(1).lte(20),
      spellSlots: z.array(z.int().lte(4)),
      stats: z.object({
        STR: z.number(),
        DEX: z.number(),
        CON: z.number(),
        INT: z.number(),
        WIS: z.number(),
        CHA: z.number(),
      }),
      spellList: z.array(z.string()),
    });

    zodSchema.parse(data);
  }
}
