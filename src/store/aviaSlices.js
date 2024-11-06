import ticketsArray from "./../configuration.js";
import { createSlice } from "@reduxjs/toolkit";

const aviaSlices = createSlice({
    name: "avia",
    initialState: {
        tickets: ticketsArray,     // список билетов
        visibledTickets: 5,
        filters: [],     // выбранные фильтры пересадок
        sort: "cheapest" // сортировка (например, по умолчанию "cheapest" — самый дешевый)
    },
    reducers: {
        setTickets(state, action) {
            console.log(state, action);
            state.tickets = action.payload;
        },
        setVisibledTickets(state, action) {
            state.visibledTickets = action.payload;
        },
        setFilter(state, action) {
            const filter = action.payload;
            // Если фильтр уже есть, удаляем его
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
            state.sort = action.payload;
        }
    }
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
