 /**
 * Get the pagination metaData
 * Disclaimer: this method was copied from andele-angene
 *
 * @export
 * @param {Number} rows number of documents on a page
 * @param {Number} count total result
 * @param {Number} limit limit per page
 * @param {Number} offset the offset
 * @returns {Object} pagination metaData
 */
export default function paginate(rows, count, limit, offset) {
  return {
    totalCount: count,
    pages: Math.ceil(count / limit),
    currentPage: Math.floor(offset / limit) + 1,
    pageSize: rows.length,
  };
}
