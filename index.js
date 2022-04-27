import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const PRODUCTS = [
    {"category": "Sporting Goods", "price": "$49.99", "stocked": true, "name": "Football"},
    {"category": "Sporting Goods", "price": "$9.99", "stocked": true, "name": "Baseball"},
    {"category": "Sporting Goods", "price": "$29.99", "stocked": false, "name": "Basketball"},
    {"category": "Electronics", "price": "$99.99", "stocked": true, "name": "iPod Touch"},
    {"category": "Electronics", "price": "$399.99", "stocked": false, "name": "iPhone 5"},
    {"category": "Electronics", "price": "$199.99", "stocked": true, "name": "Nexus 7"}
];

class InputForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const searchValue = this.props.searchValue;
        return (
            <form id="search-form">
                <input placeholder="Search..." type="search" id="search-bar" value={searchValue} onChange={this.props.handleInput}></input>
                <div id='checkbox'>
                    <label><input type="checkbox"></input>Only show products in stock</label>
                </div>
            </form>
        ); 
    }
}

class ProductRow extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        const product = this.props.product;
        const name = product.stocked ? product.name :
            <span style={{color:'red'}}>{product.name}</span>;
        const price = this.props.product.price;
        return (
            <tr>
                <td>{name}</td><td>{price}</td>
            </tr>
        );
    }
}

class CategoryRow extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const category = this.props.category;
        return (
            <tr>
                <th colspan="2">{category}</th>
            </tr>
        );
    }
}

class Table extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const products = this.props.products;
        products.sort((a, b) => a.category > b.category ? 1 : (a.category < b.category ? -1 : 0));
        let rows = [];
        let last_category = null;
        products.forEach((product) => {
            if(product.category !== last_category){
                rows.push(
                    <CategoryRow category={product.category} key={product.category}/>
                );
            }
            rows.push(
                <ProductRow product={product} key={product.name}/>
            );
            last_category = product.category;
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchInput: '',
            onlyShowProductsInStock: false
        };
        this.handleInput = this.handleInput.bind(this);
    }

    handleSearchInput(event){
        this.setState({searchInput: event.target.value});
    }
    handleCheckboxInput(event){
        this.setState({onlyShowProductsInStock: event.target.value})
    }

    render() {
        return (
            <div id="filterable-product-table">
                <InputForm handleInput={this.handleSearchInput}/>
                <Table products={this.props.products}/>
            </div>
        );
    }

}


class App extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <FilterableProductTable products={this.props.products}/>
        );
    }
}


const root = document.getElementById('root');
ReactDOM.render(<App products={PRODUCTS}/>, root);