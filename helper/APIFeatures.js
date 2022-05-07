class APIFeatures {
  constructor(surov, surovUrl) {
    this.surov = surov;
    this.surovUrl = surovUrl;
  }
  filter() {
    const query = { ...this.surovUrl };
    const removeQuery = ['sort', 'page', 'limit', 'field'];
    removeQuery.forEach((val) => delete query[val]);
    const queryStr = JSON.stringify(query)
      .replace(/\bgt\b/g, '$gt')
      .replace(/\bgte\b/g, '$gte')
      .replace(/\blt\b/g, '$lt')
      .replace(/\blte\b/g, '$lte');
    this.surov = this.surov.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.surovUrl.sort) {
      const querySort = this.surovUrl.sort.split(',').join(' ');
      this.surov = this.surov.sort(querySort);
    }
    return this;
  }
  field() {
    if (this.surovUrl.field) {
      const queryField = this.surovUrl.field.split(',').join(' ');
      this.surov = this.surov.select(queryField);
    } else {
      this.surov = this.surov.select('-__v');
    }
    return this;
  }
  pagination() {
    const page = this.surovUrl.page * 1 || 1;
    const limit = this.surovUrl.limit * 1 || 3;
    const skip = (page - 1) * limit;
    this.surov = this.surov.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
