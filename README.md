# PyRoS
doc version: 1.0


PyRoS is a simple game in Paper/Rock/Scissors written in Flask.

# Environment setup
Michał TODO


# Architecture
## __Technology stack__:
- __Sqlite3__ for Database
- __Flask__ for server framework
- __[Jinja2Templates](https://www.geeksforgeeks.org/templating-with-jinja2-in-flask/)__ for serving static ( Frontend app )

## __Server app:__


__Endpoints:__
__
GET /
__```
__status: __307__
response:__ Redirect response to /{game_id}/{player_id} with new player_id set and new game created
```

__GET /{game_id}/{player_id}__
```
__status:__ 200
__response: FileResponse __with__ index.html:
---__ with__ Set-Cookie player_id={player_id}
---__ Jinja context__: __(similar to response of GET /game/{game_id}/{player_id}
{
    request=request,
    your_score={game_id.players[player_id].score},
    opponent_score={game_id.players[opponent_id].score},
    your_turn: bool
}
__
__
```
__POST /game/__
```
__status__: 201 | 400 | 401
__response__: response of /game/{game_id}/{player_id}
__payload:
__{
    game_id: int,
    action: str
}
where action will be "p", "s", "r"
Requests contains a cookie "player_id"

if  payload is invalid,   then return 400
if  player_id is missing, then return 401



```
__GET /game/{game_id}/{player_id}__
```
__status__: 200
__response:__ 
{
    scores: {
        "1": 3,
        "234": 4
    }
    your_turn: bool
}
```
## __Frontend app__
Acceptance Criterias:
- App sends a request to GET /game/{game_id}/{player_id} periodically to get current state of the game
- Game panel contains 3 buttons "Rock", "Paper", "Scissor"
- 3 buttons are sending POST request to /game/
- There are 2 elements with score
- There is a text information about current state of the game "You are winning", "You are loosing", "There's a draw", "No one started game yet"
