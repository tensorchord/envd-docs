<script setup lang="ts">
import { useData,DefaultTheme } from 'vitepress'
import VPSocialLinks from 'vitepress/client/theme-default/components/VPSocialLinks.vue'

const { frontmatter } = useData()
const socialLinks:DefaultTheme.SocialLink[] = []
Object.keys(frontmatter.value).forEach((key:any) => {
  if(['twitter', 'github', 'discord'].includes(key)) {
    socialLinks.push({
      link: frontmatter.value[key],
      icon: key
    })
  }
})
</script>

<template>
<div class="author">
  <img  class="avatar" :src="frontmatter.avatar" />
  <div class="info">
    <span class="name">{{frontmatter.author}}</span>
    <span>{{frontmatter.introduction}}</span>
    <VPSocialLinks :links="socialLinks" />
  </div>
</div>
</template>

<style>
.author {
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 1rem;
}
.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.name {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--vp-c-brand);
}
</style>