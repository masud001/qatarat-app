import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: "Home",
      productCategories: "Product Categories",
      loading: "Loading...",
      failedToLoad: "Failed to load categories.",
      back: "Back",
      cart: "Cart",
      categories: {
       "المساجد مكة": "Makkah Mosques",
        "مساجد مكة الأكثر": "Most Popular Mosques in Makkah",
        "سقيا وإطعام الحرم": "Feeding and Watering in Haram",
      },
    },
  },
  ar: {
    translation: {
      home: "الصفحة الرئيسية",
      productCategories: "فئات المنتجات",
      loading: "جار التحميل...",
      failedToLoad: "فشل تحميل الفئات.",
      back: "رجوع",
      cart: "عربة التسوق",
      categories: {
        "Makkah Mosques": "المساجد مكة",
        "Most Popular Mosques in Makkah": "مساجد مكة الأكثر",
        "Feeding and Watering in Haram": "سقيا وإطعام الحرم",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
