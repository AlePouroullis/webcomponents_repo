import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

function Square(props){
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

function ToggleButton(props){
  return (
    <button className="toggle-button" onClick={props.onClick}>
        {props.togglestate}
    </button>
  )
}
  
  class Board extends React.Component {
    renderSquare(i) {
        return <Square 
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          key={i}
        />;
      }

      createBoard(){
        let rows = [];
        for(let i = 0; i < 3; i++){
          let squares = [];
          for(let j = 0; j < 3; j++){
              squares.push(this.renderSquare(i*3 + j));
          }
          rows.push(<div className="board-row" key={i}>{squares}</div>);
        }
        return rows;
      }

    render() {
      const rows = this.createBoard();
      return (
        <div>
          <div className="status"></div>
          {rows}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                col : -1,
                row: -1,
            }],
            xIsNext: true,
            stepNumber: 0,
            isAscending: true,
        };
    }

    toggleOrdering(){
      console.log("Ordering before toggle: " + (this.state.isAscending ? "Ascending" : "Descending"));
      this.setState({
        isAscending: !this.state.isAscending,
      });
      console.log("Ordering after toggle " + (this.state.isAscending ? "Ascending" : "Descending"));
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if(squares[i] || calculateWinner(squares)){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                row: Math.floor(i/3),
                col: i%3,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step%2) === 0,
      });
    }

    renderToggleButton(){
      let toggleState = this.state.isAscending ? "Ascending" : "Descending";
      return (
        <ToggleButton togglestate={toggleState} onClick={() => this.toggleOrdering()}/>
      );
    }

    render() {
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
              const desc = move ? 'Move at (' + (step.row+1) + ', ' + (step.col+1) + ')' : 
                "Go to game start";
              return (
                <li key={move}>
                  <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
              );
           });
        
          if(!this.state.isAscending){
            moves.reverse();
          }

        let status;
        if(winner){
            status = 'Winner: ' + winner;
        }else{
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
      return (
        <div className="game">
          <div className="game-board">
            <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}            
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
          <div className="toggle-button-container">
            {this.renderToggleButton()}
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for(let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
  }