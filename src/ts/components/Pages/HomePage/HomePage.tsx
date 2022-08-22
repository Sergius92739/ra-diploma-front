import { TopSales } from "../../Main/TopSales/TopSales";
import { Catalog } from "../../Main/Catalog/Catalog";

export function HomePage(): JSX.Element {
  return (
    <>
      <TopSales />
      <Catalog>
        {null}
      </Catalog>
    </>
  )
}