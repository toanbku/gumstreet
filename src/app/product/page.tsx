"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "./style.css";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { AiFillStar, AiOutlineDollar, AiOutlineStar } from "react-icons/ai";
import { Input } from "@/components/ui/input";

export default function Product() {
  const form = useForm();
  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <Card className="h-5/6 w-5/6 flex flex-wrap border-2 border-black">
        <div className="h-1/2 w-full bg-zinc-600 rounded-t-md"></div>
        <div className="w-2/3 h-1/2 lg:border-r border-black rounded-es-md float-left bg-lime-200">
          <CardHeader>
            <CardTitle>Name Product</CardTitle>
            <CardDescription>Description ...</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <FormField
                control={form.control}
                name="Buy"
                render={(field) => (
                  <FormItem className="border border-black p-3 rounded-md ">
                    <FormControl>
                      <div className="flex flex-row items-center flex-wrap">
                        <div className="flex flex-row items-center">
                          <AiOutlineDollar className="" />
                          1000
                        </div>
                        <div className="URL ml-3">
                          nguyenxuananhuong.com/nameproduct
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </Form>
          </CardContent>
          <CardFooter>
            <p className="mr-2">Rating</p> <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </CardFooter>
        </div>
        <div className="w-1/3 h-1/2 float-right flex flex-col rounded-ee-md justify-center items-center gap-4 p-2 bg-red-200">
          <Button className="m5 w-2/3 hover:bg-slate-500 border-black border ">
            Buy it{" "}
          </Button>
          <p className="flex h-10 justify-center">
            <AiOutlineDollar className="h-auto w-[30px] mx-2" />
            <Input
              type="text"
              className="border boder-black"
              placeholder="You can pay more if you want "
            />
          </p>
        </div>
      </Card>
    </main>
  );
}