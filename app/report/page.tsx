"use client";
import React, { useEffect, useRef, useState } from "react";
import { Template } from "@pdfme/common";
import {
  text,
  image,
  barcodes,
  rectangle,
  tableBeta,
  line,
  multiVariableText,
  ellipse,
} from "@pdfme/schemas";
import { Designer } from "@pdfme/ui";
import reportSchema from "@/reportSchema.json";
import { generate } from "@pdfme/generator";
import { getFontsData } from "@/lib/utilis";

const fonts = [
  {
    url: "/font/Roboto-Light.ttf",
    fallback: true,
    label: "RobotoLight",
  },
  {
    url: "/font/Roboto-Regular.ttf",
    label: "RobotoRegular",
  },
  {
    url: "/font/Roboto-Medium.ttf",
    label: "RobotoMedium",
  },
  {
    url: "/font/Roboto-Bold.ttf",
    label: "RobotoBold",
  },
  {
    url: "/font/Roboto-Black.ttf",
    label: "RobotoExtraBold",
  },
];

const Page = () => {
  const designerRef = useRef<HTMLDivElement | null>(null);
  const designer = useRef<Designer | null>(null);
  const [templatePreset, setTemplatePreset] = useState<string>(
    localStorage.getItem("reportTemplate") || ""
  );

  const getInitialTemplate = (): Template => {
    const storedTemplate = localStorage.getItem("reportTemplate");
    if (storedTemplate) {
      try {
        const parsedTemplate = JSON.parse(storedTemplate) as Template;
        return parsedTemplate;
      } catch (error) {
        console.error("Failed to parse template from localStorage", error);
      }
    }
    return {
      basePdf: { width: 612, height: 1008, padding: [0, 0, 0, 0] },
      schemas: reportSchema,
    };
  };

  const template: Template = getInitialTemplate();

  useEffect(() => {
    getFontsData(fonts).then((font) => {
      if (designerRef.current) {
        designer.current = new Designer({
          domContainer: designerRef.current,
          template,
          plugins: {
            text,
            rectangle,
            tableBeta,
            line,
            multiVariableText,
            ellipse,
            image,
            qrcode: barcodes.qrcode,
          },
          options: { font },
        });

        designer.current.onSaveTemplate(onSaveTemplate);
        designer.current.onChangeTemplate(() => {
          setTemplatePreset("custom");
        });
      }
    });
  }, []); // Only runs once on mount

  const onSaveTemplate = (template?: Template) => {
    if (designer.current) {
      localStorage.setItem(
        "reportTemplate",
        JSON.stringify(template || designer.current.getTemplate())
      );
      alert("Saved!");
    }
  };
  const tableData = [
    ["item 1", "700"],
    ["item 2", "900"],
    ["item 3", "600"],
    ["item 4", "700"],
    ["item 5", "700"],
    ["item 6", "700"],
    ["item 7", "700"],
  ];
  const inputs = [
    {
      file_no: "4034-52",
      order_no: "dsls4-2ou",
      company_title: "Company Title",
      owner_name: "Hassan",
      address: "2938 Whitetail Lane , Dallas ,Texas",
      pracel_id: "1234567890",
      table: tableData,
      completed_by: "Hassan",
      compiled_date: "Fri Aug 16 2024",
    },
  ];
  const gennerate = () => {
    getFontsData(fonts).then((font) => {
      generate({
        template,
        inputs,
        plugins: {
          text,
          image,
          rectangle,
          tableBeta,
          line,
        },
        options: { font },
      }).then((pdf) => {
        console.log(pdf);

        // Browser
        const blob = new Blob([pdf.buffer], { type: "application/pdf" });
        window.open(URL.createObjectURL(blob));

        // Node.js
        // fs.writeFileSync(path.join(__dirname, test.pdf), pdf);
      });
    });
  };

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <button className="me-4 border" onClick={() => onSaveTemplate()}>
          Save Template
        </button>
        <button onClick={() => gennerate()}>Generate</button>
      </div>
      <div
        ref={designerRef}
        style={{ width: "100%", height: "calc(100vh - 64px)" }}
      ></div>
    </div>
  );
};

export default Page;
