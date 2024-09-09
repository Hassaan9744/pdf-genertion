import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register fonts with react-pdf
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

// Register the fonts
fonts.forEach((font) => {
  Font.register({
    family: font.label,
    src: font.url,
    fallback: font.fallback,
  });
});

// Styles for the PDF document
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 12,
    width: "100%",
  },
  invoiceTitle: {
    fontSize: 36,
    fontFamily: "RobotoBold",
    marginTop: "auto",
    flex: 1,
    textAlign: "right",
  },
  customerInfo: {
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "right",
    fontFamily: "RobotoRegular",
    gap: 4,
    paddingHorizontal: 12,
    width: "220px",
  },
  textHeader: {
    fontSize: 24,
    color: "white",
    backgroundColor: "black",
    textAlign: "center",
    paddingVertical: 8,
    width: "100%",
    fontFamily: "RobotoBold",
  },
  companyAddress: {
    width: "100%",
    height: 112,
    borderBottomWidth: 4,
    borderColor: "black",
    flexDirection: "row",
    padding: 12,
  },
  companyTitle: {
    width: "50%",
    height: "100%",
    borderRightWidth: 4,
    borderColor: "gray",
    fontSize: 20,
    fontFamily: "RobotoMedium",
  },
  addressText: {
    width: "50%",
    height: "100%",
    paddingLeft: 8,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    fontFamily: "RobotoMedium", // Using the RobotoLight font
    color: "#777",
  },
  researchedProperty: {
    fontSize: 18,
    color: "gray",
    fontFamily: "RobotoMedium",
  },
  table: {
    width: "80%",
    marginHorizontal: "auto",
    marginTop: 40,
  },
  tableHeader: {
    borderWidth: 1,
    paddingVertical: 12,
    fontSize: 16,
    width: "50%",
    textAlign: "center",
    fontFamily: "RobotoBold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "black",
    borderWidth: 1,
    fontFamily: "RobotoMedium",
  },
  tableCell: {
    width: "50%",
    paddingVertical: 8,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "RobotoRegular",
    borderWidth: 1,
    borderColor: "black",
  },
  totalRow: {
    backgroundColor: "black",
    color: "white",
    fontFamily: "RobotoBold",
  },
  footer: {
    height: 50,
    marginTop: "auto",
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    color: "white",
    fontSize: 16,
    fontFamily: "RobotoBold",
  },
});

const Invoice = ({ data }: { data: any }) => (
  <Document>
    <Page size="LEGAL" style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image src="/logo.png" style={{ width: 80, height: 80 }} />
        <Text style={styles.invoiceTitle}> INVOICE</Text>
        <View style={styles.customerInfo}>
          <Text style={{ fontSize: 12, fontFamily: "RobotoMedium" }}>
            Customer File: {data.customer_file}
          </Text>
          <Text style={{ fontSize: 12, fontFamily: "RobotoMedium" }}>
            Order no: {data.orderNumber}
          </Text>
        </View>
      </View>

      {/* Headline */}
      <Text style={styles.textHeader}>Municipal Lien Search</Text>

      {/* Company Title and Address */}
      <View style={styles.companyAddress}>
        <Text style={styles.companyTitle}>{data.companyName}</Text>
        <Text style={styles.addressText}>{data.address}</Text>
      </View>

      {/* Researched Property */}
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "column",
            width: "50%",
            padding: 12,
            gap: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontFamily: "RobotoBold" }}>
            RESEARCHED PROPERTY
          </Text>
          <View>
            <Text style={styles.researchedProperty}>Address</Text>
          </View>

          <View style={{ flexDirection: "row", gap: 8 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "RobotoMedium",
                color: "gray",
              }}
            >
              PNC:
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "RobotoMedium",
                color: "gray",
              }}
            >
              {data.parcel_number}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-end",
            width: "50%",
            padding: 12,
            gap: 4,
          }}
        >
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "RobotoMedium",
                color: "gray",
              }}
            >
              Created on:
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "RobotoMedium",
                color: "gray",
              }}
            >
              {data.createdOn}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "RobotoMedium",
                color: "gray",
              }}
            >
              Seller:
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "RobotoMedium",
                color: "gray",
              }}
            >
              {data.sellerName}
            </Text>
          </View>
        </View>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Item</Text>
          <Text style={styles.tableHeader}>Cost</Text>
        </View>
        {data.items.map((item: any, index: number) => (
          <View key={index} style={styles.tableRow} wrap>
            <Text style={styles.tableCell} wrap>
              {item.name}
            </Text>
            <Text style={styles.tableCell} wrap>
              {item.cost}
            </Text>
          </View>
        ))}
        <View style={[styles.tableRow, styles.totalRow]}>
          <Text style={styles.tableCell}>Total</Text>
          <Text style={styles.tableCell}>{data.totalCost}</Text>
        </View>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <Text>954-296-1953</Text>
        <Text>admin@lieneagle.com</Text>
      </View>
    </Page>
  </Document>
);

export default Invoice;
