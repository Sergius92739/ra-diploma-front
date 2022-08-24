import {createSlice} from '@reduxjs/toolkit';
import {IIconsState} from './interfaces';
import { TRootState } from '../../store';

const initialState: IIconsState = {
  cartClicked: false,
  searchClicked: false,
}

const menuIconstSlice = createSlice({
  name: 'iconsSlice',
  initialState,
  reducers: {
    setCartActive(state: IIconsState) {
      state.cartClicked = true
    },
    setCartNotActive(state: IIconsState) {
      state.cartClicked = false;
    },
    setSearchActive(state: IIconsState) {
      state.searchClicked = true;
    },
    setSearchNotActive(state: IIconsState) {
      state.searchClicked = false;
    }
  }
})

export const selectClickedSearch = (state: TRootState) => state.menuIcons.searchClicked;
export const selectClickedCart = (state: TRootState) => state.menuIcons.cartClicked;

export const {setCartActive, setCartNotActive, setSearchActive, setSearchNotActive} = menuIconstSlice.actions;

export const menuIconsReducer = menuIconstSlice.reducer;