import React from 'react';
import { Menu } from 'semantic-ui-react';

const NavigationPanel = ({
  data,
  visitedQuestions,
  attemptedQuestions,
  navigateToQuestion,
}) => {
  return (
    <Menu vertical fluid>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.map((question, index) => {
          const questionNumber = index + 1;
          const isVisited = visitedQuestions.includes(questionNumber);
          const isAttempted = attemptedQuestions.includes(questionNumber);

          let circleColor = 'grey'; // Default color for unvisited questions

          if (isVisited && !isAttempted) {
            circleColor = 'yellow'; // Yellow for visited but not attempted
          } else if (isVisited && isAttempted) {
            circleColor = 'green'; // Green for both visited and attempted
          }
          else if(isAttempted && !isVisited)
            circleColor = 'green'

          return (
            <div
              key={questionNumber}
              style={{
                width: '80px',
                height: '65px',
                borderRadius: '50%',
                backgroundColor: circleColor,
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '10px',
                marginBottom: '10px', // Adjust the margin to separate the circles
                color: 'white', // Text color
                fontSize: '14px', // Adjust the font size
              }}
              onClick={() => navigateToQuestion(questionNumber)}
            >
              {questionNumber}
            </div>
          );
        })}
      </div>
    </Menu>
  );
};

export default NavigationPanel;