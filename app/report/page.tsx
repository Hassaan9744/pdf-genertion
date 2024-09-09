"use client";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"; // Adjust the path as needed
import Report from "./report";

const InvoicePage = () => {
  const data = {
    order_number: "123sdad",
    public_work_comments: "asdasdzxczxczxczxczxczxczxczxc",
    taxes_paid: "yes",
    enforcement_issues: "yes",
    tax_paid_year: [
      {
        checked: true,
        label: "2022",
      },
      {
        label: "2023",
        checked: true,
      },
      {
        checked: false,
        label: "2024",
      },
    ],
    special_assessment: "yes",
    user_id: "LpCzpWZsTXbvY5mQzl5sdV1ffYI3",
    permitting_issues: "yes",
    services: [
      {
        checked: true,
        label: "water",
      },
      {
        checked: true,
        label: "water",
      },
      {
        checked: true,
        label: "water",
      },
      {
        checked: true,
        label: "water",
      },
      {
        checked: true,
        label: "water",
      },
      {
        label: "Sewer",
        checked: true,
      },
      {
        label: "Sewer",
        checked: true,
      },
      {
        label: "Sewer",
        checked: true,
      },
      {
        label: "Sewer",
        checked: true,
      },
      {
        label: "Sewer",
        checked: true,
      },
      {
        label: "Sewer",
        checked: true,
      },
      {
        label: "Sewer",
        checked: true,
      },
      {
        label: "vx",
        checked: true,
      },
      {
        label: "vx",
        checked: true,
      },
      {
        label: "vx",
        checked: true,
      },
    ],
    owner_names: "Raja Avila",
    address: "zxczxc@!@#",
    user_email: "shahzad@vx.com",
    taxe_comments: " zxczxczxczxczxczxczxczxczxczxc",
    due_amount: "23123",
    permitting_violations: "yes",
    customer_file: "hammad",
    company_title: "Alexander",
    taxes_color: "yes",
    report_date: {
      seconds: 1724958000,
      nanoseconds: 0,
    },
    permitting_comments: "asdasdzxczxczxczxczxczxczxczxc",
    enforcement_comments: "asdasdzxczxczxczxczxczxczxczxc",
    completed_by: "shahzad",
    utility_liens: "yes",
  };
  function createServiceString(services: any) {
    // Filter the services that are checked
    const checkedServices = services
      .filter((service: any) => service.checked)
      .map((service: any) => service.label);

    if (checkedServices.length === 0) return "N/A";

    // Join the labels into a single string with ", " and " & " before the last one
    if (checkedServices.length === 1) {
      return checkedServices[0];
    } else if (checkedServices.length === 2) {
      return checkedServices.join(" & ");
    } else {
      return (
        checkedServices.slice(0, -1).join(", ") +
        " & " +
        checkedServices.slice(-1)
      );
    }
  }
  const formattedServices = createServiceString(data.services);

  const reportData = {
    file_no: "4034-52",
    order_number: data.order_number,
    company_title: data.company_title,
    owner_name: data.owner_names,
    address: data.address,
    pracel_id: "1234567890",
    first_year_label: `${data.tax_paid_year[0].label}:`,
    second_year_label: `${data.tax_paid_year[1].label}:`,
    third_year_label: `${data.tax_paid_year[2].label}:`,
    first_year: `${data.tax_paid_year[0].checked ? "Paid" : "Not Paid"}`,
    second_year: `${data.tax_paid_year[1].checked ? "Paid" : "Not Paid"}`,
    third_year: `${data.tax_paid_year[2].checked ? "Paid" : "Not Paid"}`,
    tangible_tax_year: "2021",
    tangible_tax: "N/A",
    enforcement_issues: data.enforcement_issues.toUpperCase(),
    permitting_issues: data.permitting_issues.toUpperCase(),
    special_assessment: data.special_assessment.toUpperCase(),
    permitting_violations: data.permitting_violations.toUpperCase(),
    services: formattedServices.toUpperCase(),
    due_amount: data.due_amount.toUpperCase(),
    utility_liens: data.utility_liens.toUpperCase(),
    taxe_comments: data.taxe_comments,
    enforcement_comments: data.enforcement_comments,
    permitting_comments: data.permitting_comments,
    public_work_comments: data.public_work_comments,
    compiled_date: "2023-01-01",
    completed_by: data.completed_by,
  };

  const getDynamicFontSize = () => {
    const maxLength = 25; // Set a maximum character length before reducing font size
    const maxFontSize = 16;
    const text = "wwwww wwwww wwwww wwwww wwwww wwwww wwwww wwwww wwwww wwwww";
    const baseFontSize = maxFontSize;
    const length = text.length;
    console.log("text", text);
    console.log("length", length);
    if (length <= maxLength) return baseFontSize;
    const adjustedFontSize = Math.max(
      (maxLength / length) * baseFontSize,
      8 // Minimum font size
    );

    console.log("adjustedFontSize", adjustedFontSize);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div>
        <PDFDownloadLink
          document={<Report data={reportData} />}
          fileName="report.pdf"
          className="px-4 py-2 rounded-lg border bg-white font-medium"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download Report"
          }
        </PDFDownloadLink>
      </div>
      <div className="w-full h-[calc(100vh-4rem)]">
        <PDFViewer width={"100%"} height={"100%"}>
          <Report data={reportData} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default InvoicePage;
