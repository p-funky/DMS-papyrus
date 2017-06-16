module.exports = {
  beforeEach(client, done) {
    client.resizeWindow(1280, 800, done);
  },
  'Edit user profile and delete account': (client) => {
    client
      .url('http://localhost:8000')
      .assert.title('Papyrus')
      .assert.urlEquals('http://localhost:8000/')
      .waitForElementVisible('#navBar', 10000)
      .waitForElementVisible('#signIn', 10000)
      .click('#signIn')
      .assert.urlEquals('http://localhost:8000/signin')
      .setValue('input#credential', 'Olobe')
      .setValue('input#password', 'olobe')
      .waitForElementVisible('#signInButton', 10000)
      .click('#signInButton')
      .waitForElementVisible('#dashboardWelcome', 10000)
      .assert.urlEquals('http://localhost:8000/dashboard')
      .waitForElementVisible('#nav-mobile', 10000)
      .click('#nav-mobile')
      .waitForElementVisible('#menu-profile', 10000)
      .click('#menu-profile')
      .waitForElementVisible('#my-profile', 10000)
      .waitForElementVisible('#edit-profile', 10000)
      .click('#edit-profile')
      .waitForElementVisible('.modal-content', 20000)
      .waitForElementVisible('input#userName', 10000)
      .waitForElementVisible('input#firstName', 10000)
      .waitForElementVisible('input#lastName', 10000)
      .waitForElementVisible('input#email', 10000)
      .waitForElementVisible('input#password', 10000)
      .clearValue('input#email')
      .setValue('input#email', 'kakashi@konoha.com')
      .clearValue('input#firstName')
      .setValue('input#firstName', 'Kakashi')
      .click('#update')
      .waitForElementNotVisible('#update', 10000)
      .assert.urlEquals('http://localhost:8000/me')
      .waitForElementVisible('#delete-account', 20000)
      .click('#delete-account')
      .waitForElementVisible('#delete', 20000)
      .click('#delete')
      .waitForElementNotVisible('#delete', 20000)
      .assert.urlContains('http://localhost:8000/me')
      .end();
  },
};
