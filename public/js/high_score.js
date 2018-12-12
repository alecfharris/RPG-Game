highScorePrompt = scoreTime => {  
    let name = prompt('Congratulations! Please enter your name to record your score');  
    if(name != null) {
        // let scoreTime = 60;
        postScore({Name: name, Score: scoreTime});
    }
}

postScore = scoreData => {
    $.post("/api/high_score", scoreData)
    .then(
        alert('Your score has been added to the high scores! Please refresh this page to play again.')
    );
  }

//   highScorePrompt();