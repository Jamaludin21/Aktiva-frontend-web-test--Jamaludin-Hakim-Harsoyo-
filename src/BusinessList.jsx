import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [location, setLocation] = useState("");
  const [offset, setOffset] = useState(0);

  const API_KEY =
    "q84UyfKL8ZFoo-gbZU4Ghbx2mL2ZYOlD7ThIdddAZ-ew1IHUC3tATJ_o_gfF29RgPTOWFeYTgEZyj2FEQSjUZ8vWY9K0S7uVYzCd0XQbmc5etaoHN2YJUvv5atCXZHYx";
  const API_URL =
    "https://proxy.cors.sh/https://api.yelp.com/v3/businesses/search?location=NYC&sort_by=best_match&limit=10";

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
          "x-cors-api-key": "temp_22596cf94491a5c040ff0a23d71b33d4",
        },
        mode: "cors",
      });

      if (response.ok) {
        const data = await response.json();
        setBusinesses(data.businesses);
      } else {
        throw new Error("Error fetching data from Yelp API");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [offset]);

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

  return (
    <div className="listmenu">
      <h1>List Bisnis</h1>
      <form className="form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Cari bisnis"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lokasi"
          value={location}
          onChange={handleLocationChange}
        />
        <Button className="btn" type="submit">
          Cari
        </Button>
      </form>

      <select value={filterTerm} onChange={handleFilter}>
        <option value="">Semua Kategori</option>
        <option value="restaurants">Restoran</option>
        <option value="coffee">Kafe</option>
        <option value="bars">Bar</option>
      </select>

      {/* <ul>
        {businesses.map((business) => (
          <li key={business.id}>{business.name}</li>
        ))}
      </ul> */}

      <ul className="list">
        {businesses.map((business) => (
          <li key={business.id}>
            <Link to={`/business/${business.id}`}>{business.name}</Link>
          </li>
        ))}
      </ul>

      <div>
        <Button className="btn" onClick={() => handlePagination(-10)}>
          Sebelumnya
        </Button>
        <Button className="btn" onClick={() => handlePagination(10)}>
          Selanjutnya
        </Button>
      </div>
    </div>
  );
};

export default BusinessList;
