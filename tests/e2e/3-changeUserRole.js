module.exports = {
  beforeEach(client, done) {
    client.resizeWindow(1280, 800, done);
  },
  'Admin login and promote user To admin': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('#navBar', 10000)
      .assert.title('Papyrus')
      .waitForElementVisible('#signIn', 10000)
      .click('#signIn')
      .waitForElementVisible('#credential', 10000)
      .setValue('#credential', 'Pfunky')
      .waitForElementVisible('#password', 10000)
      .setValue('#password', 'password')
      .waitForElementVisible('#signInButton', 10000)
      .click('#signInButton')
      .waitForElementNotPresent('#signInButton', 10000)
      .assert.urlEquals('http://localhost:8000/dashboard')
      .waitForElementVisible('#manage-users', 10000)
      .click('#manage-users')
      .pause(1000)
      .assert.urlContains('manage-users')
      .waitForElementVisible('button#edit-role', 15000)
      .click('button#edit-role')
      .pause(1000)
      .click('button#edit-role')
      .pause(1000)
      .waitForElementVisible('#logout', 10000)
      .click('#logout')
      .end();
  },
};
