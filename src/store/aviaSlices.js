import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseURL = 'https://aviasales-test-api.kata.academy';

async function getSearchId() {
    try {
        const response = await fetch(`${baseURL}/search`);
        if (!response.ok) {
            throw new Error(`Ошибка при получении searchId: ${response.statusText}`);
        }
        const data = await response.json();
        return data.searchId;
    } catch (error) {
        console.error("Ошибка в функции getSearchId:", error.message);
        return null;
    }
}

// Асинхронный экшен для получения билетов с повторными попытками
export const fetchTickets = createAsyncThunk(
    'tickets/fetchTickets',
    async (_, { rejectWithValue }) => {
        const searchId = await getSearchId();
        if (!searchId) return rejectWithValue('Не удалось получить searchId');

        let tickets = [];
        let attempts = 0;
        const maxAttempts = 5;

        // Цикл для повторных попыток получения билетов
        while (attempts < maxAttempts) {
            try {
                const response = await fetch(`${baseURL}/tickets?searchId=${searchId}`);
                const data = await response.json();

                if (data.tickets) {
                    tickets = [...tickets, ...data.tickets];
                }
                if (data.stop) {
                    break; // Завершение запроса, если пришел полный список
                }
            } catch (error) {
                console.error("Ошибка при получении билетов:", error.message);
            }
            attempts++;
        }

        // Если не удалось получить данные после всех попыток, возвращаем ошибку
        if (tickets.length === 0) {
            return rejectWithValue('Не удалось получить билеты');
        }

        return tickets;
    }
);

const aviaSlices = createSlice({
    name: "avia",
    initialState: {
        tickets: [],    // список билетов
        visibledTickets: 5,
        filters: [],     // выбранные фильтры пересадок
        sort: "cheapest",
        loading: false,
        error: null,
    },
    reducers: {
        setTickets(state, action) {
            console.log(state, action);
            state.tickets = action.payload;
        },
        setVisibledTickets(state, action) {
            console.log(state, action);
            state.visibledTickets = action.payload;
        },
        setFilter(state, action) {
            console.log(state, action);
            const filter = action.payload;
            if (state.filters.includes(filter)) {
                state.filters = state.filters.filter(f => f !== filter);
            } else {
                state.filters.push(filter);
            }
        },
        setAllFilters(state) {
            if (state.allFilters) {
                state.filters = [];
            } else {
                state.filters = [0, 1, 2, 3]; // Например, все возможные фильтры
            }
            state.allFilters = !state.allFilters;
        },
        clearFilters(state) {
            state.filters = [];
            state.allFilters = false;
        },
        setSort(state, action) {
            console.log(state, action);
            state.sort = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTickets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTickets.fulfilled, (state, action) => {
                console.log('Билеты успешно получены:', action.payload); // Логируем полученные билеты
                state.loading = false;
                state.tickets = action.payload; // Сохраняем билеты в state
            })
            .addCase(fetchTickets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setTickets,
    setFilter,
    setSort ,
    setVisibledTickets,
    clearFilters,
    setAllFilters
} = aviaSlices.actions;
export default aviaSlices.reducer;
