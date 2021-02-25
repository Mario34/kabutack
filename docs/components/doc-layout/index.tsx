import { ref, defineComponent, onUpdated } from 'vue';
import { RouterView } from 'vue-router';
import './index.scss';

const DocLayout = defineComponent({
  name:'DocLayout',
  props: {
    navConfig: {
      type: Array,
    },
  },
  setup() {
    const catalogue = ref();
    const scrollBox = ref();

    onUpdated(() => {
      scrollBox.value.scrollTop = 0;
    });

    return () => {
      return (
        <div class='doc-page'>
          <div class='doc-page__container'>
            <div
              class='doc-page__router-view'
              ref={scrollBox}
            >
              <div class='doc-page__router-view-doc markdown-body'>
                <RouterView />
              </div>
              <div class='doc-page__catalogue' ref={catalogue} />
            </div>
          </div>
        </div>
      );
    };
  },
});

export default DocLayout;
