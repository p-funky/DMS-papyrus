module.exports = {
  beforeEach(client, done) {
    client.resizeWindow(1280, 800, done);
  },
  'Valid User Login': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('#navBar', 10000)
      .assert.title('Papyrus')
      .waitForElementVisible('#signIn', 10000)
      .click('#signIn')
      .waitForElementVisible('#credential', 10000)
      .setValue('#credential', 'Olobe')
      .waitForElementVisible('#password', 10000)
      .setValue('#password', 'olobe')
      .waitForElementVisible('#signInButton', 10000)
      .click('#signInButton')
      .waitForElementNotPresent('#signInButton', 10000)
      .assert.urlEquals('http://localhost:8000/dashboard')
      .waitForElementVisible('#nav-logout', 20000)
      .click('#nav-logout')
      .assert.urlContains('')
      .end();
  },

  'Invalid User login': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 2000)
      .waitForElementVisible('#signIn', 2000)
      .click('#signIn')
      .waitForElementVisible('#credential', 1000)
      .setValue('#credential', 'Boko')
      .assert.visible('#password')
      .setValue('#password', 'Haram')
      .waitForElementVisible('#signInButton', 2000)
      .click('#signInButton')
      .assert.visible('#signInButton', 10000)
      .assert.urlEquals('http://localhost:8000/signin')
      .end();
  }
};
