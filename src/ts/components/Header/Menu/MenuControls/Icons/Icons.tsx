import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/hooks"
import { Paths } from "../../../../../Paths";
import { selectCatalogSearch } from "../../../../../slices/catalogSlice/catalogSlice";
import { selectClickedCart, selectClickedSearch, setCartActive, setSearchActive, setSearchNotActive } from "../../../../../slices/menuIconsSlice/menuIconsSlice";

export function Icons(): JSX.Element {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectCatalogSearch);
  const clickedSearch = useAppSelector(selectClickedSearch);
  const clickedCatr = useAppSelector(selectClickedCart);
  const navigate = useNavigate();

  const onSearchClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (clickedSearch && search) {
      navigate(Paths.CATALOG)
    } else {
      dispatch(setSearchNotActive())
    }

    if (!clickedSearch) {
      dispatch(setSearchActive())
    }
  }

  return (
    <div className="header-controls-pics">
      <div onClick={onSearchClick} data-id="search-expander" className="header-controls-pic header-controls-search"></div>
      <div className="header-controls-pic header-controls-cart">
        <div className="header-controls-cart-full">1</div>
        <div className="header-controls-cart-menu"></div>
      </div>
    </div>
  )
}