## Architecture

* Project emphasis's modularity and separation of concerns
* The view layer is separate from the hook  / logic layer . 

## Board

Board is provided by a React component.

* `ChessGame` provides an abstraction to the view layer. It might internally integrated and replaced by any libraries without consumer knowing about it.
* It could support all functionalities related to views , eg: Supporting different board colors, 2d / 3d view , different icons for pieces, user preferences and so on.
* Strongly typed. The widget must specify the types  and props that it provides to consumers
* Widget doesn't understand chess or how the game is played, but just renders the UI based on what is passed to it

## Info Section

This could be a component which shows overall chess statistics, functionalities like exporting moves, controls for user actions like draw and resign, current position, analysis and so on.

## Logic

Logic is controlled by hooks.

* Each hook can be visualized as a headless addon and provide exactly one functionality. eg: 

  * `useChessGame` - Controls overall game logic, integrates with timer, control , actions and with hooks created for any new functionality. `ChessWidget` should interact only with this `hook` and shouldn't be concerned / refer to its internal implementation
  * `useChessControl` - Controls game state and provides functionalities like move, stores current position
  * `useChessTimer` - Provides timer related functionality for timed chess games
  * `useGameHistory` - Maintains game history, stores the state and timer related info etc...
  * `useChessEngine` - Hook which could integrate an engine like `Stockfish` for `Computer vs Human`
  * `useVoteChess` - Chess game which could make moves based on a multiplayer voting system 

* Hooks provide abstractions. for eg `useChessControl` might integrate with `chess.js` or might be replaced with any libraries in future or dependencies updated ,  without the consuming component even knowing about it .

* Strongly typed. Each hook must specify the types  and props that it provides to consumers.

* Hooks are not concerned about how UI is rendered and just manages the state. Each hook understand only the functionality it provides and must not have tight coupling with other hooks.


![image](https://user-images.githubusercontent.com/57066740/200226412-37367c0a-fa62-4ea7-bb5c-53c4ee153894.png)
