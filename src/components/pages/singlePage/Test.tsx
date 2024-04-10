import { useState} from 'react';
import { LeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { QText } from "../../common/Fonts";
import { QLink } from "../../common/Links";
import { Loading } from "../../common/Loading";

import "./SinglePageView.css";
import { TermsOfService } from "./TermsOfService";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { ContactUs } from "./ContactUs";



export function TestPageView() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true); // Add this line
  
    return (
      <div>
        {isLoading && <Loading text="Loading..." />}
      </div>
    );
  }