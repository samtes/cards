import "./lobby.scss";

import React, { Component } from "react";
import Chat from "./chat.js";

class LobbyContainer extends Component {
  constructor (props) {
    super(props);

    this._joinGame = (game) => {
      console.log(`TODO: Join game ${game.title}`);
    };

    this._sendMessage = (message) => {
      console.log(`Sending ${ message }`);
    };
  }

  render () {
    const games = [
      { title: "Game 1", id: 1, players: ["one", "two", "three"] },
      { title: "Game 2", id: 2, players: ["one", "two", "three"] },
      { title: "Game 3", id: 3, players: ["one", "two", "three"] },
      { title: "Game 4", id: 4, players: ["one", "two", "three"] },
    ];

    const opSendMessage = { can: true, inProgress: false };
    const messages = [
      { index: 1, name: "Person", message: "this is a message I sent" },
      { index: 2, name: "Person", message: "this asdfa adfas" },
      { index: 3, name: "Whao", message: "make america great again" },
      { index: 4, name: "Person", message: "Yo blah blah blah ...." },
      { index: 5, name: "Person", message: "this is a different message" }
    ];

    return (
      <div className="c-lobby">
        <GameList games={ games } joinGame={ this._joinGame } />
        <Chat
          messages={ messages }
          opSendMessage={ opSendMessage }
          sendMessage={ this._sendMessage } />
      </div>
    );
  }
}

class LobbySidebar extends Component {
  constructor (props) {
    super(props);

    this._login = () => {
      console.log("TODO: Impliment login");
    };

    this._createGame = () => {
      console.log("TODO: Create game");
    };
  }

  render () {
    const canLogin = true;
    const canCreateGame = true;
    const createGameInProgress = false;

    return (
      <section>
        <div className="c-lobby-sidebar">
          <div className="m-sidebar-buttons">
            { !canLogin ? null
              : <button
                  className="m-button primary"
                  onClick={ this._login}>
                  Login
              </button>
            }
            { !canCreateGame ? null
              : <button
                  className="m-button good"
                  onClick={ this._createGame }
                  disabled={ createGameInProgress }>
                  Create Game
                </button>
            }
          </div>
        </div>
      </section>
    );
  }
}

function GameList ({ games, joinGame }) {
  return (
    <section className="c-game-list">
      { games.length > 0 ? null
          : <div
              className="no-games">
              There are no games yet :(
            </div>
      }

      { games.map(game =>
          <div
            className="game"
            key={ game.id }
            onClick={ () => joinGame(game) }>
            <div className="title">{ game.title }</div>
            <div className="players">
              { game.players.join(", ") }
            </div>
            <div className="join-game">Join Game</div>
          </div>
        )
      }
    </section>
  );
}

export default {
  main: LobbyContainer,
  sidebar: LobbySidebar
};
