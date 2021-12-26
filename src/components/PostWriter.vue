<template>
<div>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">New Post</div>
        <input type="text" class="input" 
        v-model="title"
       data-test="title"
        />
      </div>
    </div>
  </div>
<div class="columns">
    <div class="column">
      <div 
        contenteditable 
        ref="contentEditable" 
         @input="handleInput"
         :data-test="content"
      />
    </div>
   
      <div class="column">
      <div v-html="html" />
    </div>

    </div>


   <div class="columns">
    <div class="column">
      <button 
        class="button is-primary is-pulled-right"
        data-test="submit"
        @click="save"
      >
        Submit
      </button>
    </div>
  </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref ,watch,watchEffect} from "vue";
import { Post } from "../mocks";
import { parse } from 'marked';
import highlight from 'highlight.js'
import debounce from 'lodash/debounce'
export default defineComponent({
  name: "PostWriter",
    props:{
      post:{
          type:Object as () => Post,
          required: true
      }
  },
  emits:{
    save:(post:Post)=>{
      return false
    }
  },
  setup(props,ctx){
      const title =ref(props.post.title)
      const content =ref('## Title\n Enter your post');
      const contentEditable= ref<HTMLDivElement |  null>(null)
      const html = ref('')
      // watch(content , (newContent) => {
      //   html.value= parse(newContent)
      // },{immediate:true})

      const parseHtml =(str:string)=>{
       html.value= parse(str, {
           gfm:true,
           breaks:true,
          highlight: (code: string) => {
          return highlight.highlightAuto(code).value
        }
      })
      }
     watch(content, debounce((newVal) => {
      parseHtml(newVal)
    }, 250), { immediate: true })
     const handleInput = () =>{
          if(!contentEditable.value){
          throw Error('this should never happened')
        }
       content.value = contentEditable.value.innerText || ''
     }
      onMounted(()=>{
        if(!contentEditable.value){
          throw Error('this should never happened')
        }
        contentEditable.value.innerText= content.value
      })
      const save = () =>{
           const newPost: Post = {
        ...props.post,
        title: title.value,
        html: html.value,
        markdown: content.value,
      }
      ctx.emit('save', newPost)
      }
      return{
        save,
        html,
          title,
          content,
          contentEditable,
          handleInput
      }
  }
});
</script>
<style>
.column {
  overflow-y: scroll;
}
#markdown {
  white-space: pre-wrap;
}
</style>
