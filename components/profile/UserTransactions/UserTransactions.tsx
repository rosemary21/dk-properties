"use client";
import { TransactionListProps } from "@/types";
import { useState } from "react";
import { Grid } from "@mantine/core";
import UserTransactionCard from "../UserTransactionCard/UserTransactionCard";
import { useQuery } from "@tanstack/react-query";
import TransactionService from "@/services/Transaction";

export default function UserTransactions() {
  const [transactions, setTransactions] = useState<TransactionListProps[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const pageSize = 10;
  const { getUserTransactions } = TransactionService();

  const {} = useQuery({
    queryFn: () => getUserTransactions(pageNo, pageSize),
    queryKey: ["getUserTransactions", { pageNo }],
  });
  
  return (
    <div className="my-5 w-full">
      {transactions.length === 0 ? (
        <h4 className="text-center">No Transactions yet</h4>
      ) : (
        <div>
          <h4 className="text-center">All Transactions</h4>
          <Grid className="my-6">
            {transactions &&
              transactions.map((transaction) => (
                <Grid.Col
                  span={{ base: 12, md: 6, lg: 3 }}
                  key={transaction.id}
                  className="mt-3"
                >
                  <UserTransactionCard transaction={transaction} />
                </Grid.Col>
              ))}
          </Grid>
          {/* <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageChange}
            pageRangeDisplayed={windowWidth() !== "sm" ? 5 : 2}
            pageCount={pageSize}
            previousLabel="< prev"
            renderOnZeroPageCount={null}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeClassName="active"
            previousClassName="page-item"
            nextClassName="page-item"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
          /> */}
          {/* {error && <ErrorModal errorMsg={error} closeModal={setError} />} */}
        </div>
      )}
    </div>
  );
}
