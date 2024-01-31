import React, { useEffect, useState } from "react";
import "./hotel.scss";

function Hotel() {
  const [hotelData, setHotelData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filterSearch, setFilterSearch] = useState(hotelData);
  const [chipValue, setChipValue] = useState("");
  const fetchHotelData = () => {
    fetch("https://mocki.io/v1/4775a500-cf31-4bee-8a65-0c849b6e4d0c")
      .then((res) => res.json())
      .then((data) => {
        setHotelData(data);
      });
  };
  const handleChip = (chip) => {
    if (chip === "favourite") {
      const data = handleFav();
      setHotelData(data);
    } 
    if (chip === "price") {
      const data = handleSort();
      setHotelData(data);
    }

    return hotelData;
  };
  const handleFav = () => {
    return hotelData.filter((item) => {
      return item.favorite === true;
    });
  };
  const handleSort = () => {
    const sortedData = [...hotelData].sort((a, b) => {
      return a.id - b.id;
    });
    return sortedData;
  };

  const handleFilterSearch = () => {
    const filterSearch = hotelData.filter((item) => {
      return (
        item.id.includes(searchValue) ||
        item.name.toLowerCase().includes(searchValue)
      );
    });
    setFilterSearch(filterSearch);
  };
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    handleFilterSearch();
  };
  useEffect(() => {
    fetchHotelData();
  }, []);
 
  const chips = [
    { title: "Favourite", tag: "favourite", handleFunc: handleFav },
    { title: "Price", tag: "price", handleFunc: handleSort },
  ];
  useEffect(() => {});
  const renderSearch = () => {
    return (
      <div className="hotel__searchBox">
        <input
          className="hotel__inputbox"
          type="text"
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
    );
  };
  const data = searchValue.length > 1 ? filterSearch : hotelData;
  const renderHotelList = () => {
    return (
      <div className="hotelList-wrapper">
        {data &&
          data.map((list) => {
            const { id, image, favorite, description, freeBreakfast, price } =
              list;
            return (
              <div className="hotel-container">
                <div className="hotelImg-container" key={id}>
                  <img src={image} className="img" />
                  <span
                    className={favorite ? "hotel-heart active" : "hotel-heart"}
                  ></span>
                </div>
                <div className="hotel-description">{description}</div>
                <div className="hotel-price">&#8377;{price}</div>
                <div className="hotel-freeBreakFast">
                  {freeBreakfast ? "Free Breakfast " : null}
                </div>
              </div>
            );
          })}
      </div>
    );
  };
  const renderChips = () => {
    return (
      <div className="chip-container">
        {chips.map((chip) => {
          return (
            <button
              className="chip-select"
              key={chip.tag}
              onClick={() => {
                setChipValue(()=>chip.tag); handleChip(chip.tag);
              }}
            >
              {chip.title}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="hotel__container">
      {renderSearch()}
      {renderChips()}
      {renderHotelList()}
    </div>
  );
}

export default Hotel;
