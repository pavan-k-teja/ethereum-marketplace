import React, { Component, useState } from "react";
import "./Main.css";

class Main extends Component {
  render() {
    // const [yours, setYours] = useState([]);
    // const [more, setMore] = useState([]);
    let yours = [];
    let more = [];

    this.props.products.map((product) => {
      if (product.owner === this.props.account)
        yours.push(product);
      // else if(product.isSellable === true)
      else
        more.push(product);
    });

    const handleSaveChange = (e) => {};

    return (
      <div id="content">
        <h1>Add Product</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const name = this.productName.value;
            const price = window.web3.utils.toWei(
              this.productPrice.value.toString(),
              "Ether"
            );
            this.props.createProduct(name, price);
          }}
        >
          <div className="form-group mr-sm-2 color-primary">
            <input
              id="productName"
              type="text"
              ref={(input) => {
                this.productName = input;
              }}
              className="form-control"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="number"
              ref={(input) => {
                this.productPrice = input;
              }}
              className="form-control"
              placeholder="Product Price"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-primary font-weight-bold"
          >
            Add Product
          </button>
        </form>
        <p>&nbsp;</p>
        <h1>Your Products</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Sell</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {yours.map((product, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{key + 1}</th>
                  <td>{product.name}</td>
                  <td>
                    {window.web3.utils.fromWei(
                      product.price.toString(),
                      "Ether"
                    )}
                  </td>
                  <td>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button
          type="submit"
          className="btn btn-outline-primary font-weight-bold"
          onClick={handleSaveChange}
        >
          Save Changes
        </button>

        <p>&nbsp;</p>
        <h1>Buy Products</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {more.map((product, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{key + 1}</th>
                  <td>{product.name}</td>
                  <td>
                    {window.web3.utils.fromWei(
                      product.price.toString(),
                      "Ether"
                    )}
                    Eth
                  </td>
                  <td>{product.owner}</td>
                  <td>
                    <button
                      className="material-bubble"
                      name={product.id}
                      value={product.price}
                      onClick={(event) => {
                        this.props.purchaseProduct(
                          event.target.name,
                          event.target.value
                        );
                      }}
                    >
                      Buy
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
