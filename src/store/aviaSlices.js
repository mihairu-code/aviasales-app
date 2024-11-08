import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('aviaState')
    return serializedState ? JSON.parse(serializedState) : undefined
  } catch (e) {
    console.warn('Не удалось загрузить состояние из localStorage', e)
    return undefined
  }
}

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('aviaState', serializedState)
  } catch (e) {
    console.error('Не удалось сохранить состояние в localStorage', e)
  }
}

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
    const maxAttempts = 5

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(`${baseURL}/tickets?searchId=${searchId}`)
        const data = await response.json()

        if (data.tickets) {
          tickets = [...tickets, ...data.tickets]
        }
        if (data.stop) {
          break
        }
      } catch (error) {
        console.error('Ошибка при получении билетов:', error.message)
      }
      attempts++
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
    filters: [],
    availableFilters: 4,
    allFilters: false,
    sort: 'cheapest',
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
        // Логика для кнопки "Все"
        const isAllActive = !state.allFilters
        state.allFilters = isAllActive

        if (isAllActive) {
          // Если "Все" активировано, устанавливаем все фильтры
          state.filters = [0, 1, 2, 3]
        } else {
          // Если "Все" деактивировано, сбрасываем все фильтры
          state.filters = []
        }
      } else {
        // Логика для других фильтров
        if (state.filters.includes(filterId)) {
          // Если фильтр уже активен, отключаем его
          state.filters = state.filters.filter((id) => id !== filterId)
        } else {
          // Если фильтр не активен, активируем его
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
        saveToLocalStorage(state)
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        loadFromLocalStorage()
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
