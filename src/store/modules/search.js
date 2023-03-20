export default {
  namespaced: true,
  state: () => ({
    historys: []
  }),
  mutations: {
    addHistory(state, newHistory) {
      const isFindIndex = state.historys.findIndex((item) => item === newHistory)
      if (isFindIndex !== -1) {
        state.historys.splice(isFindIndex, 1)
      }
      state.historys.unshift(newHistory)
    },
    deleteHistory(state, index) {
      state.historys.splice(index, 1)
    },
    deleteAllHistory(state) {
      state.historys = []
    }
  }
}