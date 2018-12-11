highScorePrompt = scoreTime => {  
    let name = prompt('Congratulations! Please enter your name');  
    if(name != null) {
        // let scoreTime = 60;
        postScore({Name: name, Score: scoreTime});
    }
}

postScore = scoreData => {
    $.post("/api/high_score", scoreData);
  }

//   highScorePrompt();