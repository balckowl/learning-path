"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CircleX, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import Heading from "@/app/components/new/heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  title: z.string().min(1, { message: "タイトルを入力してください" }).max(40, { message: "タイトルは最大40文字です" }),
  nodes: z
    .array(
      z.object({
        comment: z.string().optional(),
        nodeTitle: z
          .string()
          .min(1, { message: "タイトルを入力してください" })
          .max(40, { message: "タイトルは最大40文字です" }),
        nodeUrl: z.string().url({ message: "有効なURLを入力してください" }),
      }),
    )
    .min(1, { message: "少なくとも1つのアイテムを追加してください" }),
});

type FormData = z.infer<typeof schema>;
type ItemType = z.infer<typeof schema>["nodes"][number];

export default function Page() {
  const form = useForm<FormData>({
    defaultValues: {
      title: "",
      nodes: [
        { comment: "", nodeTitle: "", nodeUrl: "" },
        { comment: "", nodeTitle: "", nodeUrl: "" },
      ],
    },
    resolver: zodResolver(schema),
  });

  const { append, fields, remove } = useFieldArray({
    name: "nodes",
    control: form.control,
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const { title, nodes } = data;

    await fetch("http://localhost:3000/api/article/new", {
      body: JSON.stringify({ title, nodes }),
      method: "POST",
    });

    router.push("/");
    router.refresh();
  };

  return (
    <div className="bg-yellow-400">
      <div className="flex justify-center px-[10px] py-[20px]">
        <div className="w-full rounded-md bg-white p-8 md:w-[85%] xl:w-3/4 xl:px-[70px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              {/*記事のタイトル*/}
              <div>
                <Heading
                  title="記事タイトルを作成"
                  description="このロードマップのタイトルを20文字以内で教えてください"
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }: { field: ControllerRenderProps<FormData, "title"> }) => (
                    <FormItem>
                      <FormLabel>タイトル</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="タイトルを入力" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/*記事ノード*/}
              <div>
                <Heading title="記事ノードを作成" description="ノードは最大5つまで追加することができます" />
                {fields.map((field: ItemType, index: number) => (
                  <div key={index} className="mb-[20px] space-y-4 rounded-md border bg-[#fffefc] p-5">
                    <div className="flex justify-between">
                      <h3 className="text-[25px] font-bold">{index + 1}つ目</h3>
                      {index > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => remove(index)}
                          className="flex items-center gap-2 text-red-500"
                        >
                          <CircleX size={14} />
                          削除
                        </Button>
                      )}
                    </div>
                    <div className="grid w-full gap-3 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`nodes.${index}.nodeTitle`}
                        render={({
                          field,
                        }: {
                          field: ControllerRenderProps<FormData, `nodes.${number}.nodeTitle`>;
                        }) => (
                          <FormItem>
                            <FormLabel>タイトル</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="タイトルを入力" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`nodes.${index}.nodeUrl`}
                        render={({ field }: { field: ControllerRenderProps<FormData, `nodes.${number}.nodeUrl`> }) => (
                          <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="https://example.com" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name={`nodes.${index}.comment`}
                      render={({ field }: { field: ControllerRenderProps<FormData, `nodes.${number}.comment`> }) => (
                        <FormItem>
                          <FormLabel>コメント</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="コメントを入力（任意）" className="resize-none" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                {fields.length < 5 && (
                  <Button
                    type="button"
                    onClick={() => append({ comment: "", nodeTitle: "", nodeUrl: "" })}
                    className="flex w-full items-center gap-2 py-6"
                  >
                    <Plus />
                    アイテムを追加
                  </Button>
                )}
              </div>

              {/*公開*/}
              <div>
                <Heading title="記事の公開" />
                <Button type="submit" className="flex w-full items-center gap-3 py-6">
                  <Check />
                  公開
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
