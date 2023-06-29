"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { AiOutlineDollar } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  uploadfile: z.string().min(1, {
    message: "Upload file is required.",
  }),
  uploadthumnail: z.string().min(1, {
    message: "Upload thumbnail is required.",
  }),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
});

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formatFormData = {
      title: data.name,
      description: data.description,
      price: Number(data.price),
      file: "/assets/example.png", //TODO: support upload file
      image: "https://imgur.com/M0l5SDh.png", //TODO: support upload file
    };
    console.log("formatFormData: ", formatFormData);

    const token = localStorage.getItem("token");
    const response = await axios.post(
      "https://gumstreet.vercel.app/api/assets",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("response: ", response);
    form.reset();
  }

  return (
    <ScrollArea>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-2xl">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name the product"
                    className="border border-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-2xl">Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="border border-black h-[200px]"
                    placeholder="Describe your product..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex md:flex-row flex-col gap-6">
            <FormField
              control={form.control}
              name="uploadfile"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-2xl">Upload File</FormLabel>
                  <FormControl>
                    <Input
                      id="uploadfile"
                      type="file"
                      className="border-black border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="uploadthumnail"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-2xl">Upload Thumnail</FormLabel>
                  <FormControl>
                    <Input
                      id="uploadthumnail"
                      type="file"
                      className="border-black border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-2xl">Price</FormLabel>
                <FormControl>
                  <Label htmlFor="price" className="flex">
                    <AiOutlineDollar className="h-auto w-[30px] mx-2" />
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      className="border-black border"
                      placeholder="Set the price"
                      min={0}
                      {...field}
                    />
                  </Label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="md:w-[200px] w-full">
            Upload
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
}
