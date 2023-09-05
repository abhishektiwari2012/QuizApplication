import React, { useState } from 'react';
        import PropTypes from 'prop-types';
        import {
          Container,
          Segment,
          Grid,  // Add Grid component
          Item,
          Divider,
          Button,
          Icon,
          Message,
          Menu,
          Header,
        } from 'semantic-ui-react';
        import he from 'he';
        import Countdown from '../Countdown';
        import { getLetter } from '../../utils';

        // Import the NavigationPanel component
        import NavigationPanel from './navigation';  // Update import path

        const Quiz = ({ data, countdownTime, endQuiz }) => {
          const [questionIndex, setQuestionIndex] = useState(0);
          const [correctAnswers, setCorrectAnswers] = useState(0);
          const [userSlectedAns, setUserSlectedAns] = useState(null);
          const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
          const [timeTaken, setTimeTaken] = useState(null);
          const [visitedQuestions, setVisitedQuestions] = useState([]);
          const [attemptedQuestions, setAttemptedQuestions] = useState([]);

          const handleItemClick = (e, { name }) => {
            setUserSlectedAns(name);
          };

          const handleNext = () => {

             // Move the state updates outside of the conditional block
             const updatedAttemptedQuestions = [...attemptedQuestions];
             setAttemptedQuestions(updatedAttemptedQuestions);

            updatedAttemptedQuestions.push(questionIndex + 1);
            let point = 0;
            if (userSlectedAns === he.decode(data[questionIndex].correct_answer)) {
              point = 1;
            }

            const qna = questionsAndAnswers;
            qna.push({
              question: he.decode(data[questionIndex].question),
              user_answer: userSlectedAns,
              correct_answer: he.decode(data[questionIndex].correct_answer),
              point,
            });

            if (questionIndex === data.length - 1) {
              return endQuiz({
                totalQuestions: data.length,
                correctAnswers: correctAnswers + point,
                timeTaken,
                questionsAndAnswers: qna,
              });
            }

            setCorrectAnswers(correctAnswers + point);
            setQuestionIndex(questionIndex + 1);
            setUserSlectedAns(null);
            setQuestionsAndAnswers(qna);

          };

          const timeOver = (timeTaken) => {
            return endQuiz({
              totalQuestions: data.length,
              correctAnswers,
              timeTaken,
              questionsAndAnswers,
            });
          };

          const handleQuestionClick = (questionNumber) => {
            const updatedVisitedQuestions = [...visitedQuestions];
            updatedVisitedQuestions.push(questionIndex + 1); // Mark as visited

            setVisitedQuestions(updatedVisitedQuestions);
            const newIndex = questionNumber - 1;
            setQuestionIndex(newIndex);
          };

          return (
            <Item.Header>
              <Container>
                <Segment>
                  <Grid columns={2} stackable> {/* Use Grid component */}
                    <Grid.Column width={10}> {/* Specify width for quiz section */}
                      <Item.Group divided>
                        <Item>
                          <Item.Content>
                            <Item.Extra>
                              <Header as="h1" block floated="left">
                                <Icon name="info circle" />
                                <Header.Content>
                                  {`Question No.${questionIndex + 1} of ${data.length}`}
                                </Header.Content>
                              </Header>
                              <Countdown
                                countdownTime={countdownTime}
                                timeOver={timeOver}
                                setTimeTaken={setTimeTaken}
                              />
                            </Item.Extra>
                            <br />
                            <Item.Meta>
                              <Message size="huge" floating>
                                <b>{`Q. ${he.decode(data[questionIndex].question)}`}</b>
                              </Message>
                              <br />
                              <Item.Description>
                                <h3>Please choose one of the following answers:</h3>
                              </Item.Description>
                              <Divider />
                              <Menu vertical fluid size="massive">
                                {data[questionIndex].options.map((option, i) => {
                                  const letter = getLetter(i);
                                  const decodedOption = he.decode(option);

                                  return (
                                    <Menu.Item
                                      key={decodedOption}
                                      name={decodedOption}
                                      active={userSlectedAns === decodedOption}
                                      onClick={handleItemClick}
                                    >
                                      <b style={{ marginRight: '8px' }}>{letter}</b>
                                      {decodedOption}
                                    </Menu.Item>
                                  );
                                })}
                              </Menu>
                            </Item.Meta>
                            <Divider />
                            <Item.Extra>
                              <Button
                                primary
                                content="Next"
                                onClick={handleNext}
                                floated="right"
                                size="big"
                                icon="right chevron"
                                labelPosition="right"
                                disabled={!userSlectedAns}
                              />
                            </Item.Extra>
                          </Item.Content>
                        </Item>
                      </Item.Group>
                    </Grid.Column>
                    <Grid.Column width={6}> {/* Specify width for navigation panel */}
                      {/* Integrate the NavigationPanel component */}
                      <NavigationPanel
                        data={data}
                        visitedQuestions={visitedQuestions}
                        attemptedQuestions={attemptedQuestions}
                        navigateToQuestion={handleQuestionClick}
                      />
                    </Grid.Column>
                  </Grid>
                </Segment>
              </Container>
            </Item.Header>
          );
        };

        Quiz.propTypes = {
          data: PropTypes.array.isRequired,
          countdownTime: PropTypes.number.isRequired,
          endQuiz: PropTypes.func.isRequired,
        };

        export default Quiz;