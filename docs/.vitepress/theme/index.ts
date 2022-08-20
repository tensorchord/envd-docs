import { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import CustomTitle from '../components/CustomTitle.vue'
import Author from '../components/Author.vue'
import "./custom.css"

export default {
  ...DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app
      .component('CustomTitle', CustomTitle)
      .component('Author', Author)
  },
}
