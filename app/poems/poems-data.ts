import theIllusionOfTwo from "@/content/poems/the-illusion-of-two.md?raw";
import justYou from "@/content/poems/just-you.md?raw";
import tumkoDekhunTo from "@/content/poems/tumko-dekhun-to.md?raw";
import nazdikiyonKiDoori from "@/content/poems/nazdikiyon-ki-doori.md?raw";
import usPateParKoiNahinTha from "@/content/poems/us-pate-par-koi-nahin-tha.md?raw";
import mainThamaThaSadiyonSe from "@/content/poems/main-thama-tha-sadiyon-se.md?raw";
import tumEkSampoornaSansarHo from "@/content/poems/tum-ek-sampoorna-sansar-ho.md?raw";
import rangBhiRangviheenHain from "@/content/poems/rang-bhi-rangviheen-hain.md?raw";
import aankhenJoSwayamKoNahinDekhtin from "@/content/poems/aankhen-jo-swayam-ko-nahin-dekhtin.md?raw";
import premJahanAntHiAarambhHai from "@/content/poems/prem-jahan-ant-hi-aarambh-hai.md?raw";

export type Poem = {
  slug: string;
  title: string;
  language: "en" | "hi";
  excerpt: string;
  body: string;
  firstParagraphIsSubtitle?: boolean;
};

export const poems: readonly Poem[] = [
  {
    slug: "the-illusion-of-two",
    title: "The Illusion of Two",
    language: "en",
    excerpt: "Why do we have two pairs of eyes and not one, when yours are searching for yourself…",
    body: theIllusionOfTwo,
  },
  {
    slug: "just-you",
    title: "JUST YOU",
    language: "en",
    excerpt: "Her, because I want to dissolve my emptiness.",
    body: justYou,
  },
  {
    slug: "tumko-dekhun-to",
    title: "तुमको देखूँ तो",
    language: "hi",
    excerpt: "तुमको देखूँ तो फूल-सा बिखर जाता हूँ, तुम्हारी एक झलक में ही निखर जाता हूँ।",
    body: tumkoDekhunTo,
  },
  {
    slug: "nazdikiyon-ki-doori",
    title: "नज़दीकियों की दूरी",
    language: "hi",
    excerpt: "मैं जितना दरमियाँ का फ़ासला मिटाता गया, तुम्हें उतना ही खुद से दूर पाता गया।",
    body: nazdikiyonKiDoori,
  },
  {
    slug: "us-pate-par-koi-nahin-tha",
    title: "उस पते पर कोई नहीं था",
    language: "hi",
    excerpt: "तुमने मुझे अपना पता बताया, मैंने दिल को राह बनाया।",
    body: usPateParKoiNahinTha,
  },
  {
    slug: "main-thama-tha-sadiyon-se",
    title: "मैं थमा था सदियों से",
    language: "hi",
    excerpt: "मैं थमा था सदियों से, तुमने दौड़ना सिखाया…",
    body: mainThamaThaSadiyonSe,
  },
  {
    slug: "tum-ek-sampoorna-sansar-ho",
    title: "तुम एक सम्पूर्ण संसार हो",
    language: "hi",
    excerpt: "सदियों से तुम्हारे कदमों के आगे रीतियों की दीवारें खड़ी की गईं…",
    body: tumEkSampoornaSansarHo,
  },
  {
    slug: "rang-bhi-rangviheen-hain",
    title: "रंग भी रंगविहीन हैं",
    language: "hi",
    excerpt: "रंग भी रंगहीन हैं — सबके अपने रंग हैं, सबके सच्चे ढंग हैं…",
    body: rangBhiRangviheenHain,
  },
  {
    slug: "aankhen-jo-swayam-ko-nahin-dekhtin",
    title: "आँखें जो स्वयं को नहीं देखतीं",
    language: "hi",
    excerpt: "क्या करूँगा इन आँखों का जो संसार को तो देखती हैं…",
    body: aankhenJoSwayamKoNahinDekhtin,
  },
  {
    slug: "prem-jahan-ant-hi-aarambh-hai",
    title: "प्रेम - जहाँ अंत ही आरंभ है।",
    language: "hi",
    excerpt: "प्रेम - जहाँ ‘मैं’ समाप्त होता है।",
    body: premJahanAntHiAarambhHai,
    firstParagraphIsSubtitle: true,
  },
] as const;

export const featuredPoem = poems[4];

export function getPoem(slug: string) {
  return poems.find((poem) => poem.slug === slug);
}
