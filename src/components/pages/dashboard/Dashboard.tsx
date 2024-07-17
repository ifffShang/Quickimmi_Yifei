import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Pagination, message, Input, Select } from "antd";
import { SwapOutlined, AppstoreTwoTone, UnorderedListOutlined, SearchOutlined} from "@ant-design/icons";
import { createNewCaseApi, getCasesApi, getCasesByLawyerApi } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateCases, updateCurrentCaseId } from "../../../reducers/caseSlice";
import { QText } from "../../common/Fonts";
import { Loading } from "../../common/Loading";
import { NewApplicationIcon } from "../../icons/Dashboard";
import { CaseCard } from "./CaseCard";
import "./Dashboard.css";
import { Role } from "../../../consts/consts";

export function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userId = useAppSelector(state => state.auth.userId);
  const isLawyer = useAppSelector(state => state.auth.isLawyer);
  const role = useAppSelector(state => state.auth.role);
  const cases = useAppSelector(state => state.case.cases);
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page") || "1");
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);
  const [filteredCases, setFilteredCases] = useState(cases);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'updatedAt' | 'caseId' | 'caseName'>('updatedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { Option } = Select;

  const getCases = async (page, pageSize) => {
    if (!accessToken || !userId) {
      console.error(`Access token ${accessToken} or user id ${userId} is missing`);
      message.error("Access token or user id is missing");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      let cases;
      let data;
      if (isLawyer) {
        data = await getCasesByLawyerApi(userId!, page, pageSize, accessToken, role);
        cases = data.cases;
        setTotalItems(data.metadata.totalItems);
      } else {
        data = await getCasesApi(userId!, page, pageSize, accessToken, role);
        cases = data.cases;
        setTotalItems(data.metadata.totalItems);
      }
      dispatch(updateCases(cases));

      // Apply search and filter to the fetched cases
      const filteredCases = applySearchAndFilter(cases, searchQuery, sortOption, sortOrder);
      setFilteredCases(filteredCases);

      if (cases.length === 0 && page > 1) {
        setCurrentPage(prevPage => prevPage - 1);
        navigate({ search: `?page=${page - 1}` });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applySearchAndFilter = (cases, searchQuery, sortOption, sortOrder) => {
    let filteredCases = cases.filter(
      (c) => c.caseName.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toString() === searchQuery
    );

    filteredCases = filteredCases.sort((a, b) => {
      let result;
      if (sortOption === "updatedAt") {
        result = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      } else if (sortOption === "caseId") {
        result = b.id - a.id;
      } else {
        result = a.caseName.localeCompare(b.caseName);
      }
      return sortOrder === 'asc' ? -result : result;
    });

    return filteredCases;
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get("page") || "1");
    setCurrentPage(page);
    getCases(page, pageSize);
  }, [accessToken, userId, currentPage, location.search]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    const query = new URLSearchParams(location.search);
    query.set("page", page.toString());
    navigate({ search: query.toString() });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredCases = applySearchAndFilter(cases, query, sortOption, sortOrder);
    setFilteredCases(filteredCases);
  };

  const handleSort = (sortBy: "updatedAt" | "caseId" | "caseName") => {
    setSortOption(sortBy);
    const filteredCases = applySearchAndFilter(cases, searchQuery, sortBy, sortOrder);
    setFilteredCases(filteredCases);
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    const filteredCases = applySearchAndFilter(cases, searchQuery, sortOption, sortOrder === 'asc' ? 'desc' : 'asc');
    setFilteredCases(filteredCases);
  };

  // Create new applications for Customers
  const CreateNewApplication = async () => {
    if (!accessToken || !userId) {
      console.error(`Access token ${accessToken} or user id ${userId} is missing`);
      return;
    }
    const caseId = await createNewCaseApi(accessToken, userId, "Asylum create reason", "AFFIRMATIVE", role);
    dispatch(updateCurrentCaseId(caseId));
    navigate("/case/" + caseId);
  };

  // Create new cases for Lawyers
  const CreateNewCaseForLawyer = async () => {
    if (!isLawyer) {
      console.error("Only lawyer can create case from this page.");
      // TODO: pop up error message
      return;
    }
    if (!accessToken || !userId) {
      console.error(`Access token ${accessToken} or lawyer id ${userId} is missing`);
      return;
    }
    navigate("/lawyerNewCase");
  };

  if (loading) {
    return <Loading />;
  }

  const innerContent =
    filteredCases && filteredCases.length > 0 ? (
      <div className="dashboard-panel has-application">
        {filteredCases.map(c => (
          <CaseCard key={c.id} caseData={c} onDelete={() => getCases(currentPage, pageSize)} />
        ))}
      </div>
    ) : (
      <div className="dashboard-panel no-application">
        <NewApplicationIcon />
        <QText level="large">{t("Dashboard.FirstApplication")}</QText>
        <QText level="small" color="gray">
          {t("Dashboard.GreetingMessage")}
        </QText>
        <Button type="primary" onClick={role === Role.LAWYER ? CreateNewCaseForLawyer : CreateNewApplication }>
          {t("Dashboard.CreateNewApplication")}
        </Button>
      </div>
    );
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>
          <QText level="large">{t("Dashboard.Dashboard")}</QText>
        </h2>
        {role === Role.LAWYER ? (
          <Button type="primary" onClick={CreateNewCaseForLawyer}>
            {t("Dashboard.CreateNewApplication")}
          </Button>
        ) : (
          <Button type="primary" onClick={CreateNewApplication}>
            {t("Dashboard.CreateNewApplication")}
          </Button>
        )}
      </div>

      <div className="dashboard-toolbar">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by case name or case ID"
          prefix={<SearchOutlined />}
          className="dashboard-search-input"
        />
        <Button onClick={() => handleSearch(searchQuery)} className="dashboard-search-button">{t("Search")}</Button>
        {/* <AppstoreTwoTone className="dashboard-view-toggle" twoToneColor="#27AE60"/> */}
        <div className="dashboard-sort">
          <Select value={sortOption} onChange={handleSort} style={{ width: 200 }} variant="borderless">
            <Option value="updatedAt">Sort by Last Updated</Option>
            <Option value="caseId">Sort by Case ID</Option>
            <Option value="caseName">Sort by Case Name</Option>
          </Select>
          <SwapOutlined onClick={toggleSortOrder} rotate={90} className="dashboard-sort-toggle"/>
        </div>
      </div>

      {innerContent}

      <div className="pagination-container">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalItems}
          showTotal={total => `Total ${total} items`}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
