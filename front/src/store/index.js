import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        member: null,
        loggedIn: false,
        trenings: []
    },

    mutations:{
        getTrenings(state, trenings){
            state.trenings = trenings;
        },

        login(state, member) {
            state.member = member;
            state.loggedIn = true;
          },
    },

    actions:{
        fetchTrenings({ commit }) {
            fetch('http://127.0.0.1:8080/api/trenings', {method: 'GET'})
              .then( obj => obj.json() )
                .then( res => commit('getTrenings', res.trenings) );
          },
    }
})