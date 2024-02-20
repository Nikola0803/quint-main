import React from "react";
import "./ListCategory.scss";
import { ThreeDots } from "react-loader-spinner";
import CategoryCard from "../CategoryCard/CategoryCard";
function ListCategory() {
  return (
    <div className="list-category">
      <div className="container">
        <div className="list-category__body">
          <div className="row">
            <div className="col-3 list-category__body__card">
              {" "}
              <CategoryCard />
            </div>
            <div className="col-3 list-category__body__card">
              {" "}
              <CategoryCard />
            </div>
            <div className="col-3 list-category__body__card">
              {" "}
              <CategoryCard />
            </div>
            <div className="col-3 list-category__body__card">
              {" "}
              <CategoryCard />
            </div>
            <div className="col-3 list-category__body__card">
              {" "}
              <CategoryCard />
            </div>
            <div className="col-3 list-category__body__card">
              {" "}
              <CategoryCard />
            </div>
            <div className="col-3 list-category__body__card">
              {" "}
              <CategoryCard />
            </div>
            <div className="col-3 list-category__body__card">
              {" "}
              <CategoryCard />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <ThreeDots
            height="60"
            width="60"
            radius="9"
            color="#A31332"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      </div>
    </div>
  );
}

export default ListCategory;
