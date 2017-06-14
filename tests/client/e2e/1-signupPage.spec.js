module.exports = {
  'User Test': (client, done) => {
    client.resizeWindow(1280, 800, done);
    client
      .url('http://localhost:8000/')
      .waitForElementVisible('#navBar', 10000)
      .assert.title('Papyrus')
      .waitForElementVisible('.signUp', 10000)
      .click('.signUp')
      .pause(5000)
      .waitForElementVisible('#signUpPage', 10000)
      .waitForElementVisible('#firstName', 10000)
      .setValue('#firstName', 'Segun')
      .waitForElementVisible('#lastName', 2000)
      .setValue('#lastName', 'Olobe')
      .waitForElementVisible('#userName', 10000)
      .setValue('#userName', 'Olobe')
      .waitForElementVisible('#email', 10000)
      .setValue('#email', 'olo@be.com')
      .waitForElementVisible('#password', 10000)
      .setValue('#password', 'olobe')
      .waitForElementVisible('#signUpButton', 10000)
      .click('#signUpButton')
      .waitForElementVisible('#dashboardWelcome', 10000)
      .assert.urlEquals('http://localhost:8000/dashboard')
      .end();
  }
};
