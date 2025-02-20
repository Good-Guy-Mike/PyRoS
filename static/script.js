gameId = 12 // TODO get gameId from url
playerId = 43 // TODO get this from url
opponentId = 443 // TODO handle this
fetchTime = 1500;
// assign events
const actions = ["r", "p", "s"];
actions.forEach((a) => {
	document.getElementById(`btn-${a}`).addEventListener("click", () => { sendAction(a) });
})

window.addEventListener("load", fetchData);
window.addEventListener("load", startDataFetching);


// functions
function setButtonsState(isActive){
	document.getElementById("turns-info").innerText = isActive ? "It's your turn!" : "Wait for your turn!";
	document.querySelectorAll("#buttons button").forEach(
		(e) => {
			e.disabled = !isActive;
			if (!isActive){
			}
		}
	)
}

async function fetchData(){
	// TODO
	try{
		const resp = await fetch(`/game/${gameId}/${playerId}`, {
			method: "GET",
		})
		const respText = await resp.json();
		if ( resp.status === 200 ) {
			const pS = respText.scores[player];
			const oS = respText.scores[opponentId];
			document.getElementById("score-player").innerText = pS
			document.getElementById("score-player").innerText = oS
			document.getElementById("score-description").innerText = pS === oS ? "It's a draft!" : pS > oS ? "You are winning!" : "You are loosing!";
			if ( respText.your_turn ) {
				setButtonsState(true);
			} else {
				setButtonsState(false);
			}
		}
		console.error("Cannot Fetch data!", resp);
		throw new Error("Couldn't fetch data!")
		
	} catch ( err ) {
		console.error( err );
	}
}

async function sendAction(action) {
	console.log("user action:", action);
	const payload = {
		game_id: gameId,
		action: action
	}
	try{
		const resp = await fetch("/game/", {
			method: "POST",
			body: JSON.stringify(payload),
		})
		if ( resp.status === 201 ) {
			await fetchData()
		} else if ( resp.status === 400 ) {
			showNotification("Bad request!", "error")
		} else if ( resp.status === 401 ) {
			showNotification("You don't have access to this game!", "error")
		}
	} catch ( err ) {
		window.alert(err)
	}
}


function showNotification(text, type="info"){
	window.alert(text)
}

async function startDataFetching(){
	setTimeout( async () => {await fetchData();startDataFetching()}, fetchTime );
}
