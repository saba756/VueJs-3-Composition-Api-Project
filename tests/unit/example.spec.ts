
import { Store } from '../../src/store';
import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import TimeLine from '../../src/components/TimeLine.vue';
import {today, thisWeek, thisMonth} from '../../src/mocks'
jest.mock('axios', () => ({
  get: (url: string) => {
    return Promise.resolve({
      data: [today, thisWeek, thisMonth]
    })
  }
}))
function mountTimeLine(){
  const store= new Store({
    posts:{
      ids:[],
      all:new Map(),
      loaded:false
    }
  })
  const testComp={
    components:{TimeLine},
    template: `
    <suspense>
  <template #default>
   <TimeLine/>
  </template>
  <template #fallback>
   ...Loading
  </template>
  </suspense>
    `
  }
  return mount(testComp,{
    global:{
      plugins:[store]
    }
  });
}
describe ('TimeLine', ()=>{
  it('require today post by deafult', async()=>{
   const wrapper= mountTimeLine();
    //console.log(wrapper.html())
    //for internal promises we used  //await nextTick();
    await flushPromises() // for external promises like axios
    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
  })
  it('update when the period is clicked', async ()=>{
    const wrapper= mountTimeLine();
    await flushPromises()
  await  wrapper.get('[data-test="This Week"]').trigger('click')
    // wait fot the next frame
     //await nextTick();
    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
  })

  it('update when the period is clicked', async ()=>{
     const wrapper= mountTimeLine();
     await flushPromises() 
  await  wrapper.get('[data-test="This Month"]').trigger('click')
    // wait fot the next frame
     //await nextTick();
    
    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisMonth.created.format('Do MMM'))
  })
});