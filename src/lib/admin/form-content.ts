import {
  getOpeningHoursDayLabel,
  normalizeOpeningHoursDayKey,
  openingHoursDayOrder,
} from "@/lib/opening-hours";

type FaqItem = {
  question: string;
  answer: string;
};

type OpeningHoursItem = {
  day: string;
  time: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseStringList(value: string | null | undefined) {
  return (value ?? "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function formatStringList(value: unknown) {
  if (!Array.isArray(value)) {
    return "";
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean)
    .join("\n");
}

export function parseFaqList(value: string | null | undefined): FaqItem[] {
  return (value ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line) => {
      const [question, ...answerParts] = line.split("|");
      const normalizedQuestion = question?.trim();
      const normalizedAnswer = answerParts.join("|").trim();

      if (!normalizedQuestion || !normalizedAnswer) {
        return [];
      }

      return [
        {
          question: normalizedQuestion,
          answer: normalizedAnswer,
        },
      ];
    });
}

export function formatFaqList(value: unknown) {
  if (!Array.isArray(value)) {
    return "";
  }

  return value
    .flatMap((item) => {
      if (!isRecord(item)) {
        return [];
      }

      const question = typeof item.question === "string" ? item.question.trim() : "";
      const answer = typeof item.answer === "string" ? item.answer.trim() : "";

      if (!question || !answer) {
        return [];
      }

      return [`${question} | ${answer}`];
    })
    .join("\n");
}

export function parseOpeningHoursList(value: string | null | undefined): OpeningHoursItem[] {
  return (value ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line) => {
      const [dayInput, ...timeParts] = line.split("|");
      const dayKey = normalizeOpeningHoursDayKey(dayInput?.trim());
      const time = timeParts.join("|").trim();

      if (!dayKey || !time) {
        return [];
      }

      return [{ day: dayKey, time }];
    });
}

export function formatOpeningHoursList(value: unknown) {
  if (!Array.isArray(value)) {
    return "";
  }

  const items = value.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }

    const day = typeof item.day === "string" ? item.day : "";
    const time = typeof item.time === "string"
      ? item.time.trim()
      : typeof item.open === "string" && typeof item.close === "string"
        ? `${item.open.trim()} - ${item.close.trim()}`
        : "";

    if (!day || !time) {
      return [];
    }

    return [{ day, time }];
  });

  const sortedItems = [...items].sort((left, right) => {
    const leftIndex = openingHoursDayOrder.indexOf(
      normalizeOpeningHoursDayKey(left.day) ?? "monday",
    );
    const rightIndex = openingHoursDayOrder.indexOf(
      normalizeOpeningHoursDayKey(right.day) ?? "monday",
    );

    return leftIndex - rightIndex;
  });

  return sortedItems
    .map((item) => `${getOpeningHoursDayLabel(item.day, "lt")} | ${item.time}`)
    .join("\n");
}
