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
  async (_, { rejectWithValue }) => {
    const searchId = await getSearchId()
    if (!searchId) return rejectWithValue('Не удалось получить searchId')

    let tickets = []
    let attempts = 0
    let failedAttempts = 0
    const maxAttempts = 10
    let stop = false

    while (!stop && attempts < maxAttempts) {
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
        }

        stop = data.stop

        failedAttempts = 0
      } catch (error) {
        attempts++

        failedAttempts++

        if (failedAttempts >= 3) {
          console.error(
            `Ошибка при получении билетов: слишком много неудачных попыток подряд (${failedAttempts})`
          )
        } else {
          console.log('Ошибка при получении билетов:', error.message)
        }
        if (failedAttempts >= 5) {
          break
        }
      }
    }

    if (tickets.length === 0) {
      return rejectWithValue('Не удалось получить билеты')
    }

    return tickets
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
        state.tickets = action.payload
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
