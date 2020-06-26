/* eslint-disable no-useless-escape */
export default {
  install: (Vue) => {
    Vue.filter('capitalize', function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    })
    Vue.filter('uppercase', function (value) {
      if (!value) return ''
      value = value.toString()
      return value.toUpperCase()
    })
    Vue.filter('lowercase', function (value) {
      if (!value) return ''
      value = value.toString()
      return value.toLowerCase()
    })
    Vue.filter('titlecase', function (value) {
      if (!value) return ''
      value = value.toString()
      value = value.replace(/([^\W_]+[^\s-]*) */g, function (s) {
        return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()
      })
      value = value.replace(/-/g, ' ')
      return value
    })
    Vue.filter('slugify', function (value) {
      if (!value) return ''
      return value
        .toString() // Cast to string
        .toLowerCase() // Convert the string to lowercase letters
        .normalize('NFD') // The normalize() method returns the Unicode Normalization Form of a given string.
        .trim() // Remove whitespace from both sides of a string
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
    })
  }
}
