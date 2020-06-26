import vendor from '../collection.json'

export default {
  methods: {
    $_collection_getVendor () {
      return vendor.collection
    },
    async $_collection_getCollection (url) {
      try {
        const response = await fetch(url)
        const data = await response.json()
        const theme = {
          themeName: data.name,
          baseUrl: data.baseUrl
        }
        const collection = []
        data.components.forEach(el => {
          // inject path
          const route = '/collection/' + this.$transform.slugify(theme.themeName) + '/' + this.$transform.slugify(el.group) + '/' + this.$transform.slugify(el.name)
          const path = {
            collectionPath: route,
            url: theme.baseUrl + el.path,
            route: route
          }
          collection.push({ ...theme, ...el, ...path })
        })
        return collection
      } catch (e) {
        console.log(e)
      }
    },
    $_collection_filterGroups (components) {
      const array = components.map(component => {
        const obj = {}
        obj.name = component.group
        obj.themeName = component.themeName
        obj.route = '/collection/' + this.$transform.slugify(component.themeName) + '/' + this.$transform.slugify(component.group)
        return obj
      })

      const uniqueGroup = array.filter((component, index, self) =>
        index === self.findIndex((t) => (
          t.name === component.name
        ))
      )

      return uniqueGroup
    },
    $_collection_filterThemes (components) {
      const array = components.map(component => {
        const obj = {}
        obj.name = component.themeName
        obj.path = '/collection/' + this.$transform.slugify(component.themeName)
        return obj
      })

      const uniqueTheme = array.filter((component, index, self) =>
        index === self.findIndex((t) => (
          t.name === component.name
        ))
      )

      return uniqueTheme
    }
  }
}
