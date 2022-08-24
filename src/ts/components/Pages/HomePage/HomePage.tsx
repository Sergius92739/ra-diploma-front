import { TopSales } from "../../Main/TopSales/TopSales";
import { Catalog } from "../../Main/Catalog/Catalog";
import { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/hooks";
import { resetForm } from "../../../slices/catalogSlice/catalogSlice";

export function HomePage(): JSX.Element {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(resetForm());
  }, [])

  return (
    <>
      <TopSales />
      <Catalog>
        {null}
      </Catalog>
    </>
  )
}