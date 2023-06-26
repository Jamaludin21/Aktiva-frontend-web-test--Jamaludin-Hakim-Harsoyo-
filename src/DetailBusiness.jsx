import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_KEY =
  "q84UyfKL8ZFoo-gbZU4Ghbx2mL2ZYOlD7ThIdddAZ-ew1IHUC3tATJ_o_gfF29RgPTOWFeYTgEZyj2FEQSjUZ8vWY9K0S7uVYzCd0XQbmc5etaoHN2YJUvv5atCXZHYx";
const API_URL = "https://proxy.cors.sh/https://api.yelp.com/v3/businesses/";

const BusinessDetail = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}${id}`, {
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
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        setBusiness(data);
      } else {
        throw new Error("Error fetching data from Yelp API");
      }
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

  const { name, photos, rating, coordinates, reviews } = business;

  return (
    <div>
      <h1>{name}</h1>

      {photos && photos.length > 0 ? (
        <div>
          <h2>Foto</h2>
          <div className="slideshow">
            {photos.map((photo) => (
              <img src={photo} alt={name} key={photo} />
            ))}
          </div>
        </div>
      ) : null}

      {rating && (
        <div>
          <h2>Penilaian</h2>
          <p>Rating: {rating}</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buka di Google Maps
          </a>
        </div>
      )}

      {reviews && reviews.length > 0 ? (
        <div>
          <h2>Review</h2>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <p>{review.text}</p>
                <p>Rating: {review.rating}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default BusinessDetail;
