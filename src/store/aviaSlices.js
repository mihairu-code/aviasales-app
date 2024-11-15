import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const baseURL = 'https://aviasales-test-api.kata.academy'

async function getSearchId() {
  try {
    const response = await fetch(`${baseURL}/search`)
    if (!response.ok) {
      throw new Error(`Ошибка при получении searchId: ${response.statusText}`)
    }
    const data = await response.json()
    return data.searchId
  } catch (error) {
    console.error('Ошибка в функции getSearchId:', error.message)
    return null
  }
}

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (_, { rejectWithValue, dispatch }) => {
    const searchId = await getSearchId()
    if (!searchId) return rejectWithValue('Не удалось получить searchId')

    let tickets = []
    let failedAttempts = 0

    const fetchBatch = async () => {
      try {
        const response = await fetch(`${baseURL}/tickets?searchId=${searchId}`)
        if (!response.ok) {
          throw new Error(
            `Ошибка при получении билетов: ${response.statusText}`
          )
        }

        const data = await response.json()
        if (data.tickets) {
          tickets = [...tickets, ...data.tickets]
          dispatch(setTickets(tickets))
        }

        if (data.stop) {
          return tickets
        }

        failedAttempts = 0
        return fetchBatch()
      } catch (error) {
        failedAttempts++

        if (failedAttempts >= 5) {
          console.error(
            `Ошибка при получении билетов: слишком много неудачных попыток подряд (${failedAttempts})`
          )
          return tickets
        }

        return fetchBatch()
      }
    }

    const allTickets = await fetchBatch()

    if (allTickets.length === 0) {
      return rejectWithValue('Не удалось получить билеты')
    }

    return allTickets
  }
)

const aviaSlices = createSlice({
  name: 'avia',
  initialState: {
    tickets: [],
    visibledTickets: 5,
    filters: [0, 1, 2, 3],
    availableFilters: 4,
    allFilters: true,
    sort: 'Самый дешевый',
    loading: false,
    error: null,
  },
  reducers: {
    setTickets(state, action) {
      state.tickets = action.payload
    },
    setVisibledTickets(state, action) {
      state.visibledTickets = action.payload
    },
    setAllFilters(state) {
      const isAllActive = !state.allFilters
      state.allFilters = isAllActive

      if (isAllActive) {
        state.filters = [0, 1, 2, 3]
      } else {
        state.filters = []
      }
    },
    setFilter(state, action) {
      const filterId = action.payload

      if (filterId === 'all') {
        const isAllActive = !state.allFilters
        state.allFilters = isAllActive

        if (isAllActive) {
          state.filters = [0, 1, 2, 3]
        } else {
          state.filters = []
        }
      } else {
        if (state.filters.includes(filterId)) {
          state.filters = state.filters.filter((id) => id !== filterId)
        } else {
          state.filters.push(filterId)
        }

        state.allFilters = state.filters.length === 4
      }
    },
    clearFilters(state) {
      state.filters = []
      state.allFilters = false
    },
    setSort(state, action) {
      state.sort = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        console.log('Билеты успешно получены:', action.payload)
        state.loading = false
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const {
  setTickets,
  setFilter,
  setSort,
  setVisibledTickets,
  clearFilters,
  setAllFilters,
} = aviaSlices.actions
export default aviaSlices.reducer
