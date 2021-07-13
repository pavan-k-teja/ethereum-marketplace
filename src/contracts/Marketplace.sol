pragma solidity >=0.4.21 <0.6.0;

contract Marketplace {

    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;

    struct Product {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool isPurchased;
    }

    event ProductCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool isPurchased
    );

    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool isPurchased
    );

    constructor() public {
        name = "K Pavan Sai Teja";
    }

    function createProduct(string memory _name, uint _price) public{
    
        // require a name
        require(bytes(_name).length > 0);

        // require a price
        require(_price > 0);
        
        productCount++;
        products[productCount] = Product(productCount, _name, _price, msg.sender, false);
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }

    function purchaseProduct(uint _id) public payable {
        //fetch the product
        Product memory _product = products[_id];
        
        //fetch the owner
        address payable _seller = _product.owner;

        //is product valid
        require(_product.id > 0 && _product.id <= productCount);

        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price);

        // Require that the product has not been purchased already
        require(!_product.isPurchased);

        // Require that the buyer is not the seller
        require(_seller != msg.sender);

        //purchase
        _product.owner=msg.sender;
        _product.isPurchased=true;
        products[_id] = _product;

        address(_seller).transfer(msg.value);
        //trigger event
        emit ProductPurchased(productCount, _product.name, _product.price, msg.sender, true);
    }


}
