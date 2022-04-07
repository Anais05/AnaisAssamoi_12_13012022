/**
 * @class Performance
 * @description performnce model
 * @constructor
 * @param {object} data user performance data
*/
export default class Performance {
  userId;
  kind;
  data;

  constructor(data) {
    this.userId = data.userId;
    this.kind = data.kind;
    this.data = data.data.map((item) => ({
      value: item.value,
      kind: this.kind[item.kind],
    }));
  }
}