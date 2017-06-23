 /**
 * Get the pagination metaData
 * Disclaimer: this method was copied from andele-angene
 *
 * @export
 * @param {Number} rows number of documents on a page
 * @param {Number} count total result
 * @param {req} req
 * @returns {Object} pagination metaData
 */
export default function paginate(rows, count, req) {
  const limit = req.query.limit > 0 ? req.query.limit : '8';
  const offset = req.query.offset > 0 ? req.query.offset : '0';
  return {
    totalCount: count,
    pages: Math.ceil(count / limit),
    currentPage: Math.floor(offset / limit) + 1,
    pageSize: rows.length,
  };
}
