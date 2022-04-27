import React from 'react';
import ReactDOM from 'react-dom';

const PRODUCTS = [
    {"category": "Sporting Goods", "price": "$49.99", "stocked": true, "name": "Football"},
    {"category": "Sporting Goods", "price": "$9.99", "stocked": true, "name": "Baseball"},
    {"category": "Sporting Goods", "price": "$29.99", "stocked": false, "name": "Basketball"},
    {"category": "Electronics", "price": "$99.99", "stocked": true, "name": "iPod Touch"},
    {"category": "Electronics", "price": "$399.99", "stocked": false, "name": "iPhone 5"},
    {"category": "Electronics", "price": "$199.99", "stocked": true, "name": "Nexus 7"}
];



class ProductRow extends React.Component {
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
    render(){
        const category = this.props.category;
        return (
            <tr>
                <th colSpan="2">{category}</th>
            </tr>
        );
    }
}

class Table extends React.Component {
    render(){
        const products = this.props.products;
        products.sort((a, b) => a.category > b.category ? 1 : (a.category < b.category ? -1 : 0));
        let rows = [];
        let last_category = null;
        console.log(this.props.inStockOnly);
        products.forEach((product) => {
            if(product.name.indexOf(this.props.searchText) === -1){
                return;
            }
            if(this.props.inStockOnly && !product.stocked){
                return;
            }
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

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleInStockChange = this.handleInStockChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleInStockChange(event){
        this.props.onInStockChange(event.target.checked);
    }

    handleSearchChange(event){
        this.props.onSearchChange(event.target.value);
        console.log("here");
    }

    render() {
        return (
            <form id="search-form">
                <input 
                    placeholder="Search..." 
                    type="search" 
                    value={this.props.searchText}
                    onChange={this.handleSearchChange}>
                </input>
                <div id='checkbox'>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={this.props.inStockOnly}
                            onChange={this.handleInStockChange}>
                        </input>
                        Only show products in stock
                    </label>
                </div>
            </form>
        ); 
    }
}

class FilterableProductTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchText: '',
            inStockOnly: false,
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleSearchChange(searchText) {
        this.setState({
            searchText: searchText
        });
    }

    handleInStockChange(inStockOnly){
        this.setState({
            inStockOnly: inStockOnly
        })
    }

    render() {
        return (
            <div id="filterable-product-table">
                <InputForm 
                    searchText={this.state.searchText}
                    inStockOnly={this.state.inStockOnly}
                    onInStockChange={this.handleInStockChange}
                    onSearchChange={this.handleSearchChange}
                />
                <Table 
                    products={this.props.products}
                    searchText={this.state.searchText}
                    inStockOnly={this.state.inStockOnly}
                />
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