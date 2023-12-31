import { DataTable } from "./data-table";
import { columns } from "./columns";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { Separator } from "@/components/ui/separator";

const getPurchaseHistory = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:3000/api/history", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export default function PurchaseHistory() {
  const { connected } = useWallet();

  const {
    data: dataPurchaseHistory,
    error: errorPurchaseHistory,
    isLoading: loadingPurchaseHistory,
  } = useQuery<any>({
    queryFn: () => getPurchaseHistory(),
    queryKey: ["purchase-history"],
    // Refetch the data every second
    refetchInterval: connected ? 20000 : 0,
  });

  return (
    <div>
      <h1 className="text-3xl md:text-4xl mb-3 md:mb-6 font-bold">
        Purchase history
      </h1>
      <Separator className="my-3 md:my-6" />
      {connected ? (
        <>
          {loadingPurchaseHistory ? (
            <div className="text-lg font-medium">Loading...</div>
          ) : errorPurchaseHistory ? (
            <div className="text-lg font-medium">Empty</div>
          ) : (
            <DataTable columns={columns} data={dataPurchaseHistory || []} />
          )}
        </>
      ) : (
        <div className="text-lg font-medium">
          Please login to check your purchase history
        </div>
      )}
    </div>
  );
}
