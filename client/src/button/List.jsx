import React from "react";
import { useEffect } from "react";
import Button from "./Button";
import axios from "axios";
import "../App.css";

const List = (props) => {
  const { data, fetchData } = props;
  const handleChange = async (ele) => {
    const result = await axios.put(
      "http://localhost:8000/api/" + ele.groceryItem
    );
    fetchData();
    console.log(result);
  };
  const handleDelete = async (ele) => {
    const result = await axios.delete(
      "http://localhost:8000/api/" + ele.groceryItem
    );
    fetchData();
    alert(JSON.stringify(result.data.message));
    // console.log("delete this item");
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      {data.length > 0 &&
        data.map((element) => {
          return (
            <div className="list-hero-container" style={{ padding: "5px" }}>
              <div className="list-hero-container-list">
                <span
                  style={{
                    textDecoration: [element.isPurchased ? "line-through" : ""],
                  }}
                >
                  {element.groceryItem}
                </span>
              </div>
              <div className="list-hero-container-button">
                <Button
                  handleClick={() => {
                    handleChange(element);
                  }}
                  label="Commit"
                />
                <Button
                  handleClick={() => {
                    handleDelete(element);
                  }}
                  label="X"
                />
              </div>
            </div>
          );
        })}
    </>
  );
};
export default List;
