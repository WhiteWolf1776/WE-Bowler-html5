var gameNumber = 0;


function addGame() {
    gameNumber = gameNumber + 1;
    var gameName = "Game" + gameNumber;
    document.write("<form name='" + gameName + "' onSubmit='return false'>");
    document.write("<table><tr><td style='padding: 10px;'><input name='Game' type='text' size='30' value='" + gameName + "'/></td></tr></table>");
    document.write("<table><tr>");
    for (var i = 1; i <= 10; i++) {
        document.write("<td colspan='2' id='frame'>" + i + "</td>");
    }
    document.write("</tr><tr>");
    for (var i = 0; i <= 20; i++)  // Display input fields
    {
        document.write("<td><input type='text' name='ball' size='1' maxLength='1' onChange='calculate("+gameName+")' /></td>");
    }
    document.write("<td>&nbsp;</td><td>Max Score</td></tr><tr>");  // Display the Max Score heading

    for (var i = 0; i < 10 ; i++)  // Display the score boxes
    {
        document.write("<td colspan='2'><input type='text' name='score' size='7' readOnly='true' /></td>");
    }
    //TODO: make this Final Score and use in the average method
    document.write("<td colspan='2'>&nbsp;</td><td><input type='text' name='maxScore' size='8' readOnly='true' value='300'/></td></tr>");
}

function addGameButton() {
    document.write("<button onclick='addGame()'>Add Game</button>");
}

// calculate is called every time a score value is changed
function calculate(form) {
    var nextBall = "";
    var thirdBall = "";
    var totalScore = 0;  // Total current score
    for (var i = 0; i<10; i++)  // clear the score fields first
    {
        form.score[i].value = "";
    }

// Validate the fields
    for (var i = 0; i <= 18; i++)  // Balls through 18, first balls can't have / and 2nd balls can't have x
    {
        if (form.ball[i].value == '-')  // Change dashes to zeroes
            form.ball[i].value = '0';
        fieldValue = form.ball[i].value;
        if (i % 2 == 0 && fieldValue != '0' && fieldValue != '1' && fieldValue != '2' && fieldValue != '3' && fieldValue != '4' && fieldValue != '5' && fieldValue != '6' && fieldValue != '7' && fieldValue != '8' && fieldValue != '9' && fieldValue.toLowerCase() != 'x')
            form.ball[i].value = "";  // Even j value means it's ball 1 of the frame
        if (i % 2 != 0 && fieldValue != '0' && fieldValue != '1' && fieldValue != '2' && fieldValue != '3' && fieldValue != '4' && fieldValue != '5' && fieldValue != '6' && fieldValue != '7' && fieldValue != '8' && fieldValue != '9' && fieldValue != '/')
            form.ball[i].value = "";  // Not even j value means it's ball 2 of the frame
    }
    // Special check on ball 19 and 20 - can have all values 0-9 and x and /
    for (var i=19; i<=20; i++)
    {
        if (form.ball[i].value == '-')
            form.ball[i].value = '0';
        fieldValue = form.ball[i].value;
        if (fieldValue != '0' && fieldValue != '1' && fieldValue != '2' && fieldValue != '3' && fieldValue != '4' && fieldValue != '5' && fieldValue != '6' && fieldValue != '7' && fieldValue != '8' && fieldValue != '9' && fieldValue != '/' && fieldValue != 'x')
            form.ball[i].value = "";
    }
// End of field validation

    for (var j = 0; j <= 18; j+=2)  // Main process loop
    {
        var frameScore = 0;  // Reset current frame score
        var shouldDisplay = false;  // By default we don't want to display the score

        // Check strike
        if (form.ball[j].value.toLowerCase() == 'x')  // Strike can only be first ball of frame
        {
            frameScore += 10;
            if (j < 16)  // Regular frame
            {
                if (form.ball[j+1].value != '')		   // Did user accidently put a value in ball 2 in a strike frame?
                    form.ball[j+1].value = '';			   // Erase it if they did, those bastards
                nextBall = form.ball[j+2].value;     // Next ball is first ball in next frame
                if (nextBall.toLowerCase() == 'x')   // If the next ball is a strike, then we take 3rd ball
                    thirdBall = form.ball[j+4].value;  // as first ball in the following frame
                else
                    thirdBall = form.ball[j+3].value;  // Otherwise, it's the second ball in the next frame
            }
            if (j == 16)  // 9th frame
            {
                nextBall = form.ball[j+2].value;  // Next ball is first ball in next frame
                thirdBall = form.ball[j+3].value; // 3rd ball is 2nd ball in next frame
            }
            if (j == 18)  // 10th frame
            {
                nextBall = form.ball[j+1].value;  // Next ball is actually next ball
                thirdBall = form.ball[j+2].value; // 3rd ball is actually 3rd ball
            }
            if (nextBall != '' && thirdBall != '')  // If next two balls have a value
            {
                if (nextBall.toLowerCase() == 'x')  // next ball is a strike too
                {
                    frameScore += 10;
                    if (thirdBall.toLowerCase() == 'x') // Is 3rd ball strike too?
                        frameScore += 10;
                    else
                        frameScore += parseInt(thirdBall); // Not strike, just take the value
                }
                else  // Must be a regular number
                {
                    if (thirdBall == '/')  // Is it a spare?
                    {
                        frameScore += 10;
                    }
                    else  // just an open frame
                    {
                        frameScore += parseInt(nextBall);
                        frameScore += parseInt(thirdBall);
                    }
                }
                shouldDisplay = true;
            }
        }
        else if (form.ball[j].value != '' && form.ball[j+1].value != '')  // Not a strike, so we get spare or open frame
        {
            if (form.ball[j+1].value == '/')  // This frame is a spare
            {
                frameScore += 10;
                if (form.ball[j+2].value != '')  // so we need to check next ball too
                {
                    if (form.ball[j+2].value.toLowerCase() == 'x')  // Next ball is strike
                    {
                        frameScore += 10;
                        shouldDisplay = true;
                    }
                    else											// Next ball isn't strike, just take its value
                    {
                        frameScore += parseInt(form.ball[j+2].value);
                        shouldDisplay=true;
                    }
                }
            }
            else								// This frame is an open frame, just add the two values
            {
                frameScore += parseInt(form.ball[j].value);
                frameScore += parseInt(form.ball[j+1].value);
                shouldDisplay = true;
            }
        }
        totalScore += frameScore;  // Keep running total of our score
        if (shouldDisplay)  // We have a displayable score, so let's display it
        {
            k = j / 2;  // Convert to correct score location
            form.score[k].value = totalScore;
            form.maxScore.value = ((9-k)*30)+ totalScore;  // This is how we calculate the max score, easy huh?
        }
    }
}
