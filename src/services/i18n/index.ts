import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        discard: "discard",
        login: {
          sentence1: "First of all, connect using a service",
          sentence2:
            "Yes, this is like discord, but cheaper, what you gonna do",
          signInWithGoogle: "Continue with google",
          signInWithFacebook: "Continue with facebook",
          privacyAndTerms: "Privacy & terms",
          signOut: "Sign Out",
        },
        editor: {
          placeholder: "Write something",
        },
        channel: {
          select: "Select one user",
          create: "Create Channel",
        },
        messages: "Messages",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});
