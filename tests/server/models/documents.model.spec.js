import chai from 'chai';
import db from '../../../server/models/index';

const expect = chai.expect;

describe('Documents Model', () => {
  before((done) => {
    db.Documents.create({
      title: '777',
      content: `
      Allister Crowley considered as the most wicked man that ever
      lived wrote this book. It is more or less an occultic book
      filled with a lot of wickedness and perversion. He claims that
      there is virtue in children and it can be tapped through
      sexual intercourse with them.
      `,
      accessId: 1,
      ownerId: 5
    });
    done();
  });
  describe('Validation', () => {
    it('should require a title field to create a document', () => {
      db.Documents.create({ content: 'honey' })
        .catch((error) => {
          expect(/notNull Violation: title cannot be null/
            .test(error.message)).to.be.true;
        });
    });

    it('should require a unique title field to create a document', () => {
      db.Documents.create({ title: '777' })
        .catch((error) => {
          expect(/SequelizeUniqueConstraintError/
            .test(error.name)).to.be.true;
          expect(error.errors[0].message)
            .to.eql('Note: Document with same title or exists');
        });
    });

    it('should require valid access as integer', () => {
      db.Documents.create({ title: 'Invalid access', accessId: '2' })
        .catch((error) => {
          expect(/SequelizeDatabaseError/
            .test(error.message)).to.be.true;
        });
    });

    it('should ensure title cannot be empty', (done) => {
      db.Documents.create({ title: '' })
        .catch((error) => {
          expect(/Validation error: Validation notEmpty failed/
            .test(error.message)).to.be.false;
        });
      done();
    });
  });

  describe('Create Document', () => {
    it('should create a new document', (done) => {
      db.Documents.create({
        title: 'Oliver Twist',
        content: 'A young boy who is hungry and never gets satisfied',
        accessId: 1,
        ownerId: 5
      }).then((document) => {
        expect(document.title).to.eql('Oliver Twist');
      });
      done();
    });
  });
  describe('Update Document', () => {
    it('should update a created document', (done) => {
      db.Documents.findById(20)
        .then((document) => {
          const updatedAt = document.updatedAt;
          document.update({
            title: 'Bible',
            content: `
              The one and only officially certified compendium that God gave
              to man but through men. Written and compiled by man by
              inspiration of God.
            `
          }).then((updatedDocument) => {
            expect(updatedDocument.title).to.eql('Bible');
            expect(updatedDocument.content).to.eql(`
              The one and only officially certified compendium that God gave
              to man but through men. Written and compiled by man by
              inspiration of God.
            `);
            expect(updatedDocument.updatedAt).to.not.eql(updatedAt);
          });
          done();
        });
    });
  });

  describe('Retrieve Document', () => {
    it('should find a created document', (done) => {
      db.Documents.findById(2)
        .then((document) => {
          expect(document.title).to.eql('Un ciodo');
          done();
        });
    });
  });

  describe('Delete Document', () => {
    it('should delete a created document', (done) => {
      db.Documents.destroy({ where: { id: 21 } })
        .then(() => {
          db.Documents.findById(21)
            .then((document) => {
              expect(document).to.be.a('null');
              done();
            });
        });
    });
  });
});
