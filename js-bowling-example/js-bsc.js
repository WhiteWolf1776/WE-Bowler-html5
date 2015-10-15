/*
JavaScript Bowling Score Calculator (JS-BSC)
Copyright (c) 2006 Richard Tong. All Rights Reserved.

Licensed under the terms of the GNU General Public License.
See http://opensource.org/licenses/gpl-license.php

File name: js-bsc.js
	This is the main JavaScript file for the application.
*/

// displayTable displays the score table for a single game.
function displayTable(formname) {
  document.write("<form name='" + formname + "' onSubmit='return false'>");
  document.write("<table><tr><td style='padding: 10px;'><input name='player' type='text' size='30' value='"+formname+"'/></td></tr></table>");
  document.write("<table><tr>");
  for (var i = 1; i <= 10; i++)
  {
	  document.write("<td colspan='2' id='frame'>"+i+"</td>");
  }
  document.write("</tr><tr>");
  for (var i = 0; i <= 20; i++)  // Display input fields
  {
	  	document.write("<td><input type='text' name='ball' size='1' maxLength='1' onChange='calculate("+formname+")' /></td>");
  }
  document.write("<td>&nbsp;</td><td>Max Score</td></tr><tr>");  // Display the Max Score heading
  
  for (var i = 0; i < 10 ; i++)  // Display the score boxes
  {
  	document.write("<td colspan='2'><input type='text' name='score' size='7' readOnly='true' /></td>");
  }
  document.write("<td colspan='2'>&nbsp;</td><td><input type='text' name='maxScore' size='8' readOnly='true' value='300'/></td></tr>");
  
  // Display pin diagram
  document.write("<tr>");
  for (var i=0; i<11; i++)  // Back row 4
  {
    document.write("<td colspan='2'><a href='#' onClick='changePin("+formname+","+i+",7)' /><img src='hit.gif' name='"+formname+i+"7' /></a><a href='#' onClick='changePin("+formname+","+i+",8)' /><img src='hit.gif' name='"+formname+i+"8' /></a><a href='#' onClick='changePin("+formname+","+i+",9)' /><img src='hit.gif' name='"+formname+i+"9' /></a><a href='#' onClick='changePin("+formname+","+i+",10)' /><img src='hit.gif' name='"+formname+i+"10' /></td>");
  }
  document.write("</tr><tr>");
  for (var i=0; i<11; i++)  // 3 pin row
  {
    document.write("<td colspan='2'><a href='#' onClick='changePin("+formname+","+i+",4)' /><img src='hit.gif' name='"+formname+i+"4' /></a><a href='#' onClick='changePin("+formname+","+i+",5)' /><img src='hit.gif' name='"+formname+i+"5' /></a><a href='#' onClick='changePin("+formname+","+i+",6)' /><img src='hit.gif' name='"+formname+i+"6' /></a></td>");
  }
  document.write("</tr><tr>");
  for (var i=0; i<11; i++)  // 2 pin row
  {
    document.write("<td colspan='2'><a href='#' onClick='changePin("+formname+","+i+",2)' /><img src='hit.gif' name='"+formname+i+"2' /></a><a href='#' onClick='changePin("+formname+","+i+",3)' /><img src='hit.gif' name='"+formname+i+"3' /></a></td>");
  }
  document.write("</tr><tr>");
  for (var i=0; i<11; i++)  // head pin
  {
    document.write("<td colspan='2'><a href='#' onClick='changePin("+formname+","+i+",1)' /><img src='hit.gif' name='"+formname+i+"1' /></a></td>");
  }
  document.write("</tr>");
  document.write("<tr><td colspan='4' id='tip'><img src='hit.gif' /> Pin knocked down</td><td colspan='6' id='tip'><img src='left.gif' /> Pin left standing after 1st ball</td><td colspan='6' id='tip'><img src='miss.gif' /> Pin left standing after spare ball</td><td colspan='7' style='text-align: right;'><input style='font-weight: normal;' type='button' name='clear' value='Clear values' onClick='clearValues("+formname+")' /></td></tr></table>");
  document.write("</form>");
}

/* changePin toggles the pin type from "knocked down", to "left standing", to "missed"
	The icons are called hit.gif, left.gif, miss.gif, and are 11x11 in size
*/
function changePin(form, frame, pin) {
	imgName = form.name+frame+pin;
	fileName = document.images[imgName].src;
	if (fileName.indexOf("hit") != -1)
	{
	  document.images[imgName].src = "left.gif";
    }
	else if (fileName.indexOf("left") != -1)
	{
	  document.images[imgName].src = "miss.gif";
    }
	else
	{
	  document.images[imgName].src = "hit.gif";
    }
}

// clearValues resets the score board, including removing the player name and resetting the pin diagrams
function clearValues(form) {
	for (var i = 0; i <= 20; i++)  // Clear ball entries
	{
		form.ball[i].value = "";
	}
	for (var i = 0; i < 10; i++)  // Clear score fields
	{
		form.score[i].value = "";
	}
	for (var frame = 0; frame < 11; frame++)  // Clear pin diagrams
	{
		for (var pin = 1; pin < 11; pin++)
		{
		  imgName = form.name+frame+pin;
		  document.images[imgName].src = "hit.gif";
		}
	}
	form.maxScore.value = "300";  // Clear Max Score field
	form.player.value = "";  // Clear Player Name field
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

function collapse(element)
{
	if (document.getElementById) // Gecko-based browsers
		var state = document.getElementById(element).style.display;
	else if (document.all)      //  Other browsers
		var state = document.all[element].style.display;

	if ( state == "none")
		state = "block";
	else
		state = "none";
		
	if (document.getElementById)
		document.getElementById(element).style.display = state;
	else if (document.all)
		document.all[element].style.display = state;
}