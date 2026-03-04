<<<<<<< HEAD
'use client';

=======
>>>>>>> origin/main
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import { memo, type PropsWithChildren, useEffect, useState } from 'react';
import { isRtlLang } from 'rtl-detect';

import Editor from '@/layout/GlobalProvider/Editor';
import { createI18nNext } from '@/locales/create';
import { getAntdLocale } from '@/utils/locale';

const dayjsLocaleLoaders = import.meta.glob<{ default: ILocale }>(
<<<<<<< HEAD
  '/node_modules/dayjs/locale/{ar,bg,de,en,es,fa,fr,it,ja,ko,nl,pl,pt-br,ru,tr,vi,zh-cn,zh-tw}.js',
);

const updateDayjs = async (lang: string) => {
  const locale = lang.toLowerCase() === 'en-us' ? 'en' : lang.toLowerCase();
  const key = `/node_modules/dayjs/locale/${locale}.js`;
  const loader = dayjsLocaleLoaders[key] ?? dayjsLocaleLoaders['/node_modules/dayjs/locale/en.js'];

  try {
    const mod = await loader!();
    dayjs.locale(mod.default);
  } catch {
    console.warn(`dayjs locale for ${lang} not found, fallback to en`);
    const fallback = await dayjsLocaleLoaders['/node_modules/dayjs/locale/en.js']!();
=======
  '/node_modules/dayjs/esm/locale/{ar,bg,de,en,es,fa,fr,it,ja,ko,nl,pl,pt-br,ru,tr,vi,zh-cn,zh-tw}.js',
);

const dayjsLocaleAliases: Record<string, string> = {
  'en-us': 'en',
  'zh': 'zh-cn',
};

const updateDayjs = async (lang: string) => {
  const locale = dayjsLocaleAliases[lang.toLowerCase()] ?? lang.toLowerCase();
  const key = `/node_modules/dayjs/esm/locale/${locale}.js`;
  const loader =
    dayjsLocaleLoaders[key] ?? dayjsLocaleLoaders['/node_modules/dayjs/esm/locale/en.js'];

  try {
    const mod = await loader();

    dayjs.locale(mod.default);
  } catch (error) {
    console.error('error', error);
    console.error(`dayjs locale for ${lang} not found, fallback to en`);
    const fallback = await dayjsLocaleLoaders['/node_modules/dayjs/esm/locale/en.js']!();
>>>>>>> origin/main
    dayjs.locale(fallback.default);
  }
};

interface LocaleLayoutProps extends PropsWithChildren {
  antdLocale?: any;
  defaultLang?: string;
}

const Locale = memo<LocaleLayoutProps>(({ children, defaultLang, antdLocale }) => {
  const [i18n] = useState(() => createI18nNext(defaultLang));
  const [lang, setLang] = useState(defaultLang);
  const [locale, setLocale] = useState(antdLocale);

<<<<<<< HEAD
  if (!i18n.instance.isInitialized)
    i18n.init().then(async () => {
      if (!lang) return;
      await updateDayjs(lang);
=======
  // Set dayjs locale immediately on mount (don't wait for i18n init) to avoid
  // "a few seconds ago" showing in English when UI is already in Chinese
  useEffect(() => {
    if (defaultLang) updateDayjs(defaultLang);
  }, [defaultLang]);

  if (!i18n.instance.isInitialized)
    i18n.init().then(async () => {
      const resolvedLang = i18n.instance.language || defaultLang;
      if (resolvedLang) await updateDayjs(resolvedLang);
>>>>>>> origin/main
    });

  useEffect(() => {
    const handleLang = async (lng: string) => {
      setLang(lng);
<<<<<<< HEAD
      if (lang === lng) return;
=======
>>>>>>> origin/main
      const newLocale = await getAntdLocale(lng);
      setLocale(newLocale);
      await updateDayjs(lng);
    };

    i18n.instance.on('languageChanged', handleLang);
    return () => {
      i18n.instance.off('languageChanged', handleLang);
    };
<<<<<<< HEAD
  }, [i18n, lang]);
=======
  }, [i18n]);
>>>>>>> origin/main

  const documentDir = isRtlLang(lang!) ? 'rtl' : 'ltr';

  return (
    <ConfigProvider
      direction={documentDir}
      locale={locale}
      theme={{
        components: {
          Button: {
            contentFontSizeSM: 12,
          },
        },
      }}
    >
      <Editor>{children}</Editor>
    </ConfigProvider>
  );
});

Locale.displayName = 'Locale';

export default Locale;
