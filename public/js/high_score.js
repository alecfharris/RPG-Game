highScorePrompt = scoreTime => {
    let name = prompt('Congratulations! Please enter your name');
    if(name != null) {
        postScore({Name: name, Score: scoreTime});
    }
}

postScore = scoreData => {
    $.post("/api/high_score", scoreData);
  }