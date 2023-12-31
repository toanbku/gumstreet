import { Input } from "@/components/ui/input";
import { DataTable } from "./data-table";
import { Payment, columns } from "./columns";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      status: "Sold",
      revenue: 100,
      prices: 35,
      email: "minhle@example.com",
    },
    {
      id: "da2421g2",
      status: "For Sale",
      revenue: 75,
      prices: 25,
      email: "minhlai@example.com",
    },
    {
      id: "88fas56s",
      status: "Sold",
      revenue: 60,
      prices: 60,
      email: "leduy@example.com",
    },
    // ...
  ];
}

export default async function StatisticsTable() {
  const data = await getData();

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
