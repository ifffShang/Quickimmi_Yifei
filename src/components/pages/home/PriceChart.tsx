import { Col, Row } from "antd";
import { TextBlock } from "./Common";
import { v4 as uuidv4 } from "uuid";
import "./PriceChart.css";
import { useTranslation } from "react-i18next";
import { Selected } from "../../icons/Selected";
import { PriceApplicant, PriceLaywer, RoundCheck } from "../../icons/PriceArea";
import { QText } from "../../common/Fonts";

enum PriceTitle {
  PriceLevel = "PT_PriceLevel",
  Price = "PT_Price",
}

interface PriceRow {
  name: string;
  isTitle?: boolean;
  isHeader?: boolean;
  values?: string[];
}

interface PriceChartProps {
  rows: PriceRow[];
}

export function PriceChart() {
  const { t } = useTranslation();

  const rows: PriceRow[] = [
    {
      name: PriceTitle.PriceLevel,
      isTitle: true,
      values: ["Free", "Plus", "Prime"],
    },
    {
      name: PriceTitle.Price,
      isTitle: true,
      values: ["$0", "$900", "$9800"],
    },
    {
      name: "Ask AI",
      isHeader: true,
    },
    {
      name: "Ask AI",
      values: ["xxx", "xxxx", "xxxxx"],
    },
    {
      name: "Record case details",
      values: ["-", "SelectIcon", "SelectIcon"],
    },
    {
      name: "ask every time",
      values: ["SelectIcon", "SelectIcon", "SelectIcon"],
    },
    {
      name: "xxxx",
      values: ["-", "SelectIcon", "SelectIcon"],
    },
    {
      name: "Submission Service",
      isHeader: true,
    },
    {
      name: "Ask AI",
      values: ["xxx", "xxxx", "xxxxx"],
    },
    {
      name: "Record case details",
      values: ["-", "SelectIcon", "SelectIcon"],
    },
    {
      name: "ask every time",
      values: ["SelectIcon", "SelectIcon", "SelectIcon"],
    },
    {
      name: "xxxx",
      values: ["-", "SelectIcon", "SelectIcon"],
    },
  ];

  return (
    <div className="price-chart">
      <TextBlock
        title={t("LandingPage.AffordableGoodService")}
        titleLevel="h2"
        description={t("LandingPage.AffordableDescription")}
        align="center"
      />
      <div className="price-areas">
        <PriceBox
          title={t("LandingPage.Lawyer")}
          description={[
            t("LandingPage.StableCustomers"),
            t("LandingPage.FastCheckout"),
            t("LandingPage.CheapServiceFee"),
            t("LandingPage.StripeIntegration"),
          ]}
          icon={<PriceLaywer />}
        />
        <PriceBox
          title={t("LandingPage.Applicant")}
          description={[
            t("LandingPage.VerifiedLawyers"),
            t("LandingPage.StripeIntegration"),
            t("LandingPage.MultipleWayToPay"),
            t("LandingPage.RefundableBeforeService"),
          ]}
          icon={<PriceApplicant />}
        />
      </div>
      {/* <div className="price-chart-detail">
        <PriceRow rows={rows} />
      </div> */}
    </div>
  );
}

export interface PriceBoxProps {
  title: string;
  description: string[];
  icon: React.ReactNode;
}

function PriceBox(props: PriceBoxProps) {
  return (
    <div className="price-area">
      <div className="price-area-icon">{props.icon}</div>
      <QText level="large">{props.title}</QText>
      <div className="price-area-description">
        {props.description.map((desc, index) => (
          <div className="price-area-description-item" key={index}>
            <RoundCheck />
            <QText level="small" color="gray">
              {desc}
            </QText>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriceRow({ rows }: PriceChartProps) {
  if (!rows) {
    return null;
  }
  return (
    <>
      {rows.map(row => (
        <Row gutter={16} key={uuidv4()}>
          <PriceRowTitle {...row} />
          {row.values?.map(value => (
            <PriceRowValue key={uuidv4()} value={value} name={row.name} isTitle={row.isTitle || false} />
          ))}
        </Row>
      ))}
    </>
  );
}

function PriceRowTitle(row: PriceRow) {
  const span = 3;
  if (row.isTitle) {
    return <Col className="gutter-row name title" span={span} key={uuidv4()} />;
  }
  if (row.isHeader) {
    return (
      <Col className="gutter-row name header" span={24} key={uuidv4()}>
        <div>{row.name}</div>
      </Col>
    );
  }
  return (
    <Col className="gutter-row name" span={span} key={uuidv4()}>
      <div>{row.name}</div>
    </Col>
  );
}

function PriceRowValue({ name, isTitle, value }: { name: string; isTitle: boolean; value: string }) {
  const span = 7;
  if (isTitle && name === PriceTitle.PriceLevel) {
    return (
      <Col className="gutter-row price-level" span={span} key={uuidv4()}>
        <div>{value}</div>
      </Col>
    );
  } else if (isTitle && name === PriceTitle.Price) {
    return (
      <Col className="gutter-row price" span={span} key={uuidv4()}>
        <div>{value}</div>
      </Col>
    );
  } else if (value === "SelectIcon") {
    return (
      <Col className="gutter-row" span={span} key={uuidv4()}>
        <Selected />
      </Col>
    );
  } else {
    return (
      <Col className="gutter-row" span={span} key={uuidv4()}>
        <div>{value}</div>
      </Col>
    );
  }
}
