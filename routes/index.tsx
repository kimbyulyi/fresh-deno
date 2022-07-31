/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Price } from "../types/coin.types.ts";

const API_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";

export const handler: Handlers<Price | null> = {
  async GET(_, ctx) {
    const response = await fetch(API_URL);
    if (response.status === 200) {
      const price: Price = await response.json();
      return ctx.render(price);
    }
    return ctx.render(null);
  },
};

export default function Home({ data }: PageProps<Price | null>) {
  if (!data) {
    return <h1>Data is not available</h1>;
  }

  return (
    <div class={tw`w-screen h-screen bg-gray-300`}>
      <div class={tw`p-8 mx-auto max-w-screen-md`}>
        <span width="200px" class="mx-auto">
          <p class={tw`my-10 text(center 3xl white)`}>Bitcoint Price Checker</p>
          <p class={tw`my-10 text(center 2xl white)`}>
            USD: ${data.bpi.USD.rate}
          </p>
          <p class={tw`my-10 text(center 2xl white)`}>
            EUR: ${data.bpi.EUR.rate}
          </p>
          <p class={tw`my-10 text(center 2xl white)`}>
            GBP: ${data.bpi.GBP.rate}
          </p>
          <p class={tw`my-10 text(center 1xl white)`}>
            Last Fetched at {data.time.updated}
          </p>
        </span>
      </div>
    </div>
  );
}
