var e=Object.assign;import{d as n,V as o,r as t,o as l,c as a,b as r,H as s}from"./vendor.45687041.js";var c={name:"component-doc",components:{"md-demo0":function(){const{resolveComponent:t,createVNode:l,openBlock:a,createBlock:r}=o;const{defineComponent:s,ref:c}=o,i=s({setup:()=>({value:c(4),options:new Array(12).fill("").map(((e,n)=>({value:n+1,label:`选项 ${n+1}`})))})});return n(e({render:function(e,n){const o=t("ka-select");return a(),r("div",null,[l(o,{modelValue:e.value,"onUpdate:modelValue":n[1]||(n[1]=n=>e.value=n),options:e.options},null,8,["modelValue","options"])])}},i))}()}};const i={class:"doc-content ka-doc"},u=r("pre",null,[r("code",{class:"html"},"<ka-select v-model=\"value\" :options=\"options\" />\n\n<script>\n  import { defineComponent, ref } from 'vue'\n\n  export default defineComponent({\n    setup() {\n      const value = ref(4)\n      return {\n        value,\n        options: new Array(12).fill('').map((_, i) => ({ value: i + 1, label: `选项 ${i + 1}` })),\n      }\n    },\n  })\n<\/script>\n")],-1);c.render=function(e,n,o,c,p,d){const m=t("md-demo0"),f=t("demo-container");return l(),a("section",i,[r(f,null,{source:s((()=>[r(m)])),highlight:s((()=>[u])),_:1})])};export default c;
