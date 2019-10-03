import { DangerZone } from 'expo';
import localizedStrings from '../../config/language';
import { SPANISH_LANGUAGE, ENGLISH_LANGUAGE } from '../constants/language';

const { Localization } = DangerZone;

export class LanguageHelper {
  static localeStore;

  static setLanguage(language) {
    const countryLanguage = getCountryLanguage(language.locales[0]);
    this.localeStore = new Localization.LocaleStore(localizedStrings);
    this.localeStore.setLocale(countryLanguage);
  }

  static getLanguage() {
    return this.localeStore;
  }
}

function getCountryLanguage(language) {
  let countryLanguage;
  if (language.includes(SPANISH_LANGUAGE)) {
    countryLanguage = 'es';
  } else if (language.includes(ENGLISH_LANGUAGE)) {
    countryLanguage = 'en';
  }
  return countryLanguage;
}
