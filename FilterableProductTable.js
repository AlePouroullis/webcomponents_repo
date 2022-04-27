import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const searchValue = this.props.searchValue;
        return (
            <form id="search-form">
                <input type="search" id="search-bar" value={searchValue} onChange={this.props.handleInput}></input>
                <div id='checkbox'>
                    <label><input type="checkbox"></input>Only show products in stock</label>
                </div>
            </form>
        ); 
    }
}

class FilterableProductTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchInput: ''
        };
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(event){
        this.setState({searchInput: event.target.value});
    }

    render() {
        return (
            
            <div className="grid-container">
                <SearchBar handleInput={this.handleInput}/>
                <p>Hello there</p>
            </div>
        );
    }

}

export default FilterableProductTable;