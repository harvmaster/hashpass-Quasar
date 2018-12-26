<template>
  <q-page class="flex flex-center">
    <div>
      <div>
        <img class="flex" alt="Quasar logo" src="~assets/HashpassIcon.svg">
        <q-field>
          <q-input v-model="secret" type="password" name="secret" float-label="Password" />
          <q-input v-model="service" name= "service" float-label="Service" />
          <q-btn class="q-mt-md" :loading=false @click="hashIt(secret, service)" label="Generate Password" color="secondary">
          </q-btn>
        </q-field>
        <q-field color="secondary" v-if="visible" class="q-mt-lg">{{ result }}<q-btn class="q-ml-lg" icon="assignment" :loading=false @click="doCopy()" label="" color="secondary" v-if="visible">
          </q-btn></q-field>
      </div>
      <transition
          enter-active-class="animated bounceInLeft"
          leave-active-class="animated bounceOutRight"
          appear
        >
          <q-alert
            v-if="hashalert"
            color="secondary"
            icon="lock"
            appear
            :actions="[{ label: 'X', handler: () => { hashalert = false } }]"
            class="q-mt-xl"
          >
            {{ alert }}
          </q-alert>
        </transition>
      </div>
  </q-page>
</template>

<script>
import { hash } from '../plugins/hashpass.js'
// import { utils } from 'quasar'
export default {
  data () {
    return {
      loading: false,
      hashalert: false,
      secret: '',
      service: '',
      result: '',
      alert: '',
      visible: false
    }
  },
  methods: {
    hashIt (hashSecret, hashService) {
      this.loading = true
      this.result = hash(hashSecret, hashService)
      this.loading = false
      this.hashalert = true
      this.alert = 'Your password has been copied to clipboard!'
      this.visible = true
      setTimeout(() => {
        this.hashalert = false
      }, 3000)
      this.doCopy()
    },
    doCopy () {
      this.$copyText(this.result).then((e) => {
        // this.alert = 'Copied to clipboard'
        this.hashalert = true
        setTimeout(() => {
          this.hashalert = false
        }, 1500)
        console.log(e)
      }, function (e) {
        this.alert = 'Failed to copy to clipboard'
        console.log(e)
      })
    }
  },
  components: {

  }
}
</script>
