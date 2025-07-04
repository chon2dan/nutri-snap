import { useI18n } from "@/app/i18n/i18n.client";

export function useTranslationWithDefault() {
  const t = useI18n() as (key: string) => string;

  return (key: string, fallback?: string): string => {
    try {
      const result = t(key);
      // 빈 문자열이거나 undefined/null일 경우 fallback 사용
      if (!result || result === key) {
        return fallback ?? key;
      }
      return result;
    } catch {
      return fallback ?? key;
    }
  };
}
