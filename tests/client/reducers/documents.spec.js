import expect from 'expect';
import * as types from '../../../client/actions/types';
import documentReducer from '../../../client/reducers/documents';

describe('Document reducer', () => {
  it('should handle GET_ALL_DOCUMENTS', () => {
    expect(documentReducer([], { type: types.GET_ALL_DOCUMENTS,
      allDocuments: { count: 10 },
    }))
    .toEqual({ count: 10 });
  });

  it('should handle SEARCH_DOCUMENTS', () => {
    expect(documentReducer([], { type: types.SEARCH_DOCUMENTS,
      documents: { totalCount: 2 },
    }))
    .toEqual({ totalCount: 2 });
  });

  it('should handle DELETE_DOCUMENT', () => {
    expect(documentReducer({ documents: [{ title: 'Sugar', content: 'sweet', id: 3 }] },
      { type: types.DELETE_DOCUMENT, document: { Document: { id: 3 } } })
    ).toEqual({ settings: undefined, documents: [] });
  });

  it('should handle GET_MY_DOCUMENTS', () => {
    expect(documentReducer([], { type: types.GET_MY_DOCUMENTS,
      myDocuments: { count: 3 },
    }))
    .toEqual({ count: 3 });
  });

  it('should handle ADD_DOCUMENT', () => {
    expect(documentReducer({ documents: [{ title: 'Sugar', content: 'sweet', id: 3 }] },
      { type: types.ADD_DOCUMENT, document: { title: 'Honey', content: 'delicious' } })
      .documents.length
    ).toEqual(2);
  });
  it('should handle ADD_MY_DOCUMENT', () => {
    expect(documentReducer({ documents: [{ title: 'Sugar', content: 'sweet', id: 3 }] },
      { type: types.ADD_MY_DOCUMENT, document: { title: 'Honey', content: 'delicious' } })
      .documents.length
    ).toEqual(2);
  });
});
