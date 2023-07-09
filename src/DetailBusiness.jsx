import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button, Carousel, Col, Row, Card } from "antd";
import axios from "axios";
import {
  SearchOutlined,
  DownloadOutlined,
  SendOutlined,
} from "@ant-design/icons";

const BusinessDetail = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);

  const API_URL = "https://node-api-vercel-blond.vercel.app/businesses/";

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}${id}`);
      setBusiness(response.data);
      console.log("====================================");
      console.log(response);
      console.log("====================================");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!business) {
    return <div>Loading...</div>;
  }

  const { name, photos, rating, coordinates, review_count, location } =
    business;

  return (
    <div>
      <Row style={{ marginTop: "2rem" }}>
        <Col span={15}>
          <Card>
            <Carousel autoplay>
              {photos.map((photo) => (
                <div key={id}>
                  <img
                    src={photo}
                    alt={name}
                    key={photo}
                    style={{ maxHeight: "500px", width: "1000px" }}
                  />
                </div>
              ))}
            </Carousel>
          </Card>
        </Col>

        <Col span={9}>
          <Card>
            {rating && (
              <div>
                <h2>{name}</h2>
                <p>{location.cross_streets}</p>
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  href={`https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`}
                  target="_blank"
                >
                  {location.city},{location.country}
                </Button>
              </div>
            )}
          </Card>

          <Card style={{ marginTop: "2rem" }}>
            <h2>Review Count :</h2>
            <br></br>
            <h3>{review_count}</h3>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BusinessDetail;
