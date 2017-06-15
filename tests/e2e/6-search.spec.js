module.exports = {
  'Search for document(s)': (client) => {
    client
      .url('http://localhost:8000')
      .assert.title('Papyrus')
      .assert.urlEquals('http://localhost:8000/')
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
      .assert.visible('input[type=search]')
      .setValue('input[type=search]', 'ee')
      .waitForElementVisible('h5', 10000)
      .assert.containsText('#dashboardWelcome', 'All Documents')
      .keys(client.Keys.ENTER);
  },

  'Search for user(s)': (client) => {
    client
      .click('#manage-users')
      .assert.urlContains('users')
      .assert.visible('input[type=search]')
      .setValue('input[type=search]', 'ee')
      .waitForElementVisible('h5', 10000)
      .assert.containsText('h5', 'Manage Users')
      .keys(client.Keys.ENTER)
      .click('#nav-logout')
      .assert.urlContains('')
      .end();
  },
};
