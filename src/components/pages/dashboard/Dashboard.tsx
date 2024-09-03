import { SearchOutlined, SwapOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createNewCaseApi, getCasesApi, getCasesByLawyerApi, queryCasesByLawyerApi } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Role } from "../../../consts/consts";
import { updateCases, updateCurrentCaseId } from "../../../reducers/caseSlice";
import { QText } from "../../common/Fonts";
import { Loading } from "../../common/Loading";
import { NewApplicationIcon } from "../../icons/Dashboard";
import { CaseCard } from "./CaseCard";
import "./Dashboard.css";

export function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userId = useAppSelector(state => state.auth.userId);
  const isLawyer = useAppSelector(state => state.auth.isLawyer);
  const role = useAppSelector(state => state.auth.role);
  const allCases = useAppSelector(state => state.case.cases);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageBeforeSearch, setPageBeforeSearch] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);
  const [filteredCases, setFilteredCases] = useState(allCases);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"updatedAt" | "id" | "caseName">("updatedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { Option } = Select;

  const fetchAllCases = async () => {
    if (!accessToken || !userId) {
      console.error(`Access token ${accessToken} or user id ${userId} is missing`);
      message.error("Access token or user id is missing");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      let allCases;
      if (isLawyer) {
        const data = await getCasesByLawyerApi(userId!, 1, 1000, accessToken, role);
        allCases = data.cases;
      } else {
        const data = await getCasesApi(userId!, 1, 1000, accessToken, role);
        allCases = data.cases;
      }
      dispatch(updateCases(allCases));
      const filteredCases = applySearchAndFilter(allCases, searchQuery, sortOption, sortOrder);
      setFilteredCases(filteredCases);
      setTotalItems(filteredCases.length);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applySearchAndFilter = (cases, searchQuery, sortOption, sortOrder) => {
    if (!cases || cases.length === 0) {
      return [];
    }
    let filteredCases = cases.filter(
      c => c.caseName.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toString() === searchQuery,
    );

    filteredCases = filteredCases.sort((a, b) => {
      let result;
      if (sortOption === "updatedAt") {
        result = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      } else if (sortOption === "id") {
        result = b.id - a.id;
      } else {
        result = a.caseName.localeCompare(b.caseName);
      }
      return sortOrder === "asc" ? -result : result;
    });

    return filteredCases;
  };

  useEffect(() => {
    fetchAllCases();
  }, [accessToken, userId]);

  useEffect(() => {
    const filteredCases = applySearchAndFilter(allCases, searchQuery, sortOption, sortOrder);
    setFilteredCases(filteredCases);
    setTotalItems(filteredCases.length);
  }, [allCases, sortOption, sortOrder]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      const filteredCases = applySearchAndFilter(allCases, "", sortOption, sortOrder);
      setFilteredCases(filteredCases);
      setTotalItems(filteredCases.length);
      setCurrentPage(pageBeforeSearch);
    }
  };

  const handleClickSearch = (query: string) => {
    const filteredCases = applySearchAndFilter(allCases, query, sortOption, sortOrder);
    setFilteredCases(filteredCases);
    setTotalItems(filteredCases.length);
    setPageBeforeSearch(currentPage);
    setCurrentPage(1);
  };

  const handleSort = (sortBy: "updatedAt" | "id" | "caseName") => {
    setSortOption(sortBy);
    const filteredCases = applySearchAndFilter(allCases, searchQuery, sortBy, sortOrder);
    setFilteredCases(filteredCases);
    setTotalItems(filteredCases.length);
    setCurrentPage(1);
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
    const filteredCases = applySearchAndFilter(allCases, searchQuery, sortOption, sortOrder === "asc" ? "desc" : "asc");
    setFilteredCases(filteredCases);
    setTotalItems(filteredCases.length);
    setCurrentPage(1);
  };

  const CreateNewApplication = async () => {
    if (!accessToken || !userId) {
      console.error(`Access token ${accessToken} or user id ${userId} is missing`);
      return;
    }
    const caseId = await createNewCaseApi(accessToken, userId, "Asylum create reason", "AFFIRMATIVE", role);
    dispatch(updateCurrentCaseId(caseId));
    navigate("/case/" + caseId);
  };

  const CreateNewCaseForLawyer = async () => {
    if (!isLawyer) {
      console.error("Only lawyer can create case from this page.");
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

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCases = filteredCases?.slice(startIndex, endIndex);

  const innerContent =
    paginatedCases && paginatedCases.length > 0 ? (
      <div className="dashboard-panel has-application">
        {paginatedCases.map(c => (
          <CaseCard key={c.id} caseData={c} onDelete={() => fetchAllCases()} />
        ))}
      </div>
    ) : (
      <div className="dashboard-panel no-application">
        <NewApplicationIcon />
        <QText level="large">{t("Dashboard.FirstApplication")}</QText>
        <QText level="small" color="gray">
          {t("Dashboard.GreetingMessage")}
        </QText>
        <Button type="primary" onClick={role === Role.LAWYER ? CreateNewCaseForLawyer : CreateNewApplication}>
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
          onChange={handleSearchChange}
          onPressEnter={() => handleClickSearch(searchQuery)}
          placeholder={t("Dashboard.SearchByCaseNameOrCaseId")}
          prefix={<SearchOutlined />}
          className="dashboard-search-input"
        />
        <Button onClick={() => handleClickSearch(searchQuery)} className="dashboard-search-button">
          {t("Search")}
        </Button>
        <div className="dashboard-sort">
          <Select value={sortOption} onChange={handleSort} style={{ width: 200 }} variant="borderless">
            <Option value="updatedAt">Sort by Last Updated</Option>
            <Option value="id">Sort by Case ID</Option>
            <Option value="caseName">Sort by Case Name</Option>
          </Select>
          <SwapOutlined onClick={toggleSortOrder} rotate={90} className="dashboard-sort-toggle" />
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
          hideOnSinglePage={true}
        />
      </div>
    </div>
  );
}
