/* eslint-disable array-callback-return */
import React, { Component } from "react";
import "./Main.css";

class Main extends Component {
  // async componentWillMount() {
  //   await this.loadWeb3();
  //   await this.loadBlockchainData();
  // }

  constructor(props) {
    super(props);

    let isSellableList = {};
    this.props.products.map((product) => {
      if (product.owner === this.props.account) {
        isSellableList[product.id] = product.isSellable;
      }
    });

    this.state = {
      sellable: isSellableList,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let id = event.target.name;
    let isSellableList = this.state.sellable;
    isSellableList[id] = !this.state.sellable[id];

    this.setState({
      sellable: isSellableList,
    });
    console.log(this.state.sellable[id]);
  }

  handleSubmit(event) {
    event.preventDefault();
    let changed = [];

    this.props.products.map((product) => {
      if (product.owner === this.props.account) {
        if (this.state.sellable[product.id] !== product.isSellable)
          changed.push(product.id);
      }
    });

    this.props.changeProduct(changed);

    // alert('A name was submitted: ' + this.state.value);
  }

  // ToggleButton (isSellableList) {
  //   this.setState((currentState) => ({
  //     textDisplay: !currentState.textDisplay,
  // }));
  // }
  render() {
    let yours = [];
    let more = [];
    let isSellableList = [];
    this.props.products.map((product) => {
      if (product.owner === this.props.account) {
        yours.push(product);
        isSellableList.push([product.id, product.isSellable]);
      } else if (product.isSellable === true) more.push(product);
    });

    // const handleSaveChange = (e) => {};

    // this.setState({ sellable: isSellableList });

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
            className="mb-3 btn btn-outline-primary font-weight-bold"
          >
            Add Product
          </button>
        </form>
        <p>&nbsp;</p>
        <h1>Your Products</h1>
        {yours.length !== 0 ? (
          <div>
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
                        )}{" "}
                        Eth
                      </td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name={product.id}
                            value={product.isSellable}
                            onChange={(e) => {
                              this.handleChange(e);
                            }}
                            checked={this.state.sellable[product.id]}
                          />
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
              className="mt-0 mb-3 btn btn-outline-primary font-weight-bold"
              onClick={this.handleSubmit}
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div>
            <hr style={{ border: "1px solid white" }} />
            <h4>You have no products in the marketplace.</h4>
          </div>
        )}
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
                  {/* {console.log(product.isSellable)} */}
                  <th scope="row">{key + 1}</th>
                  <td>{product.name}</td>
                  <td>
                    {window.web3.utils.fromWei(
                      product.price.toString(),
                      "Ether"
                    )}{" "}
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
