import { I18n } from "i18n-js";
import content_en from "./en";
import content_ar from "./ar";
import content_fr from "./fr";

const languages = new I18n({
  en: content_en,
  ar: content_ar,
  fr: content_fr,
});
export default languages;
