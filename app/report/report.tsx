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
    fallback: font.fallback || false, // Ensure fallback is defined
  });
});

// Define styles based on the schema
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 12,
  },
  invoiceTitle: {
    fontSize: 20,
    fontFamily: "RobotoBold",
    width: "250px",
    border: "2px solid black",
    textAlign: "right",
  },
  customerInfo: {
    flexDirection: "column",
    fontFamily: "RobotoRegular",
    paddingHorizontal: 4,
    gap: 4,
    width: "220px",
  },
  textHeader: {
    fontSize: 28,
    marginTop: 10,
    color: "white",
    backgroundColor: "black",
    textAlign: "center",
    paddingVertical: 8,
    width: "100%",
    fontFamily: "RobotoExtraBold",
  },
  reportContainer: {
    width: "80%",
    marginHorizontal: "auto",
    padding: 12,
    border: 1,
    textOverflow: "ellipsis",
  },
  reportCategoryDiv: {
    minWidth: "25%",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 4,
    borderRightColor: "#777",
  },
  reportCategoryText: {
    color: "#008000",
    fontSize: 20,
    fontFamily: "RobotoBold",
  },
  reportContentDiv: {
    minWidth: "70%",
    paddingLeft: 16,
    maxWidth: "300px",
    rowGap: 4,
  },
  reportRow: {
    maxWidth: "300px",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    fontFamily: "RobotoRegular",

    // flex: 1,
  },
  value: {
    fontSize: 14,
    maxWidth: "250px",
    fontFamily: "RobotoMedium",
  },
  noteValue: {
    fontSize: 12,
    fontFamily: "RobotoMedium",
    color: "#555",
  },
  noteLabel: {
    fontSize: 12,
    fontFamily: "RobotoMedium",
    color: "#555",
    maxWidth: "300px",
  },
  footer: {
    height: 50,
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

// Create the PDF Document component
const Report = ({ data }: { data: any }) => {
  const getFontSize = () => {
    const baseFontSize = 16;
    const threshold = 55;
    const reductionStep = 15;
    const reductionAmount = 2;
    const str = data.services;
    if (str.length <= threshold) {
      return baseFontSize;
    }

    const extraChars = str.length - threshold;
    const reductionSteps = Math.floor(extraChars / reductionStep);

    return (baseFontSize - reductionSteps * reductionAmount) as number;
  };
  const adjustedFontSize = getFontSize();
  return (
    <Document>
      <Page size="LEGAL" style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <View style={styles.customerInfo} wrap>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "RobotoMedium",
                }}
              >
                Customer File: {data.file_no}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={{ fontSize: 12, fontFamily: "RobotoMedium" }}>
                Order no: {data.order_number}
              </Text>
            </View>
          </View>
          <Image
            src="/logo.png"
            style={{
              width: 80,
              height: 80,
              borderRadius: 12,
              marginTop: "auto",
              border: "4px solid black",
            }}
          />
          <Text style={styles.invoiceTitle} wrap>
            {data.company_title}
          </Text>
        </View>
        {/* Headline */}
        <Text style={styles.textHeader}> Municipal Lien Search Report</Text>
        {/* owner's Information */}
        <View
          style={[
            {
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#777",
              height: "150px",
              marginTop: 20,
            },
            styles.reportContainer,
          ]}
        >
          <Text style={{ fontSize: 20, fontFamily: "RobotoRegular" }}>
            {data.address}
          </Text>
          <View>
            <Text
              style={{
                fontFamily: "RobotoMedium",
                color: "black",
                fontSize: 20,
              }}
            >
              Owner(s): {data.owner_name}
            </Text>
            <Text
              style={{
                fontFamily: "RobotoMedium",
                color: "black",
                fontSize: 20,
              }}
            >
              Parcel id: {data.pracel_id}
            </Text>
          </View>
        </View>

        {/* Report Details */}
        {/* taxes */}
        <View
          style={[
            { flexDirection: "row", maxHeight: "150px" },
            styles.reportContainer,
          ]}
        >
          <View style={[{ flexDirection: "row" }, styles.reportCategoryDiv]}>
            <Image
              src={"/done-icon.png"}
              style={{
                width: 24,
                height: 24,
                marginRight: 8,
                borderRadius: 12,
              }}
            />
            <Text style={styles.reportCategoryText}>Taxes</Text>
          </View>
          <View style={styles.reportContentDiv} wrap>
            <Text style={styles.value}>
              {data.first_year_label} {data.first_year}
            </Text>
            <Text style={styles.value}>
              {data.second_year_label} {data.second_year}
            </Text>
            <Text style={styles.value}>
              {data.third_year_label} {data.third_year}
            </Text>
            <Text style={styles.value}>
              Tangible Taxes owed prior to {data.tangible_tax_year}?:{" "}
              {data.tangible_tax}
            </Text>
            <Text style={styles.value}>Tangible Taxes: N/A</Text>

            <Text style={styles.noteLabel}>
              Note: wwwww wwwww wwwww wwwww wwwww wwwww wwwww wwwww wwwww wwwww
            </Text>
          </View>
        </View>
        {/* special assessments */}
        <View
          style={[
            { flexDirection: "row", maxHeight: "100px" },
            styles.reportContainer,
          ]}
        >
          <View style={[{ flexDirection: "column" }, styles.reportCategoryDiv]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                src={"/done-icon.png"}
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 8,
                  borderRadius: 12,
                }}
              />
              <Text style={styles.reportCategoryText}>Special</Text>
            </View>
            <Text style={[styles.reportCategoryText, { marginTop: 4 }]}>
              Assessments
            </Text>
          </View>
          <View style={styles.reportContentDiv} wrap>
            <Text style={styles.value}>
              Fee Outstanding: {data.special_assessment}
            </Text>
            <Text style={styles.noteLabel}>
              Note: wwwww wwwww wwwww wwwww wwwww wwwww wwwww wwwww wwwww wwwww
            </Text>
          </View>
        </View>

        {/* code enforcement */}
        <View
          style={[
            { flexDirection: "row", maxHeight: "100px" },
            styles.reportContainer,
          ]}
        >
          <View style={[{ flexDirection: "column" }, styles.reportCategoryDiv]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                src={"/done-icon.png"}
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 8,
                  borderRadius: 12,
                }}
              />
              <Text style={styles.reportCategoryText}>Code</Text>
            </View>
            <Text style={[styles.reportCategoryText, { marginTop: 4 }]}>
              Enforcement
            </Text>
          </View>
          <View style={styles.reportContentDiv} wrap>
            <Text style={styles.value}>
              Code Issue: {data.enforcement_issues}
            </Text>

            <Text style={styles.noteLabel}>
              Note: wwwww wwwww wwwww wwwww wwwww wwwww wwwww wwwww wwwww wwwww
            </Text>
          </View>
        </View>
        {/* permittimg */}
        <View
          style={[
            { flexDirection: "row", maxHeight: "100px" },
            styles.reportContainer,
          ]}
        >
          <View style={[{ flexDirection: "row" }, styles.reportCategoryDiv]}>
            <Image
              src={"/done-icon.png"}
              style={{
                width: 24,
                height: 24,
                marginRight: 8,
                borderRadius: 12,
              }}
            />
            <Text style={styles.reportCategoryText}>Permitting</Text>
          </View>
          <View style={[{ maxWidth: "300px" }, styles.reportContentDiv]} wrap>
            <Text style={styles.value}>
              Permit Issues: {data.permitting_issues}
            </Text>
            <Text style={styles.value}>
              Building Code Violatin: {data.permitting_violations}
            </Text>
            <Text style={styles.noteLabel}>
              Note: wwwww wwwww wwwww wwwww wwwww wwwww wwwww wwwww wwwww wwwww
            </Text>
          </View>
        </View>
        {/* public works */}
        <View
          style={[
            {
              flexDirection: "row",
              maxHeight: "200px",
              border: "2px solid black",
            },
            styles.reportContainer,
          ]}
        >
          <View style={[{ flexDirection: "column" }, styles.reportCategoryDiv]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                src={"/done-icon.png"}
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 8,
                  borderRadius: 12,
                }}
              />
              <Text style={styles.reportCategoryText}>Public </Text>
            </View>
            <Text style={[styles.reportCategoryText, { marginTop: 4 }]}>
              Works
            </Text>
          </View>
          <View style={styles.reportContentDiv} wrap>
            <View
              style={{
                flexDirection: "column",
                width: "300px",
                maxHeight: "150px",
                fontSize: adjustedFontSize,
                fontFamily: "RobotoMedium",
                rowGap: 4,
              }}
              wrap
            >
              <Text>Services: {data.services}</Text>
              <Text>Amount Due: Yes</Text>
              <Text>Utility Liens: Yes</Text>
              <Text style={styles.noteValue}>
                Note: wwwww wwwww wwwww wwwww wwwww wwwww wwwww wwwww wwwww
                wwwww
              </Text>
            </View>
          </View>
        </View>
        {/* footer */}
        <View
          style={{
            marginTop: "auto",
            padding: 4,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.label}>Completed By: </Text>
            <Text
              style={{
                flexDirection: "row",
                fontFamily: "RobotoBold",
                fontSize: 16,
              }}
            >
              {data.completed_by}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.label}>Report compiled on: </Text>
            <Text
              style={{
                flexDirection: "row",
                fontFamily: "RobotoBold",
                fontSize: 16,
              }}
            >
              {data.compiled_date}
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text>admin@lieneagle.com</Text>
          <Text>954-296-1953</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Report;
