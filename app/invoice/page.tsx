"use client";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Invoice from "./invoice"; // Adjust the path as needed

const InvoicePage = () => {
  const InvoiceData1 = {
    customer_file: "12345",
    orderNumber: "78910",
    companyName: "Your Company Name",
    address: "123 Street, City, Country",
    parcel_number: "PNC-12345",
    createdOn: "2024-08-24",
    sellerName: "John Doe",
    items: [
      { name: "Service 1", cost: "$100" },
      { name: "Service 2", cost: "$200" },
    ],
    totalCost: "$300",
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <PDFViewer width={"100%"} height={"100%"}>
        <Invoice data={InvoiceData1} />
      </PDFViewer>
      <PDFDownloadLink
        document={<Invoice data={InvoiceData1} />}
        fileName="invoice.pdf"
        className="px-4 py-2 rounded-lg border bg-white font-medium"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download Invoice"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default InvoicePage;
