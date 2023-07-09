import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { Button } from "reactstrap";
import axios from "axios";
import {
  SearchOutlined,
  DownloadOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Image,
  Badge,
  Avatar,
  Space,
  Button,
  Divider,
  List,
  Typography,
  Col,
  Row,
  Tooltip,
} from "antd";
import { Container } from "reactstrap";
const { Header, Content, Footer } = Layout;

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [location, setLocation] = useState("");
  const [offset, setOffset] = useState(0);

  // Get YELP API from Serverless node js in vercel
  const API_URL = "https://node-api-vercel-blond.vercel.app/businesses";

  const fetchData = async (req, res) => {
    try {
      const response = await axios.get(API_URL);
      setBusinesses(response.data.businesses);
      console.log("====================================");
      console.log(response);
      console.log("====================================");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setOffset(0);
    fetchData();
  };

  const handleFilter = (e) => {
    setFilterTerm(e.target.value);
    setOffset(0);
    fetchData();
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handlePagination = (increment) => {
    const newOffset = offset + increment;
    if (newOffset >= 0) {
      setOffset(newOffset);
    }
  };
  const contentStyle = {
    backgroundColor: "#108ee9",
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [size, setSize] = useState("medium");
  return (
    <div>
      <Layout>
        <Container>
          <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand">
                <h1 style={{ display: "flex", justifyContent: "flex-start" }}>
                  List Business
                </h1>
                <h6 style={{ display: "flex", justifyContent: "flex-start" }}>
                  List Business From YELP API
                </h6>
              </a>
              <form className="form" onSubmit={handleSearch}>
                <select
                  value={filterTerm}
                  style={{ marginRight: "0.5rem" }}
                  onChange={handleFilter}
                >
                  <option value="">Semua Kategori</option>
                  <option value="restaurants">Restoran</option>
                  <option value="coffee">Kafe</option>
                  <option value="bars">Bar</option>
                </select>
                <input
                  type="text"
                  placeholder="Cari bisnis"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ marginRight: "0.5rem" }}
                />
                <input
                  type="text"
                  placeholder="Lokasi"
                  value={location}
                  onChange={handleLocationChange}
                />
                <Tooltip title="search">
                  <Button
                    type="primary"
                    shape="square"
                    icon={<SearchOutlined />}
                    style={{ marginRight: "0.5rem" }}
                  />
                </Tooltip>
                <Button type="primary" icon={<SendOutlined />} size={size}>
                  Apply filter
                </Button>
              </form>
            </div>
          </nav>
        </Container>
      </Layout>

      <Container>
        <List
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
          itemLayout="horizontal"
          dataSource={businesses}
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 8,
          }}
          renderItem={(item, index) => (
            <List.Item
              extra={
                <img
                  className="responsiveIMG"
                  src={item.image_url}
                  alt={item.name}
                  key={index}
                />
              }
            >
              <List.Item.Meta
                title={<Link to={`/business/${item.id}`}>{item.name}</Link>}
                description={item.location.address1}
                style={{ alignItems: "flex-start" }}
              />
            </List.Item>
          )}
        />
      </Container>
    </div>
  );
};

export default BusinessList;
