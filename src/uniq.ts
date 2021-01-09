interface Array<T> {
  /**
   * Returns a list of unique values
   */
  uniq(): T
  /**
   * Returns a list of unique values of a given object field
   */
  uniq<O>(field: string): O[]
  /**
   * Returns a list of unique values of a field extracted from the objects using a mapper function
   */
  uniq<O extends Comparable>(mapper: MapperFunc<T, O>): O[]
}

if (Array.prototype.uniq === undefined) {
  Array.prototype.uniq = function<T, O extends Comparable>(
    this: T[],
    fieldOrMapper: null | string | MapperFunc<T, O> = null
  ) {
    return [...new Set(this.map(item => {
      if (typeof fieldOrMapper === 'function') {
        return fieldOrMapper(item)
      } else {
        return fieldOrMapper ? item[fieldOrMapper] : item
      }
    }))]
  }
}
