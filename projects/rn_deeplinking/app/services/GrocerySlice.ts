import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API } from '../../config';

interface GroceryItem {
  id: number;
  name: string;
}

interface GroceryState {
  selectedItem: GroceryItem | null;
  items: GroceryItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: GroceryState = {
  selectedItem: null,
  items: [],
  status: 'idle',
  error: null,
};

export const fetchGroceryItems = createAsyncThunk('grocery/fetchGroceryItems', async () => {
  const response = await axios.get(`${BASE_API}/api/grocery`);
  return response.data;
});

export const fetchGroceryItemById = createAsyncThunk('grocery/fetchGroceryItemById', async (id: number) => {
  const response = await axios.get(`${BASE_API}/api/grocery/${id}`);
  return response.data;
});

export const saveGroceryItem = createAsyncThunk('grocery/saveGroceryItem', async (item: GroceryItem) => {
  await axios.post(`${BASE_API}/api/grocery`, item);
  return item;
});

const GrocerySlice = createSlice({
  name: 'grocery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroceryItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGroceryItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchGroceryItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch groceries';
      })
      .addCase(fetchGroceryItemById.pending, (state) => {
        state.status = 'loading';
        state.selectedItem = null;
      })
      .addCase(fetchGroceryItemById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedItem = action.payload;
      })
      .addCase(fetchGroceryItemById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || `Failed to fetch grocery item`;
      })
      .addCase(saveGroceryItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
}).reducer;

export default GrocerySlice;
