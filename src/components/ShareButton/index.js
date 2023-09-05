import React, { Fragment } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';

const ShareButton = () => {
  const handleClick = () => {
    navigator
      .share({
        title: document.title,
        text: 'Check out this quiz app — it rocks!',
        url: 'https://www.joshtalks.com/'
      })
      .then(() => console.log('Successfully shared'))
      .catch(error => console.log(error.message));
  };

  return (
    <Fragment>
      {navigator.share ? (
        <Button
          title="Share"
          floated="right"
          size="big"
          circular
          icon="share alternate"
          onClick={handleClick}
        />
      ) : (
        <Modal
          closeIcon
          size="tiny"
          trigger={
            <Button
              title="Share"
              floated="right"
              size="big"
              circular
              icon="share alternate"
            />
          }
        >
          <Modal.Header className="ui center aligned">Share on</Modal.Header>
          <Modal.Content className="ui center aligned container">
            <a
              href="https://www.joshtalks.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button color="facebook" size="big" style={{ marginBottom: 8 }}>
                <Icon name="facebook" />
                Facebook
              </Button>
            </a>
            <a
              href="https://www.joshtalks.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button color="twitter" size="big" style={{ marginBottom: 8 }}>
                <Icon name="twitter" />
                Twitter
              </Button>
            </a>
            <a
              href="https://www.joshtalks.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button color="linkedin" size="big">
                <Icon name="linkedin" />
                LinkedIn
              </Button>
            </a>
          </Modal.Content>
        </Modal>
      )}
    </Fragment>
  );
};

export default ShareButton;
