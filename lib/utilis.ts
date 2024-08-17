import type { Font } from "@pdfme/common";

export type FontObj = {
  fallback?: boolean;
  label: string;
  url: string;
};

export const getFontsData = async (fontObjList: FontObj[]) => {
  const fontDataList = await Promise.all(
    fontObjList.map(async (font) => ({
      ...font,
      data: await fetch(font.url).then((res) => res.arrayBuffer()),
    }))
  );

  return fontDataList.reduce(
    (acc, font) => ({ ...acc, [font.label]: font }),
    {} as Font
  );
};
