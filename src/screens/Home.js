import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Leg from '../components/Leg'
import Card from '../components/Card'


export default function Home() {
  const [search, setSearch]= useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadDate = async () => {
    try {
      const response = await fetch("http://localhost:7001/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setFoodCat(data[1]); // Corrected from response[0]
      setFoodItem(data[0]); // Corrected from response[1]
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadDate();
  }, []);

  useEffect(() => {
    console.log("foodCat:", foodCat);
  }, [foodCat]);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'>
  <div className='carousel-caption' style={{zIndex:"10" }}>
  <div className="d-flex justify-content-center">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{
        setSearch(e.target.value);
      }}/>
      {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
    </div>
  </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/300×300/?burger" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/300×300/?momos" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/300×300/?sea " className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button></div>
      <div className='container'>
        {foodCat && foodCat.length !== 0 ? (
          foodCat.map((category) => (
            <div key={category._id} className='row mb-3 '>
              {category.CategoryName}
              <hr />
              {foodItem && foodItem.length !== 0 ? (
                foodItem
                  .filter((item) => (item.CategoryName === category.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map((filteredItem) => (
                    <div key={filteredItem._id} className='col-6 col-md-4 col-lg-3'>
                      <Card foodItems= {filteredItem}
                      options = {filteredItem.options[0]}
                        imgSrc={filteredItem.img}>
                      </Card>
                    </div>
                  ))
              ) : (
                <div>No items available for this category</div>
              )}
            </div>
          ))
        ) : (
          <div>No categories available</div>
        )}
      </div>
      <div>
        <Leg />
      </div>
    </div>
  );
        }
